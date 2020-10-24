 import React from 'react';
 import {Switch,Route,Redirect} from 'react-router';

 import Posts from './sections/user-posts/posts';
 import Tagged from './sections/tagged/tagged';
 import About from './sections/about/about';
 import Shared from './sections/shared/shared';
 import Gallery from './sections/gallery/gallery'
 import UserGroups from './sections/groups/groups'
 import Bookmarks from './sections/bookmarks/bookmarks';
 import Followers from './sections/followers/followers';
 import Followings from './sections/followings/followings';
 import Favourites from './sections/favourites/favourites';
 import Recommendations from './sections/recommends/recommendations';
 import PeopleYouKnow from './sections/people-you-know/people-you-know';
 import {string} from 'prop-types';


 const ProfileRoutes = ({url,param:username}) => (
     <div className="profile_routes">
        <Switch>
            <Route exact path={`${url}`}  component={() => <Posts param={username} />} />
            <Route path={`${url}/tagged`} component={() => <Tagged param={username} />} />
            <Route path={`${url}/shared`} component={() => <Shared param={username} />} />
            <Route path={`${url}/gallery`} component={() => <Gallery param={username} />} />
            <Route path={`${url}/bookmarks`} component={() => <Bookmarks param={username} /> } />
            <Route path={`${url}/about`} component={About} />
            <Route path={`${url}/groups`} component={() => <UserGroups param={username} />} />
            <Route path={`${url}/followers`} component={ () => <Followers param={username} />} />
            <Route path={`${url}/followings`} component={() => <Followings param={username} /> } />
            <Route path={`${url}/favourites`} component={() => <Favourites param={username} />} />
            <Route path={`${url}/recommendations`} component={() => <Recommendations param={username} />} />
            <Route path={`${url}/people-you-know`} component={() => <PeopleYouKnow param={username}/>} />
            <Redirect to="error" />
        </Switch>
     </div>
 )

 ProfileRoutes.propTypes = {
     url: string.isRequired,
     param: string.isRequired
 }

 export default ProfileRoutes;