 import React,{Component} from 'react';
 import {connect} from 'react-redux'
 import {FadeIn} from 'animate-components';
 import {getUnreadNotifications} from '../../actions/notification';
 import {getUnreadMessages} from '../../actions/message';
 import ExploreNav from './explore-nav';
 import ExploreRoutes from './explore-routes';
 import RefreshExplores from './refresh';

 class Explore extends Component{
    componentDidMount = () => {
        let {dispatch} = this.props;
        dispatch(getUnreadNotifications())
        dispatch(getUnreadMessages())
    }

    render(){
        let {match: {url}} = this.props;

        return (
            <FadeIn duration="300ms">
                <div className="exp_nav">
                    <ExploreNav url={url} />
                    <RefreshExplores url={url} />
                </div>
                   <ExploreRoutes url={url}/>
            </FadeIn>
        )
    }
 }

 export default connect()(Explore);

























































