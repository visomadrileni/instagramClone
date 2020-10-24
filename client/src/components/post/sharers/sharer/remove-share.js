 import React from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {removeShare} from '../../../../actions/post';
 import {isAdmin} from '../../../../utils/admin-utils';
 import SecondaryButton from '../../../others/button/secondary-button';
 import {number,func} from 'prop-types';
 
 const RemoveShare = ({share_id,decrementSharers,dispatch}) => {
     let remove = async e => {
         e.preventdefault();
         await post('/api/remove-share',{share_id})
         decrementSharers()
         dispatch(removeShare(share_id))
     }

     let btnLabel = `Remove ${isAdmin() ? 'as admin' : 'share'}`

     return <SecondaryButton label={btnLabel} onClick={remove} />
 }

 RemoveShare.propTypes = {
     share_id: number.isRequired,
     decrementSharers: func.isRequired
 }

 export default connect()(RemoveShare)
 export {RemoveShare as PureRemoveShare}