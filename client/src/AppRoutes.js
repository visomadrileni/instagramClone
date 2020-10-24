import React from 'react';
import {Switch,Route} from 'react-router'
import {Redirect} from 'react-router-dom';
import Home from './components/home/home';
import Profile from './components/profile/profile';
import Error from './components/error/error'
import EmailVerification from './components/email-verification/email-verification';
import Notifications from './components/notifications/notifications'
import EditProfile from './components/edit-profile/edit-profile';
import ViewPost from './components/post/view-post/view-post'
import Explore from './components/explore/explore'
import Settings from './components/settings/settings';
import Group from './components/group/group';
import Messages from './components/messages/messages';
import Hashtag from './components/hashtag/hashtag/hashtag';
import AdminLogin from './components/admin/admin-login';
import IsAdmin from './components/admin/is-admin';

// We refer as this.props.match.params.username
// :username is props that will be change dynamically on childComponent(oN opur case Profile Component with help of actions than will be dispatch to Reducers) 

const AppRoutes = () => (
    <div className="wrapp_routes">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile/:username" component={Profile} />
            <Route path="/error/:what" component={Error} />
            <Route path="/email-verification/:is" component={EmailVerification} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="post/:post_id" component={ViewPost} />
            <Route path="/explore" component={Explore} />
            <Route path="/settings" component={Settings} />
            <Route path="/group/:group_id" component={Group} />
            <Route path="messages" component={Messages} />
            <Route path="/hashtag/:hashtag" component={Hashtag} />
            <Route path="/admin-login" component={AdminLogin} />
            <Route path="/is-admin" component={IsAdmin} />
            <Redirect to="/error" />
        </Switch>
    </div>
)

export default AppRoutes;