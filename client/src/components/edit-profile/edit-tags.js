 import React,{Fragment,Component} from 'react';
 import {connect} from 'react-redux';
 import {deleteTag} from '../../actions/user';
 import d from '../../utils/api/Dom';
 import * as Edit from '../../utils/edit-profile-utils';
 import TextInput from '../others/input/text';
 import SecondaryButton from '../others/button/secondary-button';
 import {number,string,func,arrayOf,shape} from 'prop-types';
 
 class EditTags extends Component{
   addTag = e => {
       e.preventDeafult();
       new d('.add_tag_text').focus()
       let {
           newTag: value,
           user_details: {id:user},
           dispatch,
           emptyTagsInput } = this.props;
       Edit.addUserTags({value,user,dispatch});
       emptyTagsInput()    
   }

   deleteTag = tag => this.props.dispatch(deleteTag(tag));

   mapTags = t => (
       <span
          key={t.tag}
          onClick={() => this.deleteTag(t.tag)}
          className="tir_btn t_a_tag"
         >{t.tag}</span>
   )

   render(){
       let {newTag,change,tags} = this.props;
       let map_tags = tags.map(this.mapTags);

       return (
           <Fragment>
               <div className="edit_tags_info">
                   <span>Edit tags (click tags to remove)</span>
               </div>
               <div className="add_tag">
                 <TextInput 
                   className="add_tag_text"
                   placeholder="Add a tag"
                   value={newTag}
                   valueChange={e => change('addTag',e)}
                 />
                 <SecondaryButton label="Add" onClick={this.addTag} />
               </div> 
               <div className="tags_all">{map_tags}</div>
           </Fragment>
       )
    }
 }

 EditTags.propTypes = {
     newTag: string.isRequired,
     change: func.isRequired,
     tags: arrayOf(shape({
         tags: string.isRequired,
         user: number.isRequired
     })),
     emptyTagsInput: func.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(EditTags);



































































