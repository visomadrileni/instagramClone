 import React,{Fragment} from 'react';
 import AppLink from '../../../../others/link/link';
 import {number,string} from 'prop-types';

 const OpenPost = ({when,post_id}) => {
     return (
            <Fragment>
               {when !== 'viewPost' && (<li><AppLink url={`/post/${post_id}`} label="Open" /></li>)}
        </Fragment>
     )
 }

 OpenPost.propTypes = {
     when: string.isRequired,
     post: number.isRequired
 }

 export default OpenPost;