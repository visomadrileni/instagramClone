 import React from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames';
 import {changePostitProperties} from '../../../../actions/post';
 import {capitalizes_first} from '../../../../utils/utils';
 import d from '../../../../utils/api/Dom';
 import {string} from 'prop-types';

 const Filter = ({filter,previewImg,dispatch}) => {
     let f = filter.replace('filter-','')

     let select = () => {
         new d('.filter_div').removeClass('select_receiver_toggle')
         new d(`.fp_${filter}`).addClass('select_receiver_toggle')
         dispatch(changePostitProperties('filter',filter))
     }

     return (
         <div onClick={select} className={classNames('filter_div',`fp_${filter}`)}>
              <img src={previewImg} className={filter} alt="preview"/>
              <span>{capitalizes_first(f)}</span>
         </div>
     )
 }

 Filter.propTypes = {
     filter: string.isRequired
 }
 
 const mapStateToProps = state => ({
     previewImg: state.Post.postIt.previewImg
 })

 export default connect(mapStateToProps)(Filter)
 export {Filter as PureFilter}