 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {removeHr} from '../../../utils/utils';
 import {getUsersToMakeAdmin} from '../../../actions/group';
 import IsLoading from '../../others/isLoading';
 import Overlay from '../../others/overlay'
 import InviteList from './change-admin-list';
 import ModalHeader from '../../others/modal/modal-header';
 import ModalMiddle from '../../others/modal/modal-middle';
 import ModalBack from '../../others/modal/modal-back';
 import {func,number} from 'prop-types';

 class SwapAdmin extends Component{
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false})

     componentDidMount = () => {
         let {dispatch,group} = this.group;
         dispatch(getUsersToMakeAdmin(group))
     }

     componentDidUpdate = () => removeHr()

     render(){
         let {loading} = this.state;
         let {members,group,back} = this.props;
         let map_users = members.map(m => (
             <InviteList key={m.grp_member_id} {...m} group={group} />
         ))

         return (
             <Fragment>
                 <Overlay />

                 <div className="likes modal modal_big">
                     <FadeIn duration="300ms">
                         <ModalHeader title="Transfer admin position" />

                         <Scrollbars style={{height: 450}} className="modal_middle">
                            <IsLoading loading={loading} />
                            <ModalMiddle
                                loading={loading}
                                list={map_users}
                             />
                         </Scrollbars>

                         <div className="modal_bottom">
                             <ModalBack back={back} />
                         </div>
                     </FadeIn>
                 </div>
             </Fragment>
         )
     }
 }

 SwapAdmin.propTypes = {
    group: number,
    back: func.isRequired
  }
 const mapStateToProps = state => ({
     members:  state.Group.usersToMakeAdmin
 })

 export default connect(mapStateToProps)(SwapAdmin);
 export {SwapAdmin as PureChangeAdmin}


















































