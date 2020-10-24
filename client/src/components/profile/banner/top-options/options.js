 import React,{Fragment} from 'react';
 import BannerBlockUser from './blockUser'
 import BannerRemoveUser from './removeUser';
 import BannerMessageUser from './messageUser'
 import BannerAddToFavs from './addToFavourites';
 import BannerRecommendUser from './recommendUser';
 import CopyLink from '../../../others/copyLink';
 import {func} from 'prop-types';

 const BannerOptions = ({toggleOptions}) => {
     return  (
        <Fragment>
           <ul>
               <BannerBlockUser toggleOptions={toggleOptions} />
               <BannerAddToFavs toggleOptions={toggleOptions} />
               <BannerMessageUser toggleOptions={toggleOptions} />
               <BannerRecommendUser toggleOptions={toggleOptions} />
               <BannerRemoveUser />
    
               <CopyLink url={window.location.href} label="Copy profile link" done={toggleOptions} />
           </ul>
        </Fragment>
     )
 }

 BannerOptions.propTypes = {
     toggleOptions: func.isRequired
 }

 export default BannerOptions;