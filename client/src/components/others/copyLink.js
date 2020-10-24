 import React from 'react';
 import {handyCopy} from '../../utils/utilMethods/handyCopy';
 import {notify} from '../../utils/utilMethods/handy-notification';
 import {string,func} from 'prop-types';
 
  const CopyLink = ({url,label,done}) => {
      let copyLink = e => {
          e.preventDefault();
          handyCopy({
              value: url,
              done: () => {
                  notify({ value: 'Link Copied'})
                  done()
              }
          })
      }

      return (
          <li>
              <a href="#" className="p_copy_link" onClick={copyLink}>
                  {label}
              </a>
          </li>
      )
  }

  CopyLink.propTypes = {
       url: string.isRequired,
       label: string.isRequired,
       done: func.isRequired
  }

  export default CopyLink;








