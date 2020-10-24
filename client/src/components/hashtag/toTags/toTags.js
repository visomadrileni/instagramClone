 import React from 'react';
 import {uniq} from 'lodash';
 import ToLink from './toLink';
 import {string} from 'prop-types';
 
 const ToTags = ({str}) => {
     let hashes = str.split(' ')
     let hashesElem = []

     if(!hashes){
         hashesElem = []
     } else {
           hashesElem = hashes.map(elem => {
            let hash = elem.slice(1)
            let filtered = hash.replace(/[^a-z0-9A-Z_]/, '');
            let isLink = elem.match(/https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\b([a-zA-Z0-9@:%_+.~#?&//=]*)/)

            if(elem.charAt(0) === '#'){
                if(hash.charAt(0) !== '#'){
                    return ( 
                       <ToLink 
                          key={uniq()}
                          url={`/hashtag/${filtered}`}
                          label={`${elem}`}
                       />
                    )
                }
            } else if(elem.charAt(0) === '@'){
                if(hash.charAt(0) !== '@'){
                    return (
                        <ToLink
                           key={uniq()}
                           url={`/profile/${filtered}`}
                           label={`${elem}`}
                        />
                    )
                }
            } else if(isLink){
                return <a key={uniq()} href={elem} className="hashtag" target="_blank">{`${elem}`}</a>       
            }

            return `${elem}`
        })
     }

    return <span>{hashesElem}</span>
 }

 ToTags.defaultProps = {
     str: ''
 }

 ToTags.propTypes = {
     str: string.isRequired
 }

 export default ToTags;