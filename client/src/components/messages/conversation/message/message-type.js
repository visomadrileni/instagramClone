 import React,{Component,Fragment} from 'react';
 import {timeAgo} from '../../../../utils/utilMethods/handyTimeAgo';
 import ToTags from '../../../hashtag/toTags/toTags';
 import ImageTheatre from '../../../others/imageTheater/ImageTheater';
 import {string,shape} from 'prop-types';

 export default class MessageType extends Component {
     state = { showImage: false }

     toggleShowImage = () => this.setState({ showImage: !this.state.showImage})
     
     render(){
          let {showImage} = this.state;
          let {type,message,message_time} = this.props.messageDetails;

          return (
              <Fragment>
                  <div className="m_m" title={timeAgo(message_time)}>
                      {!message ? (
                          <span style={{ fontStyle: 'italic'}}>Empty message</span>
                      ) : type === 'text' ? (
                          <ToTags str={`${message}`} />
                      ) : type === 'image' ? (
                          <img src={`/messages/${message}`} onClick={this.toggleShowImage} className="m_m_img" />
                      ) : type === 'sticker' ? (
                          <img src={`/messages/${message}`} className="m_m_sticker" />
                      ) : null}
                  </div>

                  {showImage && (
                      <ImageTheatre
                         imgSrc={`/messages/${message}`}
                         showInfo={false}
                         back={this.toggleShowImage}
                      />
                   )}
              </Fragment>
          )
     }
 }

 MessageType.propTypes = {
     messageDeatils: shape({
         type: string.isRequired,
         message: string.isRequired,
         message_time: string.isRequired
        }).isRequired
 }