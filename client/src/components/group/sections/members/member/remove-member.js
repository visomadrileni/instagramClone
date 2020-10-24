 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {removeMember} from '../../../../../actions/group';
 import {isAdmin} from '../../../../../utils/admin-utils';
 import {notify} from '../../../../../utils/utilMethods/handy-notification';
 import Prompt from '../../../../others/prompt'
 import SecondaryButton from '../../../../others/button/secondary-button';
 import {number,string,shape} from 'prop-types';

 class RemoveMember extends Component {
     state = { showPrompt: false }
 
     showPrompt = e => {
         e.preventDefault()
         this.setState({ showPrompt: true })
     }

     hidePrompt = () => this.setState({ showPrompt: false })

     removeMember = async e => {
         e.preventDefault();
         let {memberDetails: {group_member_id,member,username},group_details:{group_id},dispatch} = this.props;
         await post('/api/remove-member',{member,group_id})
         dispatch(removeMember(group_member_id))
         notify({ value: `Removed ${username}`})
      }

      render(){
          let {showPrompt} = this.state;
          let {username} = this.props.memberDetails;
          let btnLabel = `Remove ${isAdmin() ? 'as admin' : ''}`

          return (
              <Fragment>
                  <SecondaryButton label={btnLabel} onClick={this.showPrompt} />

                  {showPrompt && (
                      <Prompt
                         title={`Remove ${username}`}
                         content="This member will be permanently removed.Member would have to re-join the group"
                         actionText="Delete"
                         action={this.removeMember}
                         back={this.hidePrompt}
                      />
                  )}
              </Fragment>
          )
      }
 }

 RemoveMember.propTypes = {
    memberDetails: shape({
        group_member_id: number.isRequired,
        member: number.isRequired,
        username: string.isRequired
     }).isRequired
 }

 const mapStateToProps = state => ({
     group_details: state.Group.group_details
 })

 export default connect(mapStateToProps)(RemoveMember);
 export {RemoveMember as PureRemoveMember}