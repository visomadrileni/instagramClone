 import React,{Fragment} from 'react';
 import {connect} from 'react-redux';
 import {capitalizes_first} from '../../../../utils/utils';
 import AppLink from '../../../others/link/link';
 import {number,string,bool} from 'prop-types'

 const BannerStat = ({username,disabled,statType,statValue}) => {
     let body = (
         <Fragment>
             <span className="pro_hg">{statValue}</span>
             <span className="pro_nhg">{capitalizes_first(statType)}</span>
         </Fragment>
     )

     let url = `/profile/${username}/${statType}`

     return (
         <Fragment>
             {disabled ? (
                 <div className="pro_post stat_disabled">{body}</div>
             ) : (
                 <AppLink url={url}>{body}</AppLink>
             )}
         </Fragment>
     )
 }

 BannerStat.defaultProps = {
     disabled: false
 }

 BannerStat.propTypes = {
     disabled:  bool,
     statType:  string.isRequired,
     statValue: number.isRequired
 }

 const mapStateToProps = state => ({
     username: state.User.user_details.username
 })

 export default connect(mapStateToProps)(BannerStat)