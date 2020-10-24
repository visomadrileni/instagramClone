 import React,{Fragment} from 'react'
 import {connect} from 'react-redux'
 import {post} from 'axios';
 import {isAdmin} from '../../../../utils/admin-utils';
 import {notify} from '../../../../utils/utilMethods/handy-notification';
 import d from '../../../../utils/api/Dom';

 const BannerRemoveUser = ({id}) => {
     let removeUser = async e => {
         e.preventDefault()
         let o = new d('.overlay-2')
             o.show()

         let {data:{success,message}} = await post('/user/remove-user',{user: id})

         o.hide()
         notify({
             value: message,
             done: () => (success ? (window.location.href = '/login') : null)
         })
     }

     return (
         <Fragment>
             {isAdmin() && (
                 <li>
                     <a href="#" className="rem_user" onClick={removeUser}>Remove as admin</a>
                 </li>
             )}
         </Fragment>
     )
 }

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(BannerRemoveUser)
 export {BannerRemoveUser as PureBannerRemoveUser}