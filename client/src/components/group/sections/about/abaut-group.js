 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {bottomScroll} from '../../../../utils/utils';
 import {timeAgo} from '../../../../utils/utilMethods/handyTimeAgo';
 import d from '../../../../utils/api/Dom';
 import GroupAboutSection from './group-about-section';
 import Title from '../../../others/title';
 import EditPen from '../../../others/edit-pen';
 import GroupInstruction from '../../instruction'

 class AboutGroup extends Component {
     togglePen = () => new d('.a_edit').toggle();
     componentDidMount = () => bottomScroll();

     render(){
         let {group_details,edit} = this.props;

         return (
             <div>
                 <Title value="About" />

                 <FadeIn duration="300ms">
                     <div className="sectionAbout">
                         <div className="about">
                           <div className="sabout">
                                <GroupInstruction />
                           </div>

                           <div className="fabout" onMouseOver={this.togglePen} onMouseOut={this.togglePen}>
                               <EditPen to={`/group/${group_details.group_id/edit}`} when="group" />
                               <GroupAboutSection label="Group Name" value={`${group_details.name}`} />
                               <GroupAboutSection label="Bio" value={`${group_details.bio}`} />
                               <GroupAboutSection label="No of posts" value={`${group_details.postsCount}`} />
                               <GroupAboutSection label="Group type" value={`${group_details.group_type}`} />
                               <GroupAboutSection label="Group created by" value={`${group_details.admin_username}`} type="link" url={`/profile/${group_details.admin_username}`} />
                               <GroupAboutSection label="Group created" value={`${timeAgo(group_details.created)}`} />
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

 export default connect(mapStateToProps)(AboutGroup)
 export {AboutGroup as PureAboutGroup}