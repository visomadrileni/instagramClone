 import React from 'react';
 import ToolTip from 'react-tooltip';
 import IsOnline from './isOnline';
 import BannerInfo from './info';
 import BannerTags from './tags/tags';
 import BannerAvatar from './avatar'
 import BannerFollow from './follow';
 import BannerStats from './stats/stats';
 import BannerTopOptions from './top-options/top-options';

 const Banner = () => (
     <div className="pro_banner">
         <div className="pro_top">
             <BannerTopOptions />
             <BannerFollow />
         </div>

         <BannerAvatar />
         <BannerInfo />
         <BannerTags />

         <hr />

         <IsOnline />
         <BannerStats />

         <ToolTip />
     </div>
 )

 export default Banner;