 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {Instagram} from 'react-content-loader';
 import {FadeIn} from 'animate-components';
 import {getFeed} from '../../actions/post';
 import {getUnreadMessages} from '../../actions/message';
 import {getUnreadNotifications} from '../../actions/notification';
 import Feed from './feed';
 import Title from '../others/title';
 import Suggested from '../others/suggested/suggested';
 import PostItTeaser from '../post/post-it/post-it-teaser';
 import CreateGroup from '../group/create-group/create-group';
 import PopularHashtags from '../hashtag/popular-hashtags'

 class Home extends Component {
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false })

     componentDidMount = () => {
         let {dispatch} = this.props;
         dispatch(getFeed())
         dispatch(getUnreadNotifications())
         dispatch(getUnreadMessages())
     }

     render(){
         let {loading} = this.state;

         return (
             <div>
                 <Title value="home" />

                 <FadeIn duration="300ms">
                      <div className="wraper_s home_inst">
                          <div className="visoinst">
                              <PostItTeaser type="user" disabled={loading} />

                              {loading && (
                                  <div style={{ margingTop: 20}}>
                                      <Instagram />
                                      <Instagram />
                                      <Instagram />
                                  </div>
                              )}

                              <Feed />
                          </div>

                          <div className="wrapper_k">
                             <Suggested when="home" />
                             <PopularHashtags />
                             {!loading && <CreateGroup />}
                          </div>
                      </div>    
                 </FadeIn> 
             </div>
         )
     }
 }

 export default connect()(Home);
 export {Home as PureHome}