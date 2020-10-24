 import React,{Component,Fragment} from 'react';
 import {FadeIn} from 'animate-components';
 import d from '../../utils/api/Dom';
 import MaterialIcon from './icons/material-icon';
 import Overlay from './overlay';
 import PrimaryButton from './button/primary-button';
 import SecondaryButton from './button/secondary-button';
 import {string,bool,func} from 'prop-types';

 class Prompt extends Component{
     componentDidMount = () => new d('.prompt-done').focus()

     close = e => {
         e.preventDefault();
         this.props.back();
     }

   render(){
       let {title,content,actionText,action,blurred} = this.props;
       let style = {marginButton: blurred ? 9 : 10 }

       return (
           <Fragment>
               <Overlay />

               <div className="prompt">
                   <FadeIn duration="300ms">
                       <div className="prompt-top">
                           <span className="prompt-title">{title}</span>
                           <span onClick={this.close}>
                               <MaterialIcon icon="close" />
                           </span>
                       </div>

                       <div className="prompt-middle" style={style}>
                           <span className="prompt-content">{content}</span>
                       </div>

                       <div className="prompt-bottom">
                           <SecondaryButton
                               label="Cancel"
                               onClick={this.close}
                           />
                           <PrimaryButton
                              label={actionText}
                              onClick={action}
                              extraClass="prompt-done"
                           />
                       </div>
                   </FadeIn>
               </div>
           </Fragment>
       )
   }  
 }

 Prompt.defaultProps = {
     title: 'Title',
     content: 'Main content goes here',
     actionText: 'Action',
     action: () => null,
     back: () => null,
     blurred: false   // chrome blurs it, if blurred, set it true to remove it
 }

 Prompt.propTypes = {
     title: string.isRequired,
     content: string.isRequired,
     actionText: string.isRequired,
     action: func.isRequired,
     back: func.isRequired,
     blurred: bool
 }

 export default Prompt;
















































