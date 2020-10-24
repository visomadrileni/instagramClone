 import React,{Fragment} from 'react';
 import {NavLink} from 'react-router-dom';
 import {uData} from '../../../utils/utils';
 import zizu from '../../../assets/images/zizu.jpg';
 import HomeIcon from '@material-ui/icons/Home';
 import TelegramIcon from '@material-ui/icons/Telegram';
 import ExploreIcon from '@material-ui/icons/Explore';
 import FavoriteIcon from '@material-ui/icons/Favorite';

 const HeaderTopLinks = () => {
     let id = uData('session');
     let username = uData('username');

    return (
        <Fragment>
            <NavLink to="/notifications" activeClassName="ha_active" className="notification">
                <span className="notification_span">
                    <HomeIcon color="primary" style={{paddingRight:'10px',fill: "black"}}/>
                    <TelegramIcon color="primary" style={{paddingRight:'10px',fill: "black"}} />
                    <ExploreIcon color="primary" style={{paddingRight:'10px',fill: "black"}} />
                    <FavoriteIcon color="primary" style={{paddingRight:'10px',fill: "black"}} />
                </span>      
            </NavLink>

            <NavLink to={`/profile/${username}`} style={{top:'2px'}} activeClassName="ha_active">
                <img src={`${zizu}`} alt="avatar"></img>
                <span className="sp_span">{username}</span>
            </NavLink>
        </Fragment>
    )
 }

 export default HeaderTopLinks;