 import React from 'react';
 import {string,bool} from 'prop-types';

 const Nothing = props => {
     let {message,showMessage,secondMessage,conPage} = props;

     return (
         <div className="home_last_mssg" style={{ border: !showMessage ? 'none' : ''}}>
             <img src={`/images/${conPage ? 'elephant-march.png' : 'large.jpg'}`} />
             {showMessage ? <span className="nothingMssg">{message}</span> : null}
             <span className="secondMssg">{secondMessage}</span>
         </div>
     )
 }

 Nothing.defaultProps = {
     message: 'Hello, a message for you',
     showMessage: true,
     secondMessage: '',
     conPage:  false
 }

 Nothing.propTypes = {
     message: string,
     secondMessage: string,
     showMessage: bool,
     conPage: bool
 }

 export default Nothing;



















