 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Me,bottomScroll} from '../../../../utils/utils';
 import {joinGroup} from '../../../../utils/group-utils';
 import Title from '../../../others/title';
 import SearchFolowings from '../../../others/serach-followings/serach-followings';
 import GroupInstruction from '../../instruction';

  class AddGroupMemebers extends Component{
    componentDidMount = () => bottomScroll();

    addMember = user => {
      let {group_details,session} = this.props;
      joinGroup({
          user,
          added_by: session,
          group: group_details.group_id,
          when: 'add_group_member'
      })
    }

    render() {
        let {group_details} = this.props;

        return (
            <div>
                <Title value="Add members" />

                <FadeIn duration="300ms">
                   <div className="wrapper_s">
                       <div className="wrapper_k">
                           <GroupInstruction />
                       </div>

                       <div className="wrapper_p">
                           <div className="a_m">
                               <div className="a_m_header">
                                   <span>Add members</span>
                               </div>

                               <div className="a_m_main">
                                   <SearchFolowings
                                        placeholder="Search to add"
                                        when="add_grp_members"
                                        disabled={!Me(group_details.admin)}
                                        done={user => this.addMember(user)}
                                   />
                               </div>
                           </div>
                       </div>
                   </div>
                </FadeIn>
            </div>
        )
    }
  }

  const mapStateToProps = state => ({
      group_details: state.Group.group_details,
      session: state.User.session.id
  })

  export default connect(mapStateToProps)(AddGroupMemebers);
  export {AddGroupMemebers as PureAddGroupMemebers}