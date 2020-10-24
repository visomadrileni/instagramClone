 import React from 'react';
 import AppLink from '../link/link';
 import {func} from 'prop-types';

 const HeaderOptions = ({toggleOptions}) => {
     let clicked = () => toggleOptions()

     return (
         <div className="sp_options options">
             <ul className="o_ul">
                 <li className="o_li" onClick={clicked}>
                    <AppLink url="/settings" className="o_a" title="Settings" label="Settings" />
                 </li>
                 <li className="o_li" onClick={clicked}>
                     <AppLink url="/edit-profile" className="o_a" title="Edit" label="Edit" />
                 </li>
                 <li className="o_li">
                     <a href="/help" className="o_a">Help</a>
                 </li>
                 <li className="o_li">
                     <a href="/about" className="o_a">About</a>
                 </li>
                 <li className="o_li">
                     <a href="/developer">Developer</a>
                 </li>
                 <li className="o_li">
                    <hr className="menu_divider" />
                 </li>
                 <li className="o_li">
                     <a href="/logout" className="o_a">Logout</a>
                 </li> 
             </ul>
         </div>
     )
 }

 HeaderOptions.propTypes = {
     toggleOptions: func.isRequired
 }

 export default HeaderOptions;