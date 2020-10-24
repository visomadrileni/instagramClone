 import React,{Component} from 'react';
 import {humanReadable} from '../../../utils/utils';
 import AppLink from '../../others/link/link';
 import AdvancedFollow from '../../others/follow/advancedFollow';
 import AdvancedUnfollow from '../../others/follow/advancedUnfollow';
 import {number,string,oneOf} from 'prop-types';

 class SuggestedList extends Component{
     state = { isFollowing: false }

     render(){
         let {isFollowing} = this.state;
         let {id,username,firstname,surname,mutualUsersCount} = this.props;

         return (
             <div className="recomms">
                 <img src={`/users/${id}/avatar.jpg`} alt="avatar" />
                 <div className="recomms_cont">
                     <AppLink
                        url={`/profile/${username}`}
                        label={username}
                        className="recomms_username"
                     />
                     <span>
                         {mutualUsersCount === 0 ? `${firstname} ${surname}` : humanReadable(mutualUsersCount,'mutual follower')}
                     </span>
                 </div>

                 <div className="recomms_ff">
                     {isFollowing ? (
                         <AdvancedUnfollow
                            user={id}
                            unfollowed={() => this.setState({ isFollowing: false })}
                         />
                     ) : (
                         <AdvancedFollow
                             userDetails={{
                                 user: id,
                                 username,
                                 firstname,
                                 surname
                                 }}
                             followed={() => this.setState({ isFollowing: true })}    
                         />
                     )}
                 </div>
             </div>   
         )
     }
 } 

 SuggestedList.propTypes = {
     id: number.isRequired,
     username: string.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired,
     when: oneOf(['home','profile']),
     mutualUsersCount: number.isRequired
 }

 export default SuggestedList;