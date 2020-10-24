 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Instagram} from 'react-content-loader';
 import Post from '../../post/post/post';
 import MapPost from '../../post/map-posts/map-posts';
 import SectionsEnd from '../../others/sections-end';
 import {string,bool} from 'prop-types';
 

 const HashtagMiddleSection = ({loading,hashtag,posts}) => {
     let len = posts.length;
     let map_posts = posts.map(p => <Post key={p.post_id} {...p} when="hashtag" />)

     return (
         <Fragment>
             {(len === 0 || loading) && <div style={{ marginTop: 10 }} /> }
               {loading && <Instagram /> }

               <MapPost 
                  posts={map_posts}
                  nothingMssg={`No post with #${hashtag} tag found`}
               />

               <SectionsEnd len={len} />
               <div style={{ marginBottom: 20}} />
         </Fragment>
     )
 }

 HashtagMiddleSection.propTypes = {
     hashtag: string.isRequired,
     loading: bool.isRequired
 }

 const mapStateToProps = state => ({
     posts: state.Hashtag.hashtagPosts
 })

 export default connect(mapStateToProps)(HashtagMiddleSection)
 export {HashtagMiddleSection as PureHashtagMiddleSection}