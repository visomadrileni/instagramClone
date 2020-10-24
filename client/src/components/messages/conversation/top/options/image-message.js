 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {imageMessage} from '../../../../../utils/message-utils';
 import FileInput from '../../../../others/input/file';
 import {func} from 'prop-types';

 const ImageMessage = ({conDetails,toggleOptions,dispatch}) => {
      let {con_with,con_with_username} = conDetails;

      let message = async e => {
          e.preventDeafult();
          toggleOptions();
          imageMessage({
              con_id: con_with,
              con_with: con_with_username,
              file: e.target.files[0],
              dispatch
          })
      }

     return (
         <Fragment>
             <li>
                 <form className="mssg_add_img_form">
                     <FileInput
                         value=""
                         fileChange={message}
                         label="Send image"
                         labelClass="mssg_img"
                     />
                 </form>
             </li>
         </Fragment>
     ) 
 }

 ImageMessage.propTypes = {
    toggleOptions: func.isRequired
 }

 const mapStateToProps = state => ({
     conDetails: state.Message.conDetails
 })

 export default connect(mapStateToProps)(ImageMessage);
 export {ImageMessage as PureImageMessage}