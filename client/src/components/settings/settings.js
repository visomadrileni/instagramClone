 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {getUnreadMessages} from '../../actions/message'
 import {getUnreadNotifications} from '../../actions/notification';
 import SettingsNav from './settings-nav';
 import SettingsRoutes from './settings-routes';

 class Settings extends Component{
    componentDidMount = () => {
        let {dispatch} = this.props;
        dispatch(getUnreadNotifications())
        dispatch(getUnreadMessages())
    }

    render(){
        let {url} = this.props.match;

        return (
            <div>
                <FadeIn duration="300ms">
                    <div className="wrapper_s">
                        <div className="wrapper_k settings_page">
                            <SettingsNav url={url} />
                        </div>

                        <SettingsRoutes url={url} />
                    </div>
                </FadeIn>
            </div>
        )
    }
 }

 export default connect()(Settings);