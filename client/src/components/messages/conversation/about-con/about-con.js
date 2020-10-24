 import React,{Component,Fragment} from 'react'
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {Scrollbars} from 'react-custom-scrollbars';
 import classNames from 'classnames';
 import {getConAbout} from '../../../../actions/message';
 import {cLoading} from '../../../../utils/utils';
 import ConversationMedia from './media';
 import ConversationWith from './con-with';
 import ConversationSince from './con-since';
 import MessagesCount from './messages-count'
 import IsLoading from '../../../others/isLoading';
 import Overlay from '../../../others/overlay';
 import ModalHeader from '../../../others/modal/modal-header';
 import ModalBack from '../../../others/modal/modal-back';
 import {func} from 'prop-types';

 class AboutConversation extends Component{
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })

     componentDidMount = () => {
         let {conDetails: {con_id,con_with}, dispatch } = this.props;
         dispatch(getConAbout(con_id,con_with))
     }

     render(){
         let {loading} = this.state;
         let { back} = this.props;

        return (
            <Fragment>
                <Overlay />

                <div className="modal modal_big">
                    <FadeIn duration="300ms">
                      <ModalHeader title="About conversation" />

                      <Scrollbars style={{ height: 450 }} className="modal_middle">
                        <IsLoading loading={loading} />
                    
                         <div className={classNames('modal_main',cLoading(loading))} style={{ padding: 0 }}>
                             <div className="about_con">
                                 <ConversationWith />
                                 <ConversationSince />
                                 <MessagesCount />
                                 <ConversationMedia />
                             </div>
                         </div>
                      </Scrollbars> 

                      <div className="modal_bottom">
                          <ModalBack back={back} />
                      </div>
                    </FadeIn>
                </div>
            </Fragment>
         )
     }
 }

 AboutConversation.propTypes = { 
     back: func.isRequired
 }

 const mapStateToProps = state => ({
     conDetails: state.Message.conDetails
 })

 export default connect(mapStateToProps)(AboutConversation)
 export {AboutConversation as PureAboutConversation}
