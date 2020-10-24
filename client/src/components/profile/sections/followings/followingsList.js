 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {Me} from '../../../../utils/utils';
 import {timeAgo} from '../../../../utils/utilMethods/handyTimeAgo';
 import AppLink from '../../../others/link/link';
 import Follow from '../../../others/follow/follow';
 import Unfollow from '../../../others/follow/unfollow';
 import MonSticky from '../../../others/m-on/mon-sticky';
 import MonTopInfo from '../../../others/m-on/mon-topinfo';
 import {number,string} from 'prop-types';

 class FollowingsList extends Component {
     state = {
         isFollowing: false,
         showTime: false
     }

     showTime = () => this.setState({ showTime: true })
     hideTime = () => this.setState({ showTime: false })

     componentDidMount = async () => {
         let {follow_to,username} = this.props;
         if(!Me(follow_to)){
             let {data:{isFollowing}} = await post('/api/is-following',{username})
             await this.setState({isFollowing})
         }
     }

     render(){
         let {isFollowing,showTime} = this.state;
         let {id,follow_to,follow_time,username,firstname,surname} = this.props;

         return (
             <div className="m_on followers_m_on" onMouseOver={this.showTime} onMouseOut={this.hideTime}>
                 <MonTopInfo info={{user:follow_to,username,firstname,surname}} />
                 <MonSticky show={showTime} text={timeAgo(follow_time)} />

                 <div className="m_bottom">
                     {Me(follow_to) ? (
                         <AppLink url={`/profile/${username}`} className="sec_btn" label="Profile" />
                     ) : isFollowing ? (
                         <Unfollow user={follow_to} unfollowed={() => this.setState({ isFollowing: false })} updateFolowings={Me(id)} />
                     ) : (
                         <Follow userDetails={{user:follow_to,username,firstname,surname}} followed={() => this.setState({ isFollowing: true })} updateFollowings={Me(id)} />
                     )}
                 </div>
             </div>
         )
     }
 }

 FollowingsList.propTypes = {
    follow_to: number.isRequired,
    follow_id: number.isRequired,
    follow_by: number.isRequired,
    follow_time: string.isRequired,
    username: string.isRequired,
    firstname: string.isRequired,
    surname: string.isRequired
}

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(FollowingsList);
 export {FollowingsList as PureFollowingsList}