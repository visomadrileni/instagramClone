 import React,{Component} from 'react';
 import {post} from 'axios';
 import {FadeIn} from 'animate-components';
 import {notify} from  '../../../../utils/utilMethods/handy-notification';
 import Overlay from '../../../others/overlay';
 import TextArea from '../../../others/input/textArea';
 import PrimaryButton from '../../../others/button/primary-button';
 import ModalHeader from '../../../others/modal/modal-header';
 import ModalBack from '../../../others/modal/modal-back';
 import AddEmojis from '../../../others/emojis/add-emojis';
 import {number,string,func} from 'prop-types';

 export default class Edit extends Component {
     state = {
         message: '',
         ogMessage: ''
        }

        componentDidMount = () => {
            let { message } = this.state;
            this.setState({
                message,
                ogMessage: message
            })
        }

        descrChange = ({target: {value}}) => {
            this.setState({ message: value })
            this.props.changeMessage(value)
        }

        returnOnMessage = () => {
            let {ogMessage} = this.state;
            this.props.changeMessage(ogMessage)
        }

        back = () => {
            let {back} = this.state;
            this.returnOnMessage()
            back()
        }

        updateMessage = async e => {
            e.preventDefault()
            let {message} = this.state;
            let {message_id,back} = this.props;
            let {data} = await post('/api/edit-message',{message,message_id})
            data.success ? back() : this.returnOnMessage()
            notify({ value: data.message })
        }


        render(){
            let {message} = this.state;

            return (
                <div>
                    <Overlay />

                    <div className="edit_post modal">
                        <FadeIn duration="300ms">
                            <ModalHeader title="Edit message" />

                            <div className="e_p_middle modal_middle">
                                <TextArea
                                   placeholder="message ..."    
                                   className="e_p_textarea"
                                   value={message}
                                   valueChange={this.descrChange}
                                />
                            </div>

                            <div className="e_p_bottom modal_bottom">
                                <AddEmojis 
                                    position={{ top:-30, left: -217 }}
                                    textArea=".e_p_textarea"
                                    updateTextArea={value => this.setState({ message: value })}
                                    recenterEmojis
                                />

                                <ModalBack back={this.back} btnType="secondary" disabled={!message} />
                                <PrimaryButton label="Update message" onClick={this.updateMessage} disabled={!message} />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            )
       }
 }

 Edit.propTypes = {
     message: string.isRequired,
     message_id: number.isRequired,
     changeMessage: func.isRequired,
     back: func.isRequired
 }