 import React,{Component,Fragment} from 'react';
 import {Me} from '../../../../../utils/utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import EditPost from '../../../edit-post/editPost';
 import {number,string,func,shape} from 'prop-types';

 export default class EditPostOption extends Component {
     state = { editPost: false }

     showEditPost = e => {
         return e ? e.preventDefault() : null
         this.setState({ editPost: true })
     }

     modalBack = () => {
         this.setState({ editPost: false })
         this.props.toggleOptions()
     }

     render(){
         let {editPost} = this.state;
         let {postDetails:{user,post_id,description},updateDescription} = this.props;

         return (
             <Fragment>
                 {(Me(user) || isAdmin()) && (
                     <li>
                         <a href="#" className="edit_post" onClick={this.showEditPost}>
                             Edit post {isAdmin() ? 'as admin' : null}
                         </a>
                     </li>
                 )}

                 {editPost && (
                     <EditPost
                        post={post_id}
                        description={description}
                        back={this.modalBack}
                        changeDesc={value => updateDescription(value)}
                     />
                 )}
             </Fragment>
         )
     }
 }

 EditPostOption.propTypes = {
     postDetails: shape({
         user: number.isRequired,
         post_id: number.isRequired,
         description: string.isRequired
        }).isRequired,
     updateDescription: func.isRequired,
     toggleOptions: func.isRequired   
 }