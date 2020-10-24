 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {Me} from '../../../../../utils/utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import {timeAgo} from '../../../../../utils/utilMethods/handyTimeAgo';
 import MemberAddedBy from './member-added-by';
 import MemberTop from './member-top';
 import RemoveMember from './remove-member';
 import AppLink from '../../../../others/link/link';
 import Follow from '../../../../others/follow/follow';
 import UnFollow from '../../../../others/follow/unfollow';
 import MonSticky from '../../../../others/m-on/mon-sticky';
 import {number,string} from 'prop-types';

 class MembersList extends Component{
     state = {
         isFollowing: false,
         showTime: false
     }

     showTime = () => this.setState({ showTime: true})
     hideTime = () => this.setState({ showTime: false})

     componentDidMount = async () => {
        let {member,username} = this.props;
        if(!Me(member)){
            let {data} = await post('/api/is-following',{username})
            this.setState({ isFollowing: data })
        }
     }

     render(){
       let {isFollowing,showTime} = this.state;  
       let {
           group_details,
           group_member_id,
           member,
           username,
           firstname,
           surname,
           added_by,
           added_by_username,
           mutualUsersCount,
           joined_group  } = this.props;

           return (
               <div className="m_on followers_m_on" onMouseOver={this.showTime} onMouseOut={this.hideTime}>
                   <MemberTop
                       memberDetails={{
                           member,
                           username,
                           firstname,
                           surname,
                           mutualUsersCount
                          }}                   
                     />

                     <MonSticky show={showTime} text={timeAgo(joined_group)} />

                     <div className="m_bottom">
                        <MemberAddedBy memberDetails={{member,added_by,added_by_username }} />

                         {Me(member) ? (
                             <AppLink url={`/profile/${username}`} className="sec_btn" label="Profile" />
                         ) : Me(group_details.admin) || isAdmin() ? (
                             <RemoveMember memberDetails={{group_member_id,member,username}} />
                         ) : isFollowing ? (
                             <UnFollow user={member} unfollowed={() => this.setState({ isFollowing: false})} />
                         ) : (
                            <Follow userDetails={{ user: member,username}} followed={() => this.setState({ isFollowing: true})} />
                         )}
                     </div>
               </div>
           )
     }
 }

 MembersList.propTypes = {
     group_member_id: number.isRequired,
     member: number.isRequired,
     username: string.isRequired,
     firstname: string.isRequired,
     surname: string.isRequired,
     added_by: number.isRequired,
     added_by_username: string.isRequired,
     joined_group: string.isRequired,
     mutualUsersCount: number.isRequired,
     group_id: number.isRequired
 }

 const mapStateToProps = state => ({
     group_details: state.Group.group_details
 })

 export default connect(mapStateToProps)(MembersList);
 export {MembersList as PureMembersList}

















