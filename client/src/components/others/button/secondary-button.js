 import React,{Fragment} from 'react';
 import classNames from 'classnames';
 import {string,func,bool,oneOfType} from 'prop-types';

 const SecondaryButton = ({label,onClick,extraClass,disabled,...props}) => {
     let disabledClass = disabled ? 'sec_btn_disabled' : '';

    return(
        <Fragment>
            <a href="#" onClick={onClick} {...props}
               className={classNames('sec_btn',extraClass,disabledClass)}>
                   {typeof label === 'function' ? label() : label}
               </a>
        </Fragment> 
    )
 }

 SecondaryButton.defaultProps = {
    label: '',
    disabled: false,
    extraClass: ''
 }

 SecondaryButton.propTypes = {
     label: oneOfType([string,func]).isRequired,
     onClick: func.isRequired,
     extraClass: string,
     disabled: bool
 }

 export default SecondaryButton;



























