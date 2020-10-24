 import React from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {capitalizes_first} from '../../utils/utils';
 import Title from '../others/title';
 import AppLink from '../others/link/link';
 
 const Error = ({match,username}) => {
     let {params} = match;
     let what = params.what ? params.what : 'page'
     let title = capitalizes_first(`${what}`);

     return (
         <div className="error">
             <Title value={`Ooops! ${title} not found`} />

             <FadeIn duration="300ms" >
                 <div className="error_div">
                     <div className="error_info">
                         <span>Oops, {what} you are looking for does not exist!!</span>
                     </div>

                     <img src="/images/error.svg" alt="error"/>
                     <div className="error_bottom">
                         <AppLink
                            to={`/profile/${username}`}
                            label="View Profile"
                            className="sec_btn error_home"
                         />
                         <AppLink
                             to="/"
                             label="Try going to homepage"
                             className="pri_btn error_login"
                         />
                     </div>
                 </div>
             </FadeIn>
         </div>
     )
 }


 const mapStateToProps = state => ({
     username: state.User.session.username
 })

 export default connect(mapStateToProps)(Error);




































































