 import React from 'react';
 import Title from '../others/title';
 import {FadeIn} from 'animate-components';

 const EmailVerification = ({match}) => {
     let {params: {is}} = match;
     let message = is === 'yes' ? 'You email has been verified successfully' : is === 'alr' ? 'Email already verified' : 'Something went wrong'

     return (
         <div>
             <Title value="Email Verification" />
             <FadeIn duration="300ms">
                 <div className="registered email_verification">
                     <span>{message}</span>
                 </div>
             </FadeIn>
         </div>
     )
 }

  export default EmailVerification;





















