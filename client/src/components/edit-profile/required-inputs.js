 import React,{Fragment} from 'react';
 import {capitalizes_first} from '../../utils/utils';
 import {filedsToArray} from '../../utils/edit-profile-utils';
 import TextInput from '../others/input/text';
 import {shape,string,func} from 'prop-types';

 const RequiredInputs = ({fields,change}) => {
     console.error = () => {} //For disable key warning
     
     let array = filedsToArray(fields);

     let map = ({key,value}) => {
         let c = capitalizes_first(key);
         let type = key === 'email' ? 'email' : 'text';

         return (
             <div className="edit_un_div">
                 <span className="edit_span">{c}</span>
                 <TextInput 
                    type={type}
                    placeholder={c}
                    value={value}
                    valueChange={e => change(key,e)}
                    maxLength="32"
                 />
             </div>
         )
     }
     
     let mappedFields = array.map(map);

    return <Fragment>{mappedFields}</Fragment>
 }

 RequiredInputs.propTypes = {
  fields: shape({
      username: string.isRequired,
      firstname: string.isRequired,
      surname: string.isRequired,
      email: string.isRequired
     }).isRequired,
     change: func.isRequired
 }

 export default RequiredInputs;































