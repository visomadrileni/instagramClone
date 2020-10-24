 import React from 'react';
 import OpenPost from './openPost';
 import EditPostOption from './editPost';
 import DeletePostOption from './deletePost';
 import RemBookmarkAsAdmin from './remBookmark';
 import CopyLink from '../../../../others/copyLink';
 import {number,string,func,shape} from 'prop-types';

 const PostOptionLists = ({postDetails,toggleOptions,updateDescription}) => {
     let {post_id,user,when,description} = postDetails;

     return (
         <div>
             <ul>
                 <OpenPost when={when} post_id={post_id} />
                 <EditPostOption
                    postDetails={{user,post_id,description}}
                    updateDescription={updateDescription}
                    toggleOptions={toggleOptions}
                 />
                 <DeletePostOption
                    postDetails={{post_id,user,when}}
                    toggleOptions={toggleOptions}
                 />
                 <RemBookmarkAsAdmin {...postDetails} />
                 <CopyLink
                   url={`${window.location.origin}/post/${post_id}`}
                   label="Copy link"
                   done={toggleOptions}
                 />
             </ul>
         </div>
     )
 }

 PostOptionLists.propTypes = {
     postDetails: shape({
         user: number.isRequired,
         post_id: number.isRequired,
         when: string.isRequired,
         description: string.isRequired
        }).isRequired,
     updateDescription: func.isRequired,
     toggleOptions: func.isRequired   
 }

 export default PostOptionLists;