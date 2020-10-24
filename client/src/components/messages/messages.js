 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {getUnreadNotifications} from '../../actions/notification';
 import {getConversation} from '../../actions/message';
 import {cLoading} from '../../utils/utils';
 import NewConversation from './new-conversation';
 import Conversation from './conversation/conversation';
 import MapConversations from './map-conversations/map-conversations';
 import OnlineUsersButton from './online-users/onlineUsersButton';
 import Title from '../others/title';
 import IsLoading from '../others/isLoading';
 import Nothing from '../others/nothing';

 class Messages extends Component{
     state = { 
         loading: true,
         showConversation: false,
         selectedCon: {
             con_id: null,
             unreadMssgs: 0
         }
     }

     componentWillReceiveProps = () => this.setState({ loading: false })
     componentDidMount = () => {
         let {dispatch} = this.props;
         dispatch(getUnreadNotifications())
         dispatch(getConversation())
     }

    render(){
        let {loading,showConversation,selectedCon} = this.state;

        return (
            <div>
                <IsLoading loading={loading} when="page" />
                <Title value="Messages" />

                <FadeIn duration="300ms" className={classNames('messages',cLoading(loading))}>
                    <div className="message_left">
                        <div className="message_new">
                            <OnlineUsersButton />
                            <NewConversation />
                        </div>

                        <MapConversations showConversation={con => { this.setState({ selectedCon:con, showConversation:true})} } />
                    </div>

                    <div className="message_right">
                        {showConversation ? (
                            <Conversation con={selectedCon} hideConversation={() => this.setState({ showConversation: false })} />
                        ) : (
                            <div style={{ marginTop: 77 }}>
                                <Nothing message="Please select a conversation" />
                            </div>
                        )}
                    </div>
                </FadeIn>
            </div>
        )
    }
 }

 export default connect()(Messages);
 export {Messages as PureMessages}