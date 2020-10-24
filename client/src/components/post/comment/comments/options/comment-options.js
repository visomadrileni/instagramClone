 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import ToolTip from 'react-tooltip';
 import {Me} from '../../../../../utils/utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import EditCommentOption from './edit-comment-option';
 import DeleteCommentOption from './delete-comment-option';
 import MaterialIcon from '../../../../others/icons/material-icon';
 import {number,string,func,shape} from 'prop-types';

 class CommentOptions extends Component {
     state = { showOptions: false }

     toggleOptions = () => this.setState({ showOptions: !this.state.showOptions})

     render(){
         let {showOptions} = this.state;
         let {commentDetails:{comment_by},commentDetails,updateCommentText,decrementComments} = this.props;

         return (
             <Fragment>
                 {(Me(comment_by) || isAdmin()) && (
                     <span className="toggle_options" onClick={this.toggleOptions} data-tip="options">
                         <MaterialIcon icon="expand_more" />
                     </span>
                 )}

                 {(Me(comment_by) || isAdmin()) && showOptions && (
                    <div className="options comments_options">
                        <ul>
                            <EditCommentOption
                               commentDetails={commentDetails}
                               updateCommentText={updateCommentText}
                               toggleOptions={this.toggleOptions}
                            />

                            <DeleteCommentOption
                               commentDetails={commentDetails}
                               decrementComments={decrementComments}
                               toggleOptions={this.toggleOptions}
                            />
                        </ul>
                    </div>
                 )}

                 <ToolTip />
             </Fragment>
         )
     }
 }

 CommentOptions.propTypes = {
     commentDetails: shape({
         comment_id: number.isRequired,
         comment_by: number.isRequired,
         text: string.isRequired,
         type: string.isRequired,
         commentSrc: string.isRequired
         }).isRequired,
     decrementComments: func.isRequired,
     updateCommentText: func.isRequired     
 }

 export default connect()(CommentOptions);
 export {CommentOptions as PureCommentOptions}