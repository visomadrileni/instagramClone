 import React from 'react';
 import {post} from 'axios';
 import {NavLink} from 'react-router-dom';
 import {uData} from '../../../utils/utils';
 import {isAdmin} from '../../../utils/admin-utils';
 import {notify} from '../../../utils/utilMethods/handy-notification';
 import SidebarLink from './link';
 import SidebarBottom from './bottom';
 import {number} from 'prop-types';
 
 const Sidebar = ({unreadNotifications,unreadMessages}) => {
     let username = uData('username');
     let profile = `/profile/${username}`

     let adminLogout = async e => {
         e.preventDefault()
         await post('/api/admin-logout')
         notify({
             value: 'Logged out as admin',
             done: () => window.location.reload()
         })
     }

     return (
         <div className="m_n_wrapper">
             <div className="m_n">
                 <ul className="m_n_ul">
                     <SidebarLink link={profile} label='@Zizu' />
                     <SidebarLink link="/" label="Home" />
                     <SidebarLink link="/explore" label="Explore" />
                     <SidebarLink link="/notifications" label="Notifications" showNumbers numbers={unreadNotifications} />
                     <SidebarLink link="/messages" label="Messages" showNumbers numbers={unreadMessages} />
                     <SidebarLink link={`${profile}/bookmarks`} label="Bookmarks" />
                     <SidebarLink link={`${profile}/gallery`} label="Gallery" />
                     <SidebarLink link={`${profile}/favourites`} label="Favourites" />
                     <SidebarLink link={`${profile}/groups`} label="Group" />
                     <SidebarLink link={`${profile}/recommandations`} label="Recommendations" />
                     <SidebarLink link="/edit-profile" label="Edit Profile" />
                     <SidebarLink link="/settings" label="Settings" />

                     <li>
                         {isAdmin() ? (
                             <a href="#" className="admin-logout" onClick={adminLogout}>Logout as admin </a>
                         ) : (
                             <NavLink to={`/admin-login?to=${window.location.pathame}`} className="m_n_a_admin">
                                 Are you admin ?
                             </NavLink>
                         )}
                     </li>
                 </ul>
             </div>

             <SidebarBottom />
         </div>
     )
 }

 Sidebar.propTypes = {
     unreadNotifications: number.isRequired,
     unreadMessages: number.isRequired
 }

 export default Sidebar;