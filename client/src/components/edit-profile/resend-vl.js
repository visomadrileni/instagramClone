 import React,{Fragment} from 'react';
 import {email_verified} from '../../utils/utils';
 import {resend_verification} from '../../utils/edit-profile-utils';
 import SecondaryButton from '../others/button/secondary-button';

 const ResendVerification = () => {
     let resend = e => {
         e.preventDefault();
         resend_verification();
     }

    return (
        <Fragment>
            {!email_verified && (
                <SecondaryButton
                 label="Resend verification link"
                 onClick={resend}
                 extraClass="resend_verification" />
            )}
        </Fragment>
    )
 } 

 export default ResendVerification;























