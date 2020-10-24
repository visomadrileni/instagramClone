 import React,{Component,Fragment} from 'react';
 import {post} from 'axios';
 import {connect} from 'react-redux';
 import * as PostUtils from '../../../utils/post-utils';
 import MaterialIcon from '../../others/icons/material-icon';
 import {number,string,shape} from 'prop-types';

 class PostBookmark extends Component {
     state = { bookmarked: false }

     componentDidMount = async () => {
        let {postDetails:{post_id}} = this.props;
        let {data:{bookmarked}} = await post('/api/bookmarked-or-not',{post_id})
        this.setState({ bookmarked})
     }

     bookmark = async () => {
         let {postDetails: {post_id}} = this.props;
         PostUtils.bookmark({
             post_id,
             done: () => this.setState({ bookmarked: true })
         })
     }

     unbookmark = async () => {
         let {postDetails: {post_id,when},dispatch,user_details:{id}} = this.props;
         PostUtils.unbookmark({
             post_id,
             when,
             user: id,
             dispatch,
             done: () => this.setState({ bookmarked: false})
         })
     }

     render(){
         let {bookmarked} = this.props;

         return (
             <Fragment>
                 <div className="p_bmrk_wra">
                     {bookmarked ? (
                         <span className="p_bookmark undo_bookmark" onClick={this.unbookmark} data-tip="Undo bookmark">
                             <MaterialIcon icon="bookmark" />
                         </span>
                     ) : (
                         <span className="p_bookmark" onClick={this.bookmark} data-tip="Bookmark">
                             <MaterialIcon icon="bookmark_border" />
                         </span>
                     )}
                 </div>
             </Fragment>
         )
     }
 }

 PostBookmark.propTypes = {
     postDetails: shape({
         post_id: number.isRequired,
         when: string.isRequired
     }).isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(PostBookmark);
 export {PostBookmark as PurePostBookmark}