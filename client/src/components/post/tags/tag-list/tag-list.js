 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../utils/utils';
 import {isAdmin} from '../../../../utils/admin-utils';
 import Untag from './untag';
 import ModalItemInfo from '../../../others/modal/modal-item-info';
 import AdvancedFollow from '../../../others/follow/advancedFollow';
 import AdvancedUnfollow from '../../../others/follow/advancedUnfollow';
 import {number,string,bool,func} from 'prop-types';

 class TagItems extends Component {
     state= { isFollowing: false }

     componentWillReceiveProps = ({isFollowing}) => this.setState({isFollowing})
     componentDidMount = () => this.setState({ isFollowing: this.props.isFollowing })
     
     render(){
         let {isFollowing} = this.state;
         let {user,username,firstname,surname,post_id,decrementTags,isPostMine} = this.props;
         let untagOptions = {post_id,user,decrementTags}

         return (
             <div className="modal_items fer_items">
                 <div className="modal_it_img">
                     <img src={`/users/${user}/avatar.jpg`} />
                 </div>
                 <div className="modal_it_content">
                     <ModalItemInfo info={{username,firstname,surname}} />

                     <div className="modal_ff">
                         {(isPostMine || isAdmin() || Me(user)) ? (
                             <Untag {...untagOptions} />
                         ) : isFollowing ? (
                             <AdvancedUnfollow
                               user={user}
                               unfollowed={() => this.setState({ isFollowing: false })}
                             />
                         ) : (
                             <AdvancedFollow
                               userDetails={{
                                   user,
                                   username,
                                   firstname,
                                   surname
                                   }}
                                followed={() => this.setState({ isFollowing: true})}   
                             />
                         )} 
                     </div>
                 </div>
               <hr />
            </div>
         )
     }
 }

 TagItems.propTypes = {
     post_id: number.isRequired,
     post_tag_id: number.isRequired,
     user: number.isRequired,
     username: string.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired,
     isFollowing: bool.isRequired,
     decrementTags: func.isRequired
 }

 const mapStateToProps = state => ({
      user_details: state.User.user_details,
      isPostMine: state.Post.isPostMine
 })

 export default connect(mapStateToProps)(TagItems)