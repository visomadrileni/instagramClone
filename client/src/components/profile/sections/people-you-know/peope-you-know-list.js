 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {Me} from '../../../../utils/utils';
 import AppLink from '../../../others/link/link';
 import Follow from '../../../others/follow/follow';
 import UnFollow from '../../../others/follow/unfollow'
 import MonTopInfo from '../../../others/m-on/mon-topinfo';
 import {number,string} from 'prop-types';

 class PeopleYouKnowList extends Component {
     state = { isFollowing: false }

     componentDidMount = async () => {
         let {user,username} = this.props;
         if(!Me(user)){
             let {data:isFollowing} = await post('/api/is-following',{username})
             await this.setState({isFollowing})
         }
     }

         render(){
             let {isFollowing} = this.state;
             let {id,user,username,firstname,surname,mutualUsersCount} = this.props;

             return (
                 <div className="m_on followers_m_on">
                      <MonTopInfo info={{user,username,firstname,surname,mutuals:mutualUsersCount}} />

                      <div className="m_bottom">
                          {Me(user) ? (
                              <AppLink url={`/profile/${username}`} className="sec_btn" label="Profile" />
                          ) : isFollowing ? (
                              <UnFollow user={user} unfollowed={() => this.setState({ isFollowing: false})} updateFolowings={Me(id)} />
                          ) : (
                              <Follow userDetails={{user,username,firstname,surname}} followed={() => this.setState({isFollowing: true })} updateFollowings={Me(id)} />
                          )}
                      </div>
                 </div>
             )
         }
     }


 PeopleYouKnowList.propTypes = {
     follow_id: number.isRequired,
     user: number.isRequired,
     username: string.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired,
     mutualUsersCount: number.isRequired
 }

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(PeopleYouKnowList)
 export {PeopleYouKnowList as PurePeopleYouKnowList}