 import React from 'react'
 import classNames from 'classnames';
 import {Me} from '../../utils/utils';
 import ProfileNavLink from '../others/profile-navlink';
 import {number,string} from 'prop-types';

 const ProfileNav = ({url,user}) => {
     return (
         <dic className={classNames('pro_nav','user_nav',{not_me_nav: !Me(user)})}>
             <ul>
                 <ProfileNavLink url={url} label="Posts" />
                 <ProfileNavLink url={`${url}/tagged`} label="Tagged" />
                 <ProfileNavLink url={`${url}/shared`} label="Shared" />
                 <ProfileNavLink url={`${url}/gallery`} label="Gallery" />
                 {Me(user) && (<ProfileNavLink url={`${url}/bookmarks`} label="Bookmarks" />)}
                 <ProfileNavLink url={`${url}/groups`} label="Groups" />
                 <ProfileNavLink url={`${url}/about`} label="About" />
             </ul>
         </dic>
     )
 }

 ProfileNav.propTypes = {
     url: string.isRequired,
     user: number.isRequired
 }

 export default ProfileNav;