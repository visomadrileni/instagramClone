 import React from 'react';
 import {Scrollbars} from 'react-custom-scrollbars';
 import Spinner from '../spinner';
 import {string,bool,func,arrayOf} from 'prop-types';

 const MapAvatars = ({avatars,loading,selectAvatar}) => {
     let map_avatars = avatars.map(a => (
         <img 
             key={a}
             src={`/images/avatars/${a}`}
             data-avatar={`avatar-${a}`}
             onClick={() => selectAvatar()}
             className="pro_ava_avts"
         />
     ))

     return (
         <Scrollbars style={{ height: '300px'}} className="pro_ava_middle">
             <div className="pro_ava_content">
                 {loading ? <Spinner /> : map_avatars}
             </div>
         </Scrollbars>
     )
 }

 MapAvatars.propTypes = {
     avatars: arrayOf(string).isRequired,
     loading: bool.isRequired,
     selectAvatar: func.isRequired
 }

 export default MapAvatars;