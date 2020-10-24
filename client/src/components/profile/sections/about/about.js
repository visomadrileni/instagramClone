 import React,{Component} from 'react';
 import {connect} from 'react-redux'
 import {FadeIn} from 'animate-components'
 import {bottomScroll} from '../../../../utils/utils';
 import d from '../../../../utils/api/Dom';
 import AboutSections from './sections';
 import SocialIcons from './social-icons';
 import UpdateInstruction from './update-instruction';
 import Title from '../../../others/title';
 import EditPen from '../../../others/edit-pen';

 class About extends Component {
       componentDidMount = () => bottomScroll()    
       toggleEdit = () => new d('.a_edit').toggle()

       render(){
           let {username,firstname,surname} = this.props.user_details;

           return (
               <div>
                   <Title value={`About @${username} (${firstname} ${surname})`} />

                   <FadeIn duration="300ms">
                       <div className="wrapper_s wrapper_p">
                           <div className="about">
                               <div className="sabout">
                                   <UpdateInstruction />
                                   <SocialIcons />
                               </div>

                               <div className="fabout" onMouseOver={this.toggleEdit} onMouseOut={this.toggleEdit}>
                                    <EditPen to="/edit-profile" when="profile" />
                                    <AboutSections />
                               </div>
                           </div>
                       </div>
                   </FadeIn>
               </div>
           )
       }
 }  

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(About)