 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../../utils/utils';
 import UserGroupInfo from './info';
 import AppLink from '../../../../others/link/link';
 import Join from '../../../../group/join-group/join';
 import Leave from '../../../../group/join-group/leave';
 import {number,string,bool} from 'prop-types';

 class UserGroupList extends Component {
     state = {joined: false}

     componentDidMount = () => this.setState({ joined: this.props.joined })

     render(){
         let {joined} = this.state;
         let {session:{id:user},admin,group_id} = this.props;

         return (
             <div className="m_on followers_m_on">
                 <UserGroupInfo info={{ ...this.props }} />

                 <div className="m_bottom">
                     {Me(admin) ? (
                         <AppLink url={`/group/${group_id}`} className="sec_btn" label="View group" />
                     ) : joined ? (
                         <Leave leaveDetails={{user,group_id}} leaved={() => this.setState({ joined: false})} updateGroups/>
                     ) : (
                         <Join joinDeatils={{user,addedBy:user,group_id}} joined={() => this.setState({ joined: true })} />
                     )}
                 </div>
             </div>
         )
     }
 }

 UserGroupList.propTypes = {
     name: string.isRequired,
     admin: number.isRequired,
     member: string.isRequired,
     group_id: number.isRequired,
     joined: bool.isRequired,
     joined_group: string.isRequired
 }

 const mapStateToProps = state => ({
     session: state.User.session
 })
 
 export default connect(mapStateToProps)(UserGroupList)
 export {UserGroupList as PureUserGroupList}