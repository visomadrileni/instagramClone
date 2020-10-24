 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Redirect} from 'react-router'
 import {Me} from '../../../../../utils/utils';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import {deletePost} from '../../../../../utils/post-utils'
 import Prompt from '../../../../others/prompt';
 import {number,string,func,shape} from 'prop-types' 

 class DeletePostOption extends Component{
     state = {
         deletePost: false,
         redirect: false
     }

     showDeletePost = e => {
         e.preventDefault();
         this.setState({ deletePost: true})
     }

     delete =  e => {
         e.preventDefault();
         let {postDetails:{post_id,when},dispatch} = this.props;
         deletePost({
             post_id,
             when,
             dispatch,
             redirect: () => this.setState({ redirect: true })
         })
     }

     modalBack = () => {
         this.props.toggleOptions();
         this.setState({ deletePost: false})
     }

     render(){
         let {deletePost,redirect} = this.state;
         let {user} = this.props.postDetails

         return (
             <Fragment>
                 {redirect && <Redirect to="/" />}

                 {(Me(user) || isAdmin()) && (
                     <li>
                         <a href="#" className="delete_post" onClick={this.showDeletePost}>
                             Delete post {isAdmin() ? 'as admin' : ''}
                         </a>
                     </li>
                 )}

                 {deletePost && (
                     <Prompt
                        title="Delete post"
                        content="This post will be deleted.There's no undo so you won't be able to find it."
                        actionText="Delete"
                        action={this.delete}
                        back={this.modalBack}
                     />
                 )}
             </Fragment>
         )
     }
 }

 DeletePostOption.propTypes = {
     postDetails: shape({
         user: number.isRequired,
         post_id: number.isRequired,
         when: string.isRequired
        }).isRequired,
     toggleOptions: func.isRequired   
 }

 export default connect()(DeletePostOption)
 export {DeletePostOption as PureDeletePostOption}