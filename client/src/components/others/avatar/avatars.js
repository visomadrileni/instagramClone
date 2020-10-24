 import React,{Component,Fragment} from 'react';
 import {post} from 'axios';
 import d from '../../../utils/api/Dom';
 import AvatarActions from './avatar-actions';
 import UploadAvatar from './upload-avatar';
 import MapAvatars from './map-avatars';
 import Overlay from  '../overlay';
 import MaterialIcon from '../icons/material-icon';
 import {number,func,oneOf} from 'prop-types';


 export default class Avatars extends Component{
     state = {
         loading: true,
         avatars: [],
         selectedAvatar: ''
     }

     componentDidMount = async () => {
         let {data: avatars} = await post('/api/get-avatars');
         this.setState({ 
               avatars,
               loading: false
            })
      }

      selectAvatar = e => {
          let avatar = new d(`[data-avatar='avatar-${e}']`)
          let siblings = new d('.pro_ava_avts')

          siblings.removeClass('pro_ava_active')
          avatar.addClass('pro_ava_active')
          new d('.btn_select_avatar').focus()

          this.setState({ selectedAvatar: e})
      }

      render(){
          let {loading,avatars,selectedAvatar} = this.state;
          let {group,of,back} = this.props;

          return (
              <Fragment>
                  <Overlay />

                  <div className="pro_avatars">
                      <div className="pro_ava_top">
                          <div className="pro_ava_info">
                              <span>Change your avatar</span>
                          </div>
                          <span className="pro_ava_close" onClick={back}>
                              <MaterialIcon icon="close" />
                          </span>
                       </div>

                      <MapAvatars avatars={avatars} loading={loading} selectAvatar={this.selectAvatar} />

                      <div className="pro_ava_bottom">
                          <UploadAvatar of={of} group={group} />
                          <AvatarActions loading={loading} avatar={selectedAvatar} {...this.props} />
                      </div>
                  </div>
              </Fragment>
          )
      }
 }

 Avatars.propTypes = {
     group: number,
     back: func.isRequired,
     of: oneOf(['user','group']).isRequired
 }