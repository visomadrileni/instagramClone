 import React,{Component,Fragment} from 'react';
 import NotificationTypeProfile from './profile';
 import NotificationTypeCon from './conversation';
 import NotificationTypePost from './post';
 import NotificationTypeGroup from './group';
 import Follow from '../../../others/follow/follow';
 import Unfollow from '../../../others/follow/unfollow';
 import {number,string,bool,shape} from 'prop-types';

 export default class NotificationActionType extends Component {
     state = { isFollowing: false }

     componentWillReceiveProps = ({ details:{isFollowing} }) => this.setState({isFollowing})
     componentDidMount = () => {
         this.setState({ isFollowing: this.props.details.isFollowing })
     }

     render(){
         let {isFollowing} = this.state;
         let {type,user_username,group_id,post_id,notify_by,notify_by_username} = this.props.details;

         return (
             <Fragment>
                 <div className="noti_right follow_noti_right">
                     {type === 'follow' || type === 'favourites' ? isFollowing ? (
                        <Unfollow
                             user={notify_by}
                             unfollowed={() => this.setState({ isFollowing: false })}
                         />
                       ) : (
                         <Follow
                            userDetails={{
                                user: notify_by,
                                username: notify_by_username
                               }}
                            followed={() => this.setState({ isFollowing: true })}   
                         />
                         )
                     : (type === 'tag' || type === 'like' || type === 'share' || type === 'shared_your_post' || type == 'comment' || type == 'mention_post' || type == 'mention_comment') ? 
                           <NotificationTypePost post_id={post_id} />
                     : (type === 'recommend') ? <NotificationTypeProfile user_username={user_username} /> 
                     : (type === 'add_grp_member' || type === 'invite' || type === 'change_admin') ? <NotificationTypeGroup group_id={group_id} />
                     : type === 'new_con' ? <NotificationTypeCon />
                     : null
                    }
                 </div>
             </Fragment>
         )
     }
 }

 NotificationActionType.propTypes = {
     details: shape({
         type: string.isRequired,
         user_username: string.isRequired,
         notify_by: number.isRequired,
         notify_by_username: string.isRequired,
         post_id: number.isRequired,
         group_id: number.isRequired,
         isFollowing: bool.isRequired
     }).isRequired
 }