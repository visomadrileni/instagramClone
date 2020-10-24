 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../utils/utils';
 import {toggleJoinGroup} from '../../../actions/group';
 import AppLink from '../../others/link/link';
 import Join from '../join-group/join';
 import Leave from '../join-group/leave';

 const notNull = id => (id ? id : 0)

 const JoinGroup = ({ group_details,joined,session,dispatch}) => {
      let {admin,group_id: group} = group_details;
      let {id} = session;
      let user = notNull(id);
      let group_id = notNull(group)
      let toggle = what => dispatch(toggleJoinGroup(what))

      return (
          <Fragment>
              <div className="pro_ff">
                  {Me(admin) ? (
                      <AppLink
                         url="/edit-group"
                         label="Edit Group"
                         className="pri_btn ff"
                      />
                  ) : (joined ? (
                      <Leave
                         leaveDetails={{ user,group_id}}
                         leaved={() => toggle(false)}
                      />
                  ): (
                      <Join
                        joinDeatils={{
                            user,
                            addedBy: user,
                            group_id
                           }}
                        joined={() => toggle(true)}
                      />
                  ))}
              </div>
          </Fragment>
      )
 }

 const mapStateToProps = state => ({
     group_details: state.Group.group_details,
     joined: state.Group.joined,
     session: state.User.session
 })

 export default connect(mapStateToProps)(JoinGroup);
 export {JoinGroup as PureJoinGroup}







































