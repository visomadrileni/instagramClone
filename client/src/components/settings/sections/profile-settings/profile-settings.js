 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {cLoading} from  '../../../../utils/utils';
 import {getUserDetails} from '../../../../actions/user';
 import {getBlockedUsers} from '../../../../actions/settings';
 import Title from '../../../others/title';
 import IsLoading from '../../../others/isLoading';
 import BlockedUsers from './blocked-users/blocked-users';
 import ChangeAccountType from './account-type/account-type';

 class ProfileSettings extends Component {
     state = {loading: true}

     componentWillReceiveProps = () => this.setState({ loading: false })

     componentDidMount = () => {
         let {session:{username},dispatch} = this.props;
         dispatch(getUserDetails(username))
         dispatch(getBlockedUsers())
     }


     render(){
         let {loading} = this.props;

         return (
             <div>
                 <Title value="Profile settings" />

                 <FadeIn duration="300ms">
                     <IsLoading loading={loading} />

                     <div className={classNames('pro_settings',cLoading(loading))}>
                         <ChangeAccountType />
                         <BlockedUsers />
                     </div>
                 </FadeIn>
             </div>
         )
     }
 } 

 const mapStateToProps = state => ({
     session: state.User.session
 })

 export default connect(mapStateToProps)(ProfileSettings)
 export {ProfileSettings as PureProfileSettings}