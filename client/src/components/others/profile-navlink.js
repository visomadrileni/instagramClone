 import React from 'react';
 import {NavLink} from 'react-router-dom';
 import {string} from 'prop-types';

 const ProfileNavLink = ({ url,label}) => {
   return (
            <li>
                <NavLink exact to={url} className="inst_nav" activeClassName="pro_nav_active">
                    {label}             
                </NavLink>
            </li>
       )
 }
 
 ProfileNavLink.propTypes = {
     url: string.isRequired,
     label: string.isRequired
 }

 export default ProfileNavLink;