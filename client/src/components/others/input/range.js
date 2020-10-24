 import React,{Fragment} from 'react';
 import {number,string,func,oneOfType} from 'prop-types';

 const RangeInput = ({value,min,max,onChange,...props}) => (
     <Fragment>
         <input
            type="range"
            min={min}
            max={max}
            onChange={onChange}
            {...props}
         />
     </Fragment>
 )

 RangeInput.defaultProps = {
     value: '',
     min: 0
 }

 RangeInput.propTypes = {
     value: oneOfType([number,string]).isRequired,
     min: number.isRequired,
     max: number.isRequired,
     onChange: func.isRequired
 }

 export default RangeInput;