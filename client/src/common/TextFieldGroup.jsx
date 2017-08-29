import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ field, value, label, error, type, onChange, maxlength, placeholder }) => {
  return (
    <div className={classnames("form-group", { 'has-error': error })}>
      <label className="control-label">{label}</label>
      <input value={value} 
             onChange={onChange} 
             type={type} 
             name={field} 
             maxLength={maxlength}
             placeholder={placeholder}
             className="form-control" />
            {error && <span className="help-block">{error}</span>}
    </div>
  )
}

TextFieldGroup.prototype = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  maxlength: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text', maxlength: '200'
}

export default TextFieldGroup;