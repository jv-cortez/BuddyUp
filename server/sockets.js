require('dotenv').config();

const IO_PORT = process.env.IO_PORT
const socketIoJwt = require('socketio-jwt');
const _ = require('lodash');

const pry = require('pryjs');

module.exports = (io, knex) => {

  let compatUsers = [];
  let currentUserData = {};
  const onlineUsers = {};

  function queryCompatUsers(username, seriousness){
    return knex('users').where('seriousness','>',seriousness-10)
      .andWhere('seriousness','<',seriousness+10)
      .whereIn('username', Object.keys(onlineUsers))
      .then(function(results) {
        function sortFunction(record1,record2) {
          var difference1 = Math.abs(seriousness - record1.seriousness);
          var difference2 = Math.abs(seriousness - record2.seriousness);
          return difference1 > difference2;
        }
        results.sort(sortFunction);
        compatUsers = results;
        return Promise.resolve(compatUsers);
      });
  }

  function queryUser(username){
    return knex('users').where('username', username);
  }

  function updateSeriousnessDb(username, value){
    return knex('users')
    .where('username', username)
    .update('seriousness', value)
  }

  function getSeriousness(username){
    return knex.select('seriousness').from('users').where('username', username)
  }

  function broadcastUpdatedOnlineList(){
    for (var userName in onlineUsers) {
      const {user, socket} = onlineUsers[userName];
      getSeriousness(userName).then((data) => {
        queryCompatUsers(userName, data[0].seriousness).then((users) => {
            io.emit('onlinematchedSeriousnessUserIds', JSON.stringify(users));
          // })
        })
      })
    }
  }

  io.sockets
    .on('connection', socketIoJwt.authorize({
      secret: process.env.JWT_SECRET,
      timeout: 1000
    })).on('authenticated', function(socket) {
      const currentUserName = socket.decoded_token.username;
      console.log('hello! ' + currentUserName);

      if (!onlineUsers[currentUserName]) {
        exports.currentUserName = currentUserName;
        socket.emit('authenticated', currentUserName);
        onlineUsers[currentUserName] = {user: socket.decoded_token, socket: socket};
      }

      console.log('after auth ', onlineUsers);

      broadcastUpdatedOnlineList();

      // Initial Load
      queryUser(currentUserName).then(user => {
        currentUserData = user[0];
        socket.emit('getDefaultSeriousness', JSON.stringify(user[0].seriousness));
        queryCompatUsers(user[0].username, user[0].seriousness).then(users => {
          socket.emit('onlinematchedSeriousnessUserIds', JSON.stringify(users));
        });
      });

      // Update seriousness after slider change
      socket.on('updateSeriousness', function(data) {
        const sliderValue = JSON.parse(data).value;
        updateSeriousnessDb(currentUserName, sliderValue).then(() => {
          broadcastUpdatedOnlineList();
        })
      });

      // Initial invite
      socket.on('sendInvite', function(currentUserName, userData) {
        const parsedUserData = JSON.parse(userData);
        console.log("invite sent by ", currentUserName, " to ", parsedUserData.username);
        const room = currentUserName + ' ' + parsedUserData.username;
        const senderData = onlineUsers[currentUserName].user
        socket.join(room);
        socket.broadcast.emit('respondToInvite', JSON.stringify(senderData), userData);
      });

      socket.on('disconnect', function(userName){
        delete onlineUsers[userName];
        console.log('after delete on disconnect ', onlineUsers);
        broadcastUpdatedOnlineList();
      })

      socket.on('send message', function(data) {
        console.log(data);
        io.sockets.emit('new message', data)
      })
    })

    // const users = [];
    // const connections = [];
    // io.sockets.on('connection', function(socket){
    //   connections.push(socket);
    //   console.log('Connected: %s sockets connected:', connections.length)

    //   //Disconnect
    //   socket.on('disconnect', function(data){
    //     connections.splice(connections.indexOf(socket), 1);
    //     console.log('Disconnected: %s sockets connected:', connections.length)  
    //   });

    //   socket.on('message', function(data) {
    //     console.log(data)
    //   })
    // });

  io.listen(IO_PORT, () => {
    console.log("Socket.io listening on port " + IO_PORT);
  })
}
