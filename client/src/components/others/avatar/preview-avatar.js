 import React,{Fragment} from 'react';
 import {FadeIn} from 'animate-components';
 import Overlay from '../overlay';
 import ModalHeader from '../modal/modal-header';
 import PrimaryButton from '../button/primary-button';
 import SecondaryButton from '../button/secondary-button';
 import {string,func} from 'prop-types';

 const PreviewAvatar = ({previewAvatar,upload,back}) => {
    return (
         <Fragment>
             <Overlay />

             <div className="preview_avatar modal">
                 <FadeIn duration="300ms">
                     <ModalHeader title="Change Avatar" />

                     <div className="c_a_middle">
                         <img src={previewAvatar} />
                     </div>

                     <div className="c_a_bottom modal_bottom">
                         <SecondaryButton label="Cancel" onClick={back} />
                         <PrimaryButton label="Change Avatar" onClick={upload} extraClass="c_a_add" />
                     </div>
                 </FadeIn>
             </div>
         </Fragment>      
     )
 }

 PreviewAvatar.propTypes = {
     previewAvatar: string.isRequired,
     upload: func.isRequired,
     back: func.isRequired
 }

 export default PreviewAvatar;