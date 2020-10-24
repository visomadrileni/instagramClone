 import React,{Fragment} from 'react';
 import {humanReadable} from '../../../../utils/utils';
 import AppLink from '../../link/link';
 import {number,string,func} from 'prop-types';

 const UserSearch = props => {
     let {id,username,firstname,surname,mutualFollowersCount,clicked} = props;

     return (
         <div className="s_d_peo" onClick={clicked}>
             <AppLink className="s_d_p" url={`/profile/${username}`}>
                <Fragment>
                   <img src={`/users/${id}/avatar.jpg`} />
                   <div className="s_d_c">
                      <span className="s_d_username">{username}</span>
                      <span>{mutualFollowersCount === 0 ? `${firstname} ${surname}` : humanReadable(mutualFollowersCount,'mutual follower') }</span>
                    </div>
                 </Fragment>
               </AppLink>  
         </div>
     )
 }

 UserSearch.propTypes = {
     id: number.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired,
     mutualFollowersCount: number.isRequired,
     clicked: func.isRequired
 }

 export default UserSearch;