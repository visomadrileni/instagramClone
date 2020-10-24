 import React,{Fragment} from 'react';
 import {FadeIn} from 'animate-components';
 import Nothing from '../../others/nothing';
 import {string,node,arrayOf} from 'prop-types';

 const MapPosts = ({posts,nothingMssg}) => {
     let len = posts.length

     return (
         <Fragment>
             {len === 0 ? (
                 <Nothing message={nothingMssg} />
             ) : (
                 <FadeIn duration="300ms">{posts}</FadeIn>
             )}
         </Fragment>
     )
 }

 MapPosts.propTypes = {
     posts: arrayOf(node).isRequired,
     nothingMssg: string.isRequired
 }

 export default MapPosts;