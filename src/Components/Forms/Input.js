import React from "react";
const Input = ({ name, label, error, type="text",  handleChange, ...rest }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input type={type} {...rest} name={name} id={name}    onChange={handleChange} className="form-control" />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Input;
