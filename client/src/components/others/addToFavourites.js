 import React from 'react';
 import {addToFavourites} from '../../utils/user-interact-utils';
 import d from '../../utils/api/Dom';
 import SecondaryButton from './button/secondary-button';
 import {number,string} from 'prop-types';
 
 const AddToFavourites = ({user,username}) => {
     let add = e => {
         e.preventDefault()
         addToFavourites(user)
         new d('.af_btn').blur()
     }

     return (
         <div>
             <div className="recomm_teaser">
                 <span>Want to add {username} to your favourites list.</span>
                 <SecondaryButton label="Add" onClick={add} />
             </div>
         </div>
     )
 }

 AddToFavourites.propTypes = {
     user: number.isRequired,
     username: string.isRequired
 }

 export default AddToFavourites;