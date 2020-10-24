 import React,{Fragment} from 'react';
 import Spinner from './spinner';
 import Loading from './loading';
 import {bool,oneOf} from 'prop-types';
 
 const IsLoading = ({loading,when}) => (
     <Fragment>
         {loading ? ( when === 'page' ? <Loading /> : <Spinner />) : null}
     </Fragment>
 )

  IsLoading.defaultProps = {
      when: 'component'
  }

  IsLoading.propTypes = {
      when: oneOf(['component','page']),
      loading: bool.isRequired
  }

  export default IsLoading;
















