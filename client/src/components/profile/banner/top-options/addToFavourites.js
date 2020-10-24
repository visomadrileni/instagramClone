 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../utils/utils';
 import {addToFavourites} from '../../../../utils/user-interact-utils';
 import {func} from 'prop-types';

 const BannerAddToFavourites = ({id,toggleOptions}) => {
      let addToFavs = e => {
          e.preventDefault()
          toggleOptions();
          addToFavourites(id)
      }

      return (
          <Fragment>
              {!Me(id) && (
                  <li>
                      <a href="#" className="add_fav" onClick={addToFavs}>Add to favourites</a>
                  </li>
              )}
          </Fragment>
      )
 }

 BannerAddToFavourites.propTypes = {
    toggleOptions: func.isRequired
 }

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(BannerAddToFavourites)