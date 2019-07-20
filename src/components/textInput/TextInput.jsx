//imports nodes modules
import React, { Component } from 'react';
//imports Prop types from react
import PropTypes from 'prop-types';
//import label compoent
import Label from '../label';
//styles of text inputs
import './textInput.css';
/**
 * This class used for Display Text input boxs which given from parent 
 */
class TextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { htmlId, name, label, type = "text", required = false, onChange, placeholder, value, error, children , readonly=""} = this.props;
        console.log(readonly);
        return (
            <React.Fragment>
                
                <div class="input-group">
                <div className="col-sm-4">
                    <Label htmlFor={htmlId} label={label} required={required} />
                </div>
                <div className="col-sm-8">
                <input
                        id={htmlId}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        defaultValue={value}
                        onChange={onChange}
                        className={'form-control' || error && 'textInput__input--state-error'}
                        
                    />
                    {error && <div className="textInput__error">{error} </div>}
                </div>
                
                </div>

            </React.Fragment>
        );
    }
}

TextInput.propTypes = {
    /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
    htmlId: PropTypes.string.isRequired,

    /** Input name. Recommend setting this to match object's property so a single change handler can be used. */
    name: PropTypes.string.isRequired,

    /** Input label */
    label: PropTypes.string.isRequired,

    /** Input type */
    type: PropTypes.oneOf(['text', 'number', 'password']),

    /** Mark label with asterisk if set to true */
    required: PropTypes.bool,

    /** Function to call onChange */
    onChange: PropTypes.func.isRequired,

    /** Placeholder to display when empty */
    placeholder: PropTypes.string,

    /** Value */
    value: PropTypes.any,

    /** String to display when error occurs */
    error: PropTypes.string,
};

export default TextInput;