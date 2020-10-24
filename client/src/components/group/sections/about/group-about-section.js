 import React from 'react';
 import AppLink from '../../../others/link/link';
 import {string} from 'prop-types';

 const GroupAboutSection = ({label,value,type,url}) => {
    return (
        <div>
            <spam className="a_label">{label}</spam>
            {type === 'link' ? (
                <AppLink url={url} className="a_info" label={value} />
            ) : (
                <span className="a_info">{value}</span>
            )}
        </div>
    )
 }

 GroupAboutSection.defaultProps = {
     type: 'text'
 }

 GroupAboutSection.propTypes = {
     label: string.isRequired,
     value: string.isRequired,
     type: string,
     url: string
 }

 export default GroupAboutSection;