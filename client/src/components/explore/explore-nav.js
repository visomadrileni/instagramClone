 import React,{Fragment} from 'react';
 import {NavLink} from 'react-router-dom';
 import {string} from 'prop-types';
 
 const ExploreNav = ({url}) => {
     let commonProps = {
         activeClassName: 'exp_nav_active',
         className: 'exp_nav_link'
        }

    return (
        <Fragment>
           <ul>
               <li>
                   <NavLink exact to={`${url}`} {...commonProps}>
                       Users
                   </NavLink>
               </li>
               <li>
                   <NavLink to={`${url}/explore-photos`} {...commonProps}>
                       Photos
                   </NavLink>
               </li>
               <li>
                   <NavLink to={`${url}/explore-groups`} {...commonProps}>
                       Groups
                   </NavLink>
               </li>
           </ul>
        </Fragment>
    )
 }

 ExploreNav.propTypes = {
    url: string.isRequired
 }

 export default ExploreNav;



























