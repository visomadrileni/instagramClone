 import React from 'react';
 import {connect} from 'react-redux';
 import classNames from 'classnames'
 import {changePostitProperties} from '../../../actions/post';
 import {geolocation,getAddress} from '../../../utils/location-utils';
 import MaterialIcon from '../../others/icons/material-icon';

 const GetLocation = ({postIt,dispatch}) => {
     let {location} = postIt;

     let changeProperties = (...args) => dispatch(changePostitProperties(...args))

     let geoLoc = async () => {
         let geolocationSuccess = async pos => {
             changeProperties('fetchingLocation',true)
             let address = await getAddress(pos)
             changeProperties('location',address)
             changeProperties('fetchingLocation',false)
         }

         geolocation(geolocationSuccess)
     }

     return (
          <span className={classNames('loc_add',{p_span_toggle: location})} data-tip="Add location" onClick={geoLoc}>
                 <MaterialIcon icon="location_on" />
          </span>
     )
 }

 const mapStateToProps = state => ({
     postIt: state.Post.postIt
 })

 export default connect(mapStateToProps)(GetLocation)
 export {GetLocation as PureGetLocation}