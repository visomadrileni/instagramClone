 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me,toggle} from '../../../utils/utils';
 import d from '../../../utils/api/Dom';
 import AvatarAction from '../../others/avatar/avatar-actions'
 import ViewAvatarAction from '../../others/avatar/actions/view-avatar';

 class BannerAvatar extends Component {
     state = {
         viewAvatar: false,
         changeAvatar: false
     }
     
     _toggle = what => this.setState({ [what]: !this.state[what] })
     toggleAvatarOptions = () => toggle(new d('.pro_avatar_ch_teaser').toDom())

     render(){
         const {viewAvatar,changeAvatar} = this.state;
         let {id} = this.props.user_details;
         let imgSrc = id ? `/users/${id}/avatar.jpg` : '/image/spacecraft.jpg'

         return (
             <Fragment>
                 <div className="pro_avatar" onMouseOver={this.toggleAvatarOptions} onMouseOut={this.toggleAvatarOptions}>
                     <img src={imgSrc} alt="avatar" />

                     <div className="pro_avatar_ch_teaser" style={{ display: 'none' }}>
                         <span className="view_avatar_span" onClick={() => this._toggle('viewAvatar')}>View</span>
                         {Me(id) && (
                             <span className="change_pro" onClick={() => this._toggle('changeAvatar')}>Change</span>
                         )}
                     </div>
                 </div>

                 <AvatarAction change={changeAvatar} onClick={() => this._toggle('changeAvatar')} when="user" />
                 <ViewAvatarAction view={viewAvatar} onClick={() => this._toggle('viewAvatar')} when="user" />
             </Fragment>
         )
     }
 }

  const mapStateToProps = state => ({
      user_details: state.User.user_details
  })

  export default connect(mapStateToProps)(BannerAvatar)
  export {BannerAvatar as PureBannerAvatar}