 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {Me} from '../../../../utils/utils';
 import RecommendUsers from '../../../others/recommend/users';
 import {func} from 'prop-types';

 class BannerRecommendUser extends Component{
     state = { recommendUser: false }

     toggleRecommendUser = e => {
         return e ? e.preventDefault() : null
         this.setState({ recommendUser: !this.state.recommendUser})
     }

     modalBack = () => {
         this.toggleRecommendUser()
         this.props.toggleOptions()
     }

     render(){
         let {recommendUser} = this.state;
         let {id} = this.props;

         return (
             <Fragment>
                 {!Me(id) && (
                     <li>
                         <a href="#" className="pro_recommend" onClick={this.toggleRecommendUser}>Recommend</a>
                     </li>
                 )}

                 {recommendUser && <RecommendUsers back={this.modalBack} />}
             </Fragment>
         )
     }
 }

 BannerRecommendUser.propTypes = {
    toggleOptions: func.isRequired
 }

 const mapStateToProps = state => ({
     id: state.User.user_details.id
 })

 export default connect(mapStateToProps)(BannerRecommendUser)
 export {BannerRecommendUser as PureBannerRecommendUser}