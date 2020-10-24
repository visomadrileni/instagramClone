 import React,{Component} from 'react';
 import CreateGroupModal from './create-group-modal';
 import SecondaryButton from '../../others/button/secondary-button';

 class CreateGroup extends Component{
     state = { createGroup: false}

     toggleCreateGroup = e => {
         e.preventDefault();
         this.setState({ createGroup: !this.state.createGroup})
     }

     render(){
         let {createGroup} = this.state;
         
         return (
             <div>
                 <div className="recomm_teaser">
                     <span>
                         Create publish or private group of your interest with your people you know 
                     </span>
                     <SecondaryButton
                        label="Create group"
                        onClick={this.toggleCreateGroup}
                     />
                 </div>

                 {createGroup && <CreateGroupModal back={this.toggleCreateGroup} />}
             </div>
         )
     }
 }

 export default CreateGroup;


































