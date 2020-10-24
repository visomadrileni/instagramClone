import React,{Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import {getUnreadMessages} from '../actions/message';
import {getUnreadNotifications} from '../actions/notification'
import AppRoutes from '../AppRoutes';
import Header from '../components/others/header/Header';
import NotiSpeak from '../components/others/noti-speak';
import SideBar from '../components/others/sidebar/sidebar';

class Username extends Component {
    componentDidMount = () => {
        let {dispatch} = this.props;
        dispatch(getUnreadNotifications())
        dispatch(getUnreadMessages())
    }

    render(){
       let {unreadMessages,unreadNotifications} = this.props;

       return (
           <Router>
               <div className="app">
                   <Header />
                   <NotiSpeak unreadNotifications={unreadNotifications} />
                   <SideBar unreadNotifications={unreadNotifications} unreadMessages={unreadMessages} />
                   <AppRoutes />
               </div>
           </Router>
       )
    }
}

const mapStateToProps = state => ({
    unreadNotifications: state.Notification.unreadNotifications,
    unreadMessages: state.Message.unreadMessages
})

export default connect(mapStateToProps)(Username)
export {Username as PureUsername}