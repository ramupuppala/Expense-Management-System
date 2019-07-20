//imports node modules 
import React, { Component }         from 'react';
//imports proptyes from react 
import PropTypes                    from 'prop-types';
/**
 * This function used for display label with dynamic 
 * @param {*} param0 
 */
 const Label =({htmlFor,label, required})=>{
    return(
        <React.Fragment>
            <label htmlFor={htmlFor}>
             <b> {label} {required && <span style={{color:"red"}}> *</span>}</b>  
            </label>
        </React.Fragment>
    )
}
Label.propTypes = {
    /** HTML ID for associated input */
    htmlFor: PropTypes.string.isRequired,
  
    /** Label text */
    label: PropTypes.string.isRequired,
  
    /** Display asterisk after label if true */
    required: PropTypes.bool
  };
  
export default Label;