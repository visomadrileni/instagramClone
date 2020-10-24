 import React from 'react';
 import classNames from 'classnames';
 import {cLoading} from '../../../utils/utils';
 import Nothing from '../nothing';
 import {arrayOf,bool,node} from 'prop-types';

 const ModalMiddle = ({loading,list}) => {
     let len = list.length;
     return (
         <div className={classNames('modal_main',cLoading(loading))} >
             {len === 0 ? <Nothing showMessage={false} /> : list}
         </div>
     )
 }

 ModalMiddle.propTypes = {
     loading: bool.isRequired,
     list: arrayOf(node).isRequired
 }

 export default ModalMiddle;














