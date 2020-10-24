 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {getUnreadMessages} from '../../actions/message';
 import {getNotifications,readNotifications} from '../../actions/notification';
 import {cLoading} from '../../utils/utils';
 import Title from '../others/title';
 import IsLoading from '../others/isLoading';
 import End from '../others/end';
 import Nothing from '../others/nothing';
 import NotificationsHeader from './notificationsHeader';
 import Notification from './notification/notification';

 class Notifications extends Component {
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })
     componentDidMount = () => {
         let {dispatch} = this.props;
         dispatch(readNotifications())
         dispatch(getNotifications())
         dispatch(getUnreadMessages())
     }

     render(){
         let {loading} = this.state;
         let {notifications} = this.props;
         let map_notifications = notifications.map(n => <Notification key={n.notify_id} {...n} />)

         return (
             <div>
                 <IsLoading loading={loading} when="page" />
                 <Title value="Notifications" />

                 <FadeIn duration="300ms" className={cLoading(loading)} >
                     <div className="notifcations_div">
                         <NotificationsHeader />
                         {notifications.length === 0 ? <Nothing message="You have no notifications" /> : map_notifications}
                         {notifications.length !== 0 && <End />}
                     </div>
                 </FadeIn>
             </div>
         )
     }
 }

 const mapStateToProps = state => ({
     notifications: state.Notification.notifications
 })

 export default connect(mapStateToProps)(Notifications);
 export {Notifications as PureNotifications}