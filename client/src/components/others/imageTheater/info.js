 import React,{Fragment} from 'react';
 import {timeAgo} from '../../../utils/utilMethods/handyTimeAgo';
 import AppLink from '../link/link';
 import MaterialIcon from '../icons/material-icon';
 import {string,bool} from 'prop-types';

 const ImageTheatreInfo = props => {
     let {showInfo,username,time,link} = props;
     let ago = timeAgo(time) ? timeAgo(time).replace('ago',' ') : null
     let imgBy = `by ${username} (${ago})`

     return (
         <Fragment>
             {showInfo ? (
                 <div className="img_s_bottom">
                     <span className="img_s_by">{imgBy}</span>
                     <AppLink url={link} className="img_s_window" data-tip="Open separately">
                         <MaterialIcon icon="open_in_new" />
                     </AppLink>
                 </div>
             ) : null }
         </Fragment>
     )
 }

 ImageTheatreInfo.propTypes = {
     showInfo: bool.isRequired,
     username: string.isRequired,
     time: string.isRequired,
     link: string.isRequired
 }

 export default ImageTheatreInfo;