
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import RCSlider from 'rc-slider';

const createSliderWithTooltip = RCSlider.createSliderWithTooltip;
const Range = createSliderWithTooltip(RCSlider.Range);
const Handle = RCSlider.Handle;

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.sliderDefaultValue
    };
  }

  onSliderChange = (value) => {
    this.setState({
      value,
    }, () => this.props.onSliderUpdate(value));
  }

  onAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  }

  render () {
        const handle = (props) => {
          const { value, dragging, index, ...restProps } = props;
          return (
            <Tooltip
              prefixCls="rc-slider-tooltip"
              overlay={value}
              visible={dragging}
              placement="top"
              key={index}
            >
              <Handle value={value} {...restProps} />
            </Tooltip>
          );
        };
    
        return (
          <div>
            <div className="sliderSpace">
              <p className="slideText">Please slide according to your seriousness:</p> 
                <p className="slideNumber">{this.props.sliderDefaultValue}</p>
              <RCSlider min={0} max={8000} value={this.props.sliderDefaultValue} handle={handle} 
              onChange={this.onSliderChange}
              />
            </div>
          </div>
        );
      }
}

export default Slider;