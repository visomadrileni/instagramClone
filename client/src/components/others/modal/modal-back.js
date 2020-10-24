 import React,{Fragment} from 'react';
 import PrimaryButton from '../button/primary-button';
 import SecondaryButton from '../button/secondary-button';
 import {func,oneOf,string,bool} from 'prop-types';

 const ModalBack = ({back,btnType,label,disabled}) => {
     let b = e => {
        e.preventdefault();
        back()
     }

     let defaults = {label,onClick:b,disabled}

     return (
         <Fragment>
             {btnType === 'primary' ? (
                 <PrimaryButton {...defaults} />
             ) : (
                 <SecondaryButton {...defaults} />
             )}
         </Fragment>
     )
 }

 ModalBack.defaultProps = {
     btnType: 'primary',
     label: 'Back',
     disabled: false
 }

 ModalBack.propTypes = {
     btnType: oneOf(['primary','secondary']),
     back: func.isRequired,
     label: string,
     disabled: bool
 }

 export default ModalBack;









