 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../../utils/utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import LikeInfo from './info';
 import RemoveLikeAsAdmin from './remove-like-as-admin';
 import AppLink from '../../../../others/link/link';
 import AdvancedFollow from '../../../../others/follow/advancedFollow';
 import AdvancedUnfollow from '../../../../others/follow/advancedUnfollow';
 import {number,string,bool,func} from 'prop-types';

 class LikeList extends Component{
     state = { isFollowing: false }

     componentWillReceiveProps = ({isFollowing}) => this.state({ isFollowing})
     componentDidMount = () => this.setState({ isFollowing: this.state.isFollowing})

     render(){
         let {isFollowing} = this.state;
         let {like_id,like_by,username,firstname,surname,like_time,decrementLikes} = this.props;

         return (
             <div className="modal_items fer_items">
                 <div className="modal_it_img">
                     <img src={`/users/${like_by}/avatar.jpg`} />
                 </div>

                 <div className="modal_it_content">
                     <LikeInfo
                        likeDetails={{
                            like_by,
                            username,
                            like_time
                        }}
                     />

                     <div className="modal_ff">
                         {Me(like_by) ? (
                             <AppLink
                                url={`/profile/${username}`}
                                className="pri_btn follow"
                                label="Profile"
                             />
                         ) : isAdmin() ? (
                             <RemoveLikeAsAdmin 
                                 like_id={like_id}
                                 decrementLikes={decrementLikes}
                             />
                         ) : isFollowing ? (
                             <AdvancedUnfollow
                                 user={like_by}
                                 unfollowed={() => this.setState({ isFollowing: false })}
                             />
                         ) : (
                             <AdvancedFollow
                                userDetails={{
                                    user: like_by,
                                    username,
                                    firstname,
                                    surname
                                   }}
                                followed={() => this.setState({ isFollowing: true })}   
                             />
                         )}
                     </div>
                 </div>
                 <hr />
             </div>
         )
     }
 }

 LikeList.propTypes = {
   like_id: number.isRequired,
   like_time: string.isRequired,
   like_by: number.isRequired,
   username: string.isRequired,
   firstname: string.isRequired,
   surname: string.isRequired,
   post_id: number.isRequired,
   isFollowing: bool.isRequired,
   decrementLikes: func.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(LikeList)
 export {LikeList as PureLikeList}