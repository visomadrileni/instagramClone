 import React from 'react';
 import AppLink from '../../link/link';
 import {string,func} from 'prop-types';

 const HashtagSearch = ({hashtag,clicked}) => {
     let url = `/hashtag/${hashtag.slice(1)}`

     return (
         <div className="s_d_peo" onClick={clicked}>
             <AppLink className="s_d_p h_d_p" url={url}>
                 <span className="s_d_username">{hashtag}</span>
             </AppLink>
         </div>
     )
 }

 HashtagSearch.propTypes = {
     hashtag: string.isRequired,
     clicked: func.isRequired
 }

 export default HashtagSearch;