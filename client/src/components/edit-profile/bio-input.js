import React from 'react';
import TextArea from '../others/input/textArea';
import {string,func} from 'prop-types';

 const BioInput = ({value,change}) => (
   <div className="edit_bio_div">
       <span className="edit_span">Bio</span>
        <TextArea 
          className="edit_ta"
          placeholder="Bio"
          maxLength= "1000"
          value={value}
          valueChange={e => change('bio',e)}
        />
   </div>
 )

 BioInput.propTypes = {
     value: string.isRequired,
     change: func.isRequired
 }

 export default BioInput;
































