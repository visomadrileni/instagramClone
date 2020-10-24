 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Redirect} from 'react-router';
 import {post} from 'axios';
 import {notify} from '../../../../utils/utilMethods/handy-notification';
 import {Me} from '../../../../utils/utils';
 import {isAdmin} from '../../../../utils/admin-utils';
 import Prompt from '../../../others/prompt';
 import {func} from 'prop-types';

 class DeleteGroup extends Component{
     state = {
         deleteGroup: false,
         deleted: false
     }

     showDeleteGroup = e => {
         e.preventDefault();
         this.setState({ deleteGroup: !this.state.deleteGroup})
     }

     delete = async e => {
         e.preventDefault();
         let {group_id} = this.props.group_details;
         await post('/api/delete-group',{group: group_id});
         notify({
             value: 'Group deleted',
             done: () => this.setState({ deleted: true})
         })
     }

      modalBack = () => {
            this.setState({ deleteGroup: false})
            this.props.toggleoptions()
      }
      
     render(){
        let {group_details: {admin}} = this.props;
        let {deleteGroup,deleted} = this.state;

        return (
            <Fragment>
                {deleted && <Redirect to="/" />}

                {(Me(admin) || isAdmin()) && (
                    <li>
                        <a href="#" className="p_copy_link" onClick={this.showDeleteGroup}>
                            Delete group {isAdmin() && 'as admin'}
                        </a>
                    </li>
                )}

                {deleteGroup && (
                    <Prompt
                       title="Delete group"
                       content="This group will be deleted.There's no undo so you wont be able to find it."
                       actionText="Delete"
                       action={this.delete}
                       back={this.modalBack}
                    />
                )}
            </Fragment>
        )
     }
 }

 DeleteGroup.propTypes = {
     toggleoptions: func.isRequired
 }

 const mapStateToProps = state => ({
     group_details: state.Group.group_details
 })

 export default connect(mapStateToProps)(DeleteGroup);
 export {DeleteGroup as PureDeleteGroup}








































