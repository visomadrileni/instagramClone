 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Me,bottomScroll} from '../../../../utils/utils';
 import {isAdmin} from '../../../../utils/admin-utils';
 import {editGroup} from '../../../../utils/group-utils';
 import Title from '../../../others/title';
 import AddEmojis from '../../../others/emojis/add-emojis';
 import SecondaryButton from '../../../others/button/secondary-button';
 import GroupInstruction from '../../instruction';
 import EditGroupFields from './edit-group-fields';
 
 class EditGroup extends Component {
     state = {
         name: '',
         bio: '',
         isPrivate: false
     }

     setStateToProps = (name,bio,group_type) => {
         this.setState({
             name,
             bio,
             isPrivate: group_type == 'private' ? true : false
         })
     }

     componentWillReceiveProps = async ({group_details}) => {
         let {name,bio,group_type} = group_details;
         await this.setStateToProps(name,bio,group_type)
     }

     componentDidMount = async () => {
        let {name,bio,group_type} = this.props.group_details;
        await this.setStateToProps(name,bio,group_type)
     }
    
     componentDidUpdate = () => bottomScroll()

     changeValue = (what,{target}) => {
         const value = target.type == 'checkbox' ? target.checked : target.value
         this.setState({ [what]: value})
     }

     update = e => {
         e.preventdefault()
         let {group_details: {group_id},dispatch} = this.props;
         editGroup({
             ...this.state,
             group_id,
             dispatch
         })
     }

    
     render(){
         let {name,bio,isPrivate} = this.state;
         let {group_details: {admin}} = this.props;
         let disabled = !Me(admin) && !isAdmin()
         let btnDisabled = !name || !bio || disabled

         return (
             <div>
                 <Title value="edit group" />

                 <FadeIn duration="300ms">
                     <div className="wrapper_p">
                         <div className="wrapper_k">
                             <GroupInstruction showBtns={false} />
                         </div>

                         <div className="wrapper_p">
                             <div className="grp_edit">
                                 <EditGroupFields
                                   fields={{name,bio,isPrivate}}
                                   changeValue={this.changeValue}
                                 />

                                 <div className="g_e_save">
                                     <AddEmojis
                                          position={{ top: 304, left: 368}}
                                          textArea=".gen_bio"
                                          updateTextArea={value => this.setState({ bio: value})}
                                          disabled={disabled}
                                     />

                                     <SecondaryButton
                                         label="Update"
                                         onClick={this.update}
                                         extraClass="g_e_save_btn"
                                         disabled={btnDisabled}
                                     />
                                 </div>
                             </div>
                         </div>
                     </div>
                 </FadeIn>
             </div>
         )
     }
 }

  const mapStateToProps = state => ({
      group_details: state.Group.group_details
  })

  export default connect(mapStateToProps)(EditGroup);
  export {EditGroup as PureEditGroup}