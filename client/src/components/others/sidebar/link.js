import React from 'react';
import {NavLink} from 'react-router-dom';
import {number,string,bool} from 'prop-types';

const SidebarLink = ({label,link,showNumbers,numbers}) => {
    return (
        <li className="m_n_li">
            <NavLink exact to={link} activeClassName="sidebar_active" className="m_n_a">
                <span className="m_n_text">{label}</span>
                {showNumbers && numbers ? (
                    <span className="m_n_new">{numbers > 9 ? '+' : numbers }</span>
                ) : null}
            </NavLink> 
        </li>
    )
}

SidebarLink.defaultProps = {
    showNumbers: false,
    numbers: 0
}

SidebarLink.propTypes = {
    label: string.isRequired,
    link: string.isRequired,
    showNumbers: bool,
    numbers: number
}

export default SidebarLink;