 import React,{Component,Fragment} from 'react';
 import {upload_avatar} from '../../../utils/avatar-utils';
 import PreviewAvatar from './preview-avatar';
 import FileInput from '../input/file';
 import {number,oneOf} from 'prop-types';

 export default class UploadAvatar extends Component{
     state = {
          fileAvatarChanged: false,
          fileInput: '',
          previewAvatar: '/images/spacecraft.jpg',
          targetFile: ''
       }

       preViewAvatar = e => {
           this.setState({ fileAvatarChanged: true })
           this.setState({ fileInput: e.target.value })
           let reader = new FileReader();
           let file = e.target.files[0];
           this.setState({ targetFile: file })
           reader.onload = e => this.setState({ previewAvatar: e.target.result })
           reader.readAsDataURL(file)
       }

       preViewAvatarBack = e => {
         e.preventDefault();
         this.setState({
             fileAvatarChanged: false,
             fileInput: ''
         })
       }

       uploadAvatar = e => {
           e.preventDefault();
           let {targetFile} = this.state;
           let {of,group} = this.props;
           upload_avatar({
               file: targetFile,
               of,
               group
           })
       }

       render(){
           let {fileInput,fileAvatarChanged,previewAvatar} = this.state;

           return (
               <Fragment>
                   <form method="post" className="post" encType="multipart/form-data">
                      <FileInput
                         value={fileInput}
                         fileChange={this.preViewAvatar}
                         label="Upload avatar"
                         labelClass="sec_btn"
                      />
                   </form>

                   {fileAvatarChanged ? (
                       <PreviewAvatar
                         previewAvatar={previewAvatar}
                         back={this.preViewAvatarBack}
                         upload={this.uploadAvatar}
                       />
                   ) : null }
               </Fragment>
           )
       }
 }

 UploadAvatar.propTypes = {
     of: oneOf(['user','group']).isRequired,
     group: number
 }