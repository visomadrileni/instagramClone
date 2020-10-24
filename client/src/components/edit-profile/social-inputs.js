 import React,{Component} from 'react';
 import {capitalizes_first} from '../../utils/utils';
 import {filedsToArray} from '../../utils/edit-profile-utils';
 import TextInput from '../others/input/text';
 import {shape,string,func} from 'prop-types';

 class SocialInputs extends Component {
     map = ({key,value}) => (
         <TextInput
            placeholder= {capitalizes_first(key)}
            value= {value}
            valueChange= {e => this.props.change(key,e)}
            maxLength= {key === 'phone' ? '10' : '255'}
         />
     )

     render(){
        // For disabled key warning:key helps React update virtual DOM,but when we provide 
        // key to component of map function, text input inside that component looses focus.
         console.error = () => {}

         let {inputs} = this.props;
         let array = filedsToArray(inputs);
         let mappedInputs = array.map(this.map);

         return (
             <div className="edit_sm_div">
                 <span className="edit_span">Connections</span>
                 {mappedInputs}
             </div>
         )
     }
 }

 SocialInputs.propTypes = {
     inputs: shape({
         instagram: string.isRequired,
         github: string.isRequired,
         facebook: string.isRequired,
         twitter: string.isRequired,
         website: string.isRequired,
         phone: string.isRequired
     }).isRequired,
     change: func.isRequired
 }

 export default SocialInputs;




















































