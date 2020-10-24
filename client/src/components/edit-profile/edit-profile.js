 import React ,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import Title from '../others/title';
 import IsLoading from '../others/isLoading';
 import AddEmojis from '../others/emojis/add-emojis';
 import PrimaryButton from '../others/button/primary-button';
 import {editProfile} from '../../utils/edit-profile-utils';
 import {cLoading} from '../../utils/utils';
 import {getUserDetails} from '../../actions/user';
 import {getUnreadNotifications} from '../../actions/notification';
 import {getUnreadMessages} from '../../actions/message';
 import SocialInputs from './social-inputs.js';
 import ResendVerification from './resend-vl';
 import BioInput from './bio-input';
 import EditTags from './edit-tags';
 import RequiredInputs from './required-inputs';

 class EditProfile extends Component{
     state = {
         loading: true,
         username: '',
         firstname: '',
         surname: '',
         email: '',
         bio: '',
         instagram: '',
         github: '',
         twitter: '',
         facebook: '',
         website: '',
         phone: '',
         tags: [],
         addTag: ''
     };

     componentDidMount = () => {
         let {dispatch,session} = this.props;
         dispatch(getUserDetails(session.username));
         dispatch(getUnreadNotifications());
         dispatch(getUnreadMessages())
     }

     componentWillReceiveProps = ({user_details,tags}) => {
          for(let key in user_details){
              this.state[key] !== undefined && this.setState({loading:false,...user_details,tags});
          }
     }

     change = (what,e) => this.setState({ [what]: e.target.value});

     update = e => {
         e.preventDefault();
         let {user_details: {username: susername,email: semail}} = this.props;

         editProfile({
             susername,
             semail,
             values: this.state
         })
     }

     render(){
      let {username,firstname,surname,email,bio,instagram,github,twitter,facebook,website,phone,addTag,tags,loading} = this.state;
      let {user_details: {id}} = this.props;

       return (
           <div>
               <Title value="Edit profile" desc="Edit your profile,add tags and links" />
               <IsLoading loading={loading} when="page" />
               <FadeIn duration="300ms" className={cLoading(loading)}>
                   <div className="edit_profile">
                       <div className="edit_profile">
                           <img src={`/users/${id}/avatar.jpg`} alt="" />
                           <span>@{username}</span>
                       </div>
                   </div>

                   <div className="edit_main">
                       <RequiredInputs fields={{username,firstname,surname,email}} change={this.change} />
                       <BioInput value={bio} change={this.change} />

                       <div className="edit_update">
                           <AddEmojis position={{ top: 260, left: 73}}
                                      textArea = ".edit_ta"
                                      updateTextArea = {bio => this.setState({bio})}
                             />

                            <PrimaryButton
                                  label="Update Profile"
                                  onClick={this.update}
                                  extraClass="edit_done"
                            />  

                            <ResendVerification />        
                       </div>
                   </div>

                   <div className="edit_tags">
                       <SocialInputs
                           inputs={{
                               instagram,
                               github,
                               twitter,
                               facebook,
                               website,
                               phone
                              }}
                            change={this.change}   
                       />

                       <EditTags
                          newTag={addTag}
                          change={this.change}
                          tags={tags}
                          emptyTagsInput={() => this.setState({ addTag: ''})}
                       />
                   </div>
               </FadeIn>
           </div>
       )
     }
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details,
     tags: state.User.tags,
     session: state.User.session
 })  

 export default connect(mapStateToProps)(EditProfile);































































































































































































































































