 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import Invite from '../../invite/invite';

 class InviteGroup extends Component{
     state = { invite: false }

     showInviteModal = e => {
         e.preventDefault();
         this.setState({ invite: !this.state.invite})
     }

     modalBack = () => {
        this.setState({ invite: false })
        this.props.toggleOptions() //This method makes showOptions: true
     }

     render(){
          let {invite} = this.state;
          let {group_id} = this.props.group_details;

          return (
              <Fragment>
                <li>
                    <a href="#" onClick={this.showInviteModal}>
                        Invite to group
                    </a>
                </li> 

                {invite && <Invite back={this.modalBack} group={group_id} />}
              </Fragment>
          )
     }
 } 

 const mapStateToProps = state => ({
     group_details: state.Group.group_details
 })

 export default connect(mapStateToProps)(InviteGroup);
 export {InviteGroup as PureInviteGroup}























