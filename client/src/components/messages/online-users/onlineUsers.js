 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import {getOnlineUsers} from '../../../actions/message';
 import {removeHr} from '../../../utils/utils';
 import OnlineUser from './onlineUser';
 import Title from '../../others/title';
 import IsLoading from '../../others/isLoading';
 import Overlay from '../../others/overlay';
 import ModalHeader from '../../others/modal/modal-header';
 import ModalMiddle from '../../others/modal/modal-middle';
 import ModalBack from '../../others/modal/modal-back';
 import {func} from 'prop-types';

 class OnlineUsers extends Component{
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })
     componentDidMount = () => this.props.dispatch(getOnlineUsers())
     componentDidUpdate = () => removeHr();

     render(){
         let {loading} = this.state;
         let {back,onlineUsers} = this.props;
         let map_onlineusers = onlineUsers.map(o => (
             <OnlineUser key={o.user} {...o} back={back} />
         ))

         return (
             <Fragment>
                 <Overlay />

                 <div className="modal modal_big">
                     <Title value="Online members" />

                     <FadeIn duration="300ms">
                         <ModalHeader title="Online members" />

                         <Scrollbars style={{ height: 450 }} className="modal_middle">
                             <IsLoading loading={loading} />
                             <ModalMiddle loading={loading} list={map_onlineusers} />
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

 OnlineUsers.propTypes = {
     back: func.isRequired
 }

 const mapStateToProps = state => ({
     onlineUsers: state.Message.onlineUsers
 })

 export default connect(mapStateToProps)(OnlineUsers)
 export {OnlineUsers as PureOnlineUsers}