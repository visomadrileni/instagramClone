 import React,{Component} from 'react';
 import {timeAgo} from '../../../../../utils/utilMethods/handyTimeAgo';
 import PostOptionLists from './optionLists';
 import MaterialIcon from '../../../../others/icons/material-icon';
 import {number,string,func,shape} from 'prop-types';

 export default class PostOptions extends Component{
     state = {showOptions: false }

     toggleOptions = () => this.setState({ showOptions: !this.state.showOptions})

     render(){
         let {showOptions} = this.state;
         let {postDetails:{user,post_id,post_time,when,description},updateDescription} = this.props;

         return (
             <div>
                 <div className="p_i_2">
                     <div className="p_time">
                         <span>{post_time && timeAgo(post_time).replace(/\s ago/,'')}</span>
                     </div>

                     <div className="p_h_opt">
                         <span className="exp_p_menu" onClick={this.toggleOptions}>
                               <MaterialIcon icon="expand_more" />
                         </span>
                     </div>
                 </div>

                 {showOptions && (
                     <div className="options p_options" style={{top: when === 'shared' ? 80 : 48}}>
                         <PostOptionLists
                             postDetails={{user,post_id,when,description}}
                             toggleOptions={this.toggleOptions}
                             updateDescription={updateDescription}
                         />
                     </div>
                 )}
             </div>
         )
     }
 }

 PostOptions.propTypes = {
     postDetails: shape({
         user: number.isRequired,
         post_id: number.isRequired,
         when: string.isRequired,
         post_time: string.isRequired,
         description: string.isRequired
         }).isRequired,
     updateDescription: func.isRequired    
 }