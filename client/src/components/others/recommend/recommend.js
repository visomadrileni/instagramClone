 import React,{Component} from 'react';
 import RecommendUsers from './users';
 import SecondaryButton from '../button/secondary-button';
 import {string} from 'prop-types';

 export default class Recommend extends Component {
     state = { recommend: false }

     toggleRecommend = () => this.setState({ recommend: !this.state.recommend })

     recomm = e => {
         e.preventDefault()
         this.toggleRecommend()
     }

     render(){
         let {recommend} = this.state;
         let {username} = this.props;

         return (
             <div>
                 <div className="recomm_teaser">
                     <span>Want to recommend {username} to others or invite someone,so they can get to know about {username}</span>
                     <SecondaryButton label="recommend" onClick={this.recomm} />
                 </div>

                 {recommend ? <RecommendUsers back={this.toggleRecommend} /> : null}
             </div>
         )
     }
 }

 Recommend.propTypes = {
     username: string
 }