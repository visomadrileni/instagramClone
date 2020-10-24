 import React from 'react';
 import AppLink from '../../../others/link/link';
 import ToTags from '../../../hashtag/toTags/toTags';
 import {string,bool} from 'prop-types';

 const AboutSection = ({label,value,isLink}) => {
     let editLink = text => <AppLink url="/edit-profile" label={text} />

     return (
         <div>
             <span className="a_label">{label}</span>
             {value ? (!isLink ? (
                 <span className="a_info">
                     {label === "Bio" ? <ToTags str={`${value}`} /> : value}
                 </span>
             ) : (
                 <a href={value} className="a_info" target="_blank">{value}</a>
             )) : (
                 editLink(`Add ${label} account`)
             )}
         </div>
     )
 }

 AboutSection.defaultProp = {
     isLink: false
 }

 AboutSection.propTypes = {
     label: string.isRequired,
     value: string.isRequired,
     isLink: bool
 }

 export default AboutSection;