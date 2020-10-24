 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {notify} from '../../../../../utils/utilMethods/handy-notification';
 import {removeFavourites} from '../../../../../actions/follow';
 import {Me} from '../../../../../utils/utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import SecondaryButton from '../../../../others/button/secondary-button';
 import {number,string} from 'prop-types'

 const RemoveFav = ({fav_id,username,id,dispatch}) => {
     let removeFav = async e => {
         e.preventDefault()
         let {data:{success,message}} = await post('/api/remove-favourites',{fav_id})

         if(success){
             dispatch(removeFavourites(fav_id))
             notify({ value: `Removed ${username} from favourites`})
         } else {
             notify({ value: message })
         }
     }

     let btnLabel = `Remove ${isAdmin() ? 'as admin' : ''}`

     return (
          <Fragment>
              {Me(id) || isAdmin() ? (
                  <SecondaryButton label={btnLabel} onClick={removeFav} />
              ) : null }
          </Fragment>
     )
 }

 RemoveFav.propTypes = {
     fav_id: number.isRequired,
     username: string.isRequired
 }

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(RemoveFav)
 export {RemoveFav as PureRemoveFav}