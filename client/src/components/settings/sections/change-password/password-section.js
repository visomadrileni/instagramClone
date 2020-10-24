 import React from 'react';
 import TextInput from '../../../others/input/text';
 import {string,func} from 'prop-types';

 const PasswordSection = ({label,value,change}) => (
     <div>
         <span>{label}</span>
         <TextInput
           type="password"
           placeholder={label}
           value={value}
           valueChange={change}
         />
     </div>
 )

 PasswordSection.propTypes = {
     label: string.isRequired,
     value: string.isRequired,
     change: func.isRequired
 }

 export default PasswordSection;