import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import {getUnreadMessages} from './actions/message';
import {getUnreadNotifications} from './actions/notification'
import Signup from './components/home/signup';
import Login from './components/home/login'
import Username from './assets/Username'
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {
    componentDidMount = () => {
        let {dispatch} = this.props;
        dispatch(getUnreadNotifications())
        dispatch(getUnreadMessages())
    }


    render(){
       let {unreadMessages,unreadNotifications} = this.props;

       return (
           <Router>
               <Switch>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/:username" component={Username} />
               </Switch>
           </Router>
       )
    }
}

const mapStateToProps = state => ({
    unreadNotifications: state.Notification.unreadNotifications,
    unreadMessages: state.Message.unreadMessages
})

export default connect(mapStateToProps)(App);