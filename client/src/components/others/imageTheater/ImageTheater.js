 import React,{Fragment} from 'react';
 import ToolTip from 'react-tooltip';
 import {FadeIn} from 'animate-components';
 import ImageTheatreInfo from './info'
 import Overlay from '../overlay';
 import {string,bool,func} from 'prop-types';
 
 const ImageTheater = props => {
     let {imgSrc,filter,back} = props;

     return (
         <Fragment>
             <Overlay close_on_click close={back} opacity={0.9} />

             <div className="image_show">
                 <FadeIn duration="300ms">
                     <div className="img_s_img">
                         <img src={imgSrc} className={filter} />
                         <ImageTheatreInfo {...props} />
                     </div>
                     <ToolTip />
                 </FadeIn>
             </div>
         </Fragment>
     )
 }

 ImageTheater.defaultProps = {
     showInfo: true,
     imgSrc: '/images/location.jpg',
     filter: ''
 }

 ImageTheater.propTypes = {
     imgSrc: string.isRequired,
     back: func.isRequired,
     filter: string,
     username: string,
     link: string,
     time: string,
     showInfo: bool
  }

  export default ImageTheater;