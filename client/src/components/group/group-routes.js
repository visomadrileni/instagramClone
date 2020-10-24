 import React from 'react';
 import {Switch,Route,Redirect} from 'react-router';
 import GroupPosts from './sections/posts/group-posts';
 import GroupGallery from './sections/gallery/group-gallery';
 import AboutGroup from './sections/about/abaut-group';
 import EditGroup from './sections/edit/edit-group';
 import GroupMembers from './sections/members/group-members';
 import AddGroupMembers from './sections/add-members/add-group-members';
 import {string} from 'prop-types'

 const GroupRoutes = ({url,group_id}) => (
   <div className="hmm">
       <Switch>
           <Route exact path={`${url}`} component={() => <GroupPosts group_id={group_id} />} />
           <Route path={`${url}/gallery`} component={GroupGallery} />
           <Route path={`${url}/about`} component={AboutGroup} />
           <Route path={`${url}/edit`} component={() => <EditGroup group_id={group_id} />} />
           <Route path={`${url}/members`} component={GroupMembers} />
           <Route path={`${url}/add-members`} component={() => <AddGroupMembers group_id={group_id} />} />
           <Redirect to="/error" />
       </Switch>
   </div>
 )

 GroupRoutes.propTypes = {
     url: string.isRequired,
     group_id: string.isRequired
 }

 export default GroupRoutes;