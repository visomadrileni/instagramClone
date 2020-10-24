 import React from 'react';
 import {connect} from 'react-redux';
 import {humanReadable} from '../../../utils/utils';
 import {string} from 'prop-types';

 const HashtagInfo = ({hashtag,len}) => (
    <div className="hashtag_info">
        <span>#{hashtag}</span>
        <span className="no_of_tag_peop">{humanReadable(len,'post')}</span>
    </div>
 )

 HashtagInfo.propTypes = {
     hashtag: string.isRequired
 }
 
 const mapStateToProps = state => ({
     len: state.Hashtag.hashtagPosts.length
 })

 export default connect(mapStateToProps)(HashtagInfo)