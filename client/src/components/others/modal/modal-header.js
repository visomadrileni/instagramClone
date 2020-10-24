 import React from 'react';
 import {string} from 'prop-types';

 const ModalHeader = ({title}) => (
     <div className="modal_header">
         <span className="title">{title}</span>
     </div>
 )

 ModalHeader.defaultProps = {
     title: ''
 }

 ModalHeader.propTypes = {
     title: string.isRequired
 }

 export default ModalHeader;






