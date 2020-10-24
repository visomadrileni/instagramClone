 import React,{Component,Fragment} from 'react';
 import ToolTip from 'react-tooltip';
 import classNames from 'classnames';
 import MaterialIcon from '../icons/material-icon';
 import Emojis from './emojis';
 import {shape,number,string,func,bool} from 'prop-types';

 class AddEmojis extends Component {
     state = {
         showEmojis: false
     };

   toggleEmojis = () => this.setState({ showEmojis: !this.state.showEmojis});

   render(){
       let {showEmojis} = this.state;
       let {position,textarea,updateTextArea,recenterEmojis,disabled,addClassOnClicked,className} = this.props;
       let addClass = addClassOnClicked && showEmojis ? className : '';
       let disabledClass = disabled ? 'emoji_disabled' : '';

       return (
           <Fragment>
               <span className={classNames('emoji_span',disabledClass,addClass)}
                 data-tip="Add emojis" onClick={this.toggleEmojis}>
                   <MaterialIcon icon="sentiment_very_satistfied" />
               </span>

               {showEmojis ? (
                     <Emojis 
                        position={position}
                        textarea={textarea}
                        updateStateValue={value => updateTextArea(value)}
                        recenterEmojis={recenterEmojis} />   
                ) : null}

                <ToolTip />
           </Fragment>
       )
   }
 }

 AddEmojis.defaultProps = {
     recenterEmojis: false,
     disabled: false,
     addClassOnClicked: false
  }

  AddEmojis.propTypes = {
      position: shape({
          top: number.isRequired,
          left: number.isRequired
        }),
      textarea: string.isRequired,
      updateTextArea: func.isRequired,
      recenterEmojis: bool,
      disabled: bool,
      addClassOnClicked: bool,
      className: string  
  }
  
 export default AddEmojis;
























































