import {post} from 'axios';
import {imageCompressor} from './utils';
import {notify} from '../utils/utilMethods/handy-notification';
import Action from './api/Action';

/** Upload avatar
 * @param {Object} options
 * @param {File}   options.file
 * @param {String} options.of
 * @param {Number} options.group
 */
 export const upload_avatar = async options => {
     let {file: userFile,of,group} = options,
         form = new FormData(), //help us sending HTML forms: with or without files, with additional fields and so on
         file = await imageCompressor(userFile),
         action = new Action('.c_a_add')

      if(file.size > 6000000){
          notify({ value: 'Image should be less than 4Mb'})
      } else{
          action.start('Changing avatar ...');
          form.append('avatar', file);
          form.append('of', of);
          form.append('group', group);

          let {data: {success,message}} = await post('/api/upload-avatar', form);
          notify({
              value:  message,
              done: () => (success ? window.location.reload() : null)
          }) //reloads the current URL, like the Refresh button

          action.end('Change avatar')
     }
 }
























































































































































