 import React from 'react';
 import d from '../../utils/api/Dom';
 import {string} from 'prop-types';

 const End = ({message}) => {
     let toTop = () => {
         new d('.data').scrollTop()
     }

     return (
         <div className="page_end" onClick={toTop}>
             <span>{message}</span>
         </div>
     )
 }

 End.defaultProps = {
     message: "Looks like you've reached the end"
 }

 End.propTypes = {
     message: string
 }

 export default End;