 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../utils/utils';
 import {blockUser} from '../../../../utils/setting-utils';
 import Prompt from '../../../others/prompt';
 import {func} from 'prop-types';

 class BannerBlockUser extends Component{
     state = { blockUser: false }

     toggleBlockUser = e => {
         return e ? e.preventDefault() : null
         this.setState({ blockUser: !this.state.blockUser})
     }

     blockUser = async e => {
         e.preventDefault()
         let {user_details:{id},toggleOptions} = this.props;
         toggleOptions()
         blockUser(id);
         this.toggleBlockUser()
     }

     render(){
          let {blockUser} = this.state;
          let {id,username} = this.props.user_details;

          return (
              <Fragment>
                  {!Me(id) && (
                      <li>
                          <a href="#" className="pro_block" onClick={this.toggleBlockUser}>Block</a>
                      </li>
                  )}

                  {blockUser && (
                      <Prompt
                         title={`Block ${username}`}
                         content={`${username} will no longer be able follow,message,comment,recommend or add you`}
                         actionText="Block"
                         action={this.blockUser}
                         back={this.toggleBlockUser}
                      />
                  )}
              </Fragment>
          )
     }
 }

 BannerBlockUser.propTypes = {
     toggleOptions: func.isRequired
 }

 const mapStateToProps = state => ({
     user_details: state.User.user_details
 })

 export default connect(mapStateToProps)(BannerBlockUser)
 export {BannerBlockUser as PureBannerBlockUser}