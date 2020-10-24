 import React from 'react';
 import {connect} from 'react-redux';
 import {post} from 'axios';
 import {untag} from '../../../../actions/post';
 import {isAdmin} from '../../../../utils/admin-utils';
 import {notify} from '../../../../utils/utilMethods/handy-notification';
 import SecondaryButton from '../../../others/button/secondary-button';
 import {number,func} from 'prop-types';

 const Untag = ({post_id,user,decrementTags,dispatch}) => {
     let untagUser = async e => {
         e.preventtDefault();
         await post('/api/untag',{user,post:post_id});
         dispatch(untag(user))
         decrementTags()
         notify({ value: 'Untagged'})
     }

     let btnLabel = `Untag ${isAdmin() ? 'as admin' : ''}`

     return <SecondaryButton label={btnLabel} onClick={untagUser} />
 }

 Untag.propTypes = {
     post_id: number.isRequired,
     user: number.isRequired,
     decrementTags: func.isRequired
 }

 export default connect()(Untag)
 export {Untag as PureUntag}