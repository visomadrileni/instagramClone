 import React from 'react';
 import {FadeIn} from 'animate-components';
 import Title from '../others/title';
 import {Redirect} from 'react-router-dom';
 import {isAdmin} from  '../../utils/admin-utils';

 const IsAdmin = () => (
     <div>
         {!isAdmin() && <Redirect to="/admin-login" />}

         <Title value="You are the admin" desc="You can remove and edit any post,etc as an admin"/>
         <FadeIn duration="300ms">
             <div className="registered email_verification">
                 <span>
                    You can remove and edit any post,etc as an admin
                 </span>
             </div>
           </FadeIn>
     </div>
 )
 
 export default IsAdmin;


































