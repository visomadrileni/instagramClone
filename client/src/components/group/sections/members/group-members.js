 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {FadeIn} from 'animate-components';
 import {getGroupMembers} from '../../../../actions/group';
 import {bottomScroll,cLoading} from '../../../../utils/utils';
 import MembersEnd from './members-end';
 import MemberList from './member/member-list';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import MonHeader from '../../../others/m-on/mon-header';

 class GroupMembers extends Component {
     state = {loading: false }

     componentWillReceiveProps = ({dispatch,group_details}) => {
         this.setState({ loading: false})
         return this.props.group_details !== group_details ? dispatch(getGroupMembers(group_details.group_id)) : null
     }

     componentDidMount = () => {
         let {dispatch,group_details} = this.props;
         dispatch(getGroupMembers(group_details.group_id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
         let {loading} = this.state;
         let {group_details: {name},members} = this.props
         let len = members.length;
         let map_members = members.map(m => <MemberList key={m.group_member_id} {...m} />)
         
         return (
              <div>
                  <Title value={`${name} 's members`} />

                  <FadeIn duration="300ms">
                      <IsLoading loading={loading} />

                      <div className={classNames('wrapper_s','wrapper_p',cLoading(loading))}>
                          <div className={classNames({ m_div: len !== 0 , m_no_div: len == 0})} >
                              <MonHeader len={len} forWhat="member" />
                              <div className="m_wrapper">
                                  {len !== 0 ? map_members :  null}
                              </div>
                          </div>
                      </div>

                      <MembersEnd loading={loading} />
                  </FadeIn>
              </div>
         )
     }
 }

 const mapStateToProps = state => ({
     members: state.Group.members,
     group_details: state.Group.group_details
 })

 export default connect(mapStateToProps)(GroupMembers)
 export {GroupMembers as PureGroupMembers}














