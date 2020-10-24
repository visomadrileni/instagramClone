 import React from 'react';
 import PostOptions from './options/options';
 import PostTopDetails from './top-details';
 import {number,string,shape, func} from 'prop-types';
 
 const PostTop = ({postDetails,updateDescription}) => (
     <div>
         <div className="p_i">
             <PostTopDetails details={postDetails} />
             <PostOptions postDetails={{ ...postDetails}} updateDescription={updateDescription} />
         </div>
     </div>
 )

 PostTop.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         group_id: number,
         type: string.isRequired,
         location: string.isRequired,
         when: string.isRequired,
         post_time: string.isRequired,
         group_name: string,
         description: string.isRequired,
         user: number.isRequired,
         username: string.isRequired,
         firstname: string.isRequired,
         surname: string.isRequired
         }).isRequired,
      updateDescription: func.isRequired    
 }

 export default PostTop;