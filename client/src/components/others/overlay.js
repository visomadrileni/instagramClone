 import React from 'react';
 import {oneOf,bool,number,func} from 'prop-types';

 const Overlay = ({ type,close_on_click,close,opacity}) => {
     let cls = type === "black" ? 'overlay' : type === 'white' ? 'hidden_overlay' : type === 'colored' ? 'colored_overlay' : null

     return (
         <div className={cls} style={{ cursor: close_on_click ? 'zoom-out' : 'inherit', opacity}} 
         onClick={close_on_click ? close : null} />
     )
 }

 Overlay.defaultProps = {
     type: 'black',
     close_on_click: false,
     opacity: 0.5,
     close: () => null
 }

 Overlay.propTypes = {
     type: oneOf(['black','white','colored']),
     close_on_click: bool,
     opacity: number,
     close: func
 }

 export default Overlay;
























