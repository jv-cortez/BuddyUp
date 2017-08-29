import React, { Component } from 'react';

class Greetings extends Component {
  render() {
    return (
      <div id="page-top" className="page-top" data-spy="scroll" data-target=".navbar-custom">

        <section id="intro" className="intro">
          <video autoPlay loop muted src="/greetingsVid.mp4" />
        </section>

        <section id="logo">
          <img src="/logo.png" />
        </section>

        <section id="about" className="home-section text-center">
          <div className="heading-about">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                  <div className="wow bounceInDown" data-wow-delay="0.4s">
                    <div className="section-heading">
                      <h3>Created by</h3>
                      <i className="fa fa-2x fa-angle-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-lg-offset-5">
                <hr className="marginbot-50" />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className="wow bounceInUp" data-wow-delay="0.2s">
                  <div className="team boxed-grey">
                    <div className="inner">
                      <h5>Yohan Wiputra</h5>

                      <div className="avatar"><img src="https://steamuserimages-a.akamaihd.net/ugc/544144200753106252/C5719C7DFD1044AFD01D948FCE0946A3E341FA7B/" alt="" className="img-responsive img-circle" /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className="wow bounceInUp" data-wow-delay="0.5s">
                  <div className="team boxed-grey">
                    <div className="inner">
                      <h5>Helen Lee</h5>

                      <div className="avatar"><img src="http://i.imgur.com/utol4F4.jpg" alt="" className="img-responsive img-circle" /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className="wow bounceInUp" data-wow-delay="0.8s">
                  <div className="team boxed-grey">
                    <div className="inner">
                      <h5>Victor Cortez</h5>

                      <div className="avatar"><img src="https://dota2.gamepedia.com/media/dota2.gamepedia.com/thumb/3/31/Cosmetic_icon_Cluckles_the_Brave.png/256px-Cosmetic_icon_Cluckles_the_Brave.png?version=ccb8c03b51aa4e14b8307c18e053a89c" alt="" className="img-responsive img-circle" /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-3 col-md-3">
                <div className="wow bounceInUp" data-wow-delay="1s">
                  <div className="team boxed-grey">
                    <div className="inner">
                      <h5>John Wong</h5>

                      <div className="avatar"><img src="https://s3-eu-west-1.amazonaws.com/media.valvetimes.com/uploads/2016/01/batpas12.jpg" alt="" className="img-responsive img-circle" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Greetings;
