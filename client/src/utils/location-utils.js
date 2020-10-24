import {post} from 'axios';
import {notify} from '../utils/utilMethods/handy-notification';

const GOOGLE_GEOLOCATION_KEY = process.env.GOOGLE_GEOLOCATION_KEY;

/**
 * Geolocation setup
 * @param {Function} success Success function
 */
 export const geolocation = success => {
     if(navigator.geolocation){
         navigator.geolocation.watchPosition(success,geolocationError)
     }else{
      notify({ value: 'Geolocation not supported'})
     }
 }
 
/**
 * Geolocation error
 */
 export const geolocationError = ({code}) => {
     let message = code === 1 ? `Location permission denied`
     : code === 2 ? 'Location signal lost'
     : code === 3 ? 'Location request timed out'
     : code === 0 ? 'Unknown location error'
     : null

     notify({
         value: message
     })
 }

/**
 * Returns human readable address from the given the 
 * cordinates
 * @param {Object} pos
 */
 export const getAddress = async pos => {
     let {latitude,longitude} = pos.coords;
     let {data: {results}} = await post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOLOCATION_KEY}`);
     let loc = results[0].formattted_address
     return loc;
 }









































































































