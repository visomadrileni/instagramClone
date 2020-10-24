 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {getUserGroups} from '../../../../actions/group';
 import {bottomScroll,cLoading} from '../../../../utils/utils';
 import NoUserGroups from './no-user-groups';
 import UserGroup from './group/group';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import MonHeader from '../../../others/m-on/mon-header';
 import {string} from 'prop-types';


 class UserGroups extends Component {
     state = {loading:true}

     componentWillReceiveProps = ({user_details,dispatch}) => {
         this.setState({loading: false })
         return this.props.user_details != user_details ? dispatch(getUserGroups(user_details.id)) : null;
     }

     componentDidMount = () => {
         let {user_details:{id},dispatch} = this.props;
         dispatch(getUserGroups(id))
     }

     componentDidUpdate = () => bottomScroll()

     render(){
         let {loading} = this.state;
         let {param:{username},groups} = this.props;
         let len = groups.length;
         let map_groups = groups.map(g => <UserGroup key={g.group_id} {...g} />)

         return (
             <div>
                 <Title value={`@${username}'s groups`} />
                 <IsLoading loading={loading} />

                 <FadeIn duration="300ms" className={cLoading(loading)}>
                     <div className="wrapper_s pro_s">
                         <div className={classNames({ m_div: len !== 0, m_no_div: len === 0})}>
                             <MonHeader len={len} forWhat="group" />
                             <div className="m_wrapper">{len !== 0 && map_groups}</div>
                         </div>
                      </div>

                     <NoUserGroups />
                 </FadeIn>
             </div>
         )
     }
 }

 UserGroups.propTypes = {
     param: string.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     groups: state.Group.userGroups
 })

 export default connect(mapStateToProps)(UserGroups)
 export {UserGroups as PureUserGroups}