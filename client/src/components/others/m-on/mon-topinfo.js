 import React from 'react';
 import AppLink from '../link/link';
 import {humanReadable} from '../../../utils/utils';
 import {shape,number,string,bool} from 'prop-types';

 const MonTopInfo = ({info,basedOnMutuals}) => {
     let {user,username,firstname,surname,mutuals} = info;

     return (
         <div className="m_top">
             <img src={`/users/${user}/avatar.jpg`} />
             <div className="m_top_right">
                 <AppLink 
                   url={`/profile/${username}`}
                   label={username}
                 />
                 {basedOnMutuals ? (
                     <span>{mutuals === 0 ? `${firstname} ${surname}` : humanReadable(mutuals,'mutual follower')}</span>
                 ) : (
                     <span>{firstname} {surname}</span>
                 )}
             </div>
         </div>
     )
 } 

 MonTopInfo.defaultProps = {
     basedOnMutuals: false,
     mutuals: 0
 }

 MonTopInfo.propTypes = {
     info: shape({
         user: number.isRequired,
         username: string.isRequired,
         firstname: string.isRequired,
         surname: string.isRequired,
         mutuals: number
        }).isRequired,
     basedOnMutuals: bool   
 }

 export default MonTopInfo;






































