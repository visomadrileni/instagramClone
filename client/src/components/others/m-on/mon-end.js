 import React,{Fragment} from 'react';
 import Nothing from '../nothing';
 import End from '../end';
 import {number,string} from 'prop-types';

 const MonEnd = ({len,nothingMssg}) => (
 <Fragment>{len === 0 ? <Nothing message={nothingMssg} /> : <End /> }</Fragment>
 )

 MonEnd.propTypes = {
     len: number.isRequired,
     nothingMssg: string.isRequired
 }


 export default MonEnd;