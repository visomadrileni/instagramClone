 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {getHashtagPosts} from '../../../actions/hashtag';
 import HashtagInfo from './hashtag-info';
 import HashtagMiddleSection from './hashtag-mddle-section';
 import Title from '../../others/title';
 import PopularHashtags from '../popular-hashtags';
 import UserHashtags from './../user-hashtags';

 class Hashtag extends Component {
     state = { loading: true }

     //We recieve hashtag props from getHashtagPosts action that will be used
     //from childComponent(Hashtag in this case)  <Route path="/hashtag/:hashtag" /> 
     componentWillReceiveProps = ({ match }) => {
         if(this.props.match.url != match.url){
             this.props.dispatch(getHashtagPosts(match.params.hashtag))
         }
         this.setState({ loading: false })
     }

     componentDidMount = () => {
         let {dispatch,match: {params}} = this.props;
         dispatch(getHashtagPosts(params.hashtag))
     }

     render(){
         let {loading} = this.state;
         let { match: { params: {hashtag} },
               session: {username}
             } = this.props;

         return (
             <div>
                 <Title value={`#${hashtag}`} desc={`View posts with #${hashtag}`} />

                 <FadeIn duration="300ms">
                     <HashtagInfo hashtag={hashtag} />

                     <div className="wrapper_s">
                         <div className="wrapper_p">
                             <HashtagMiddleSection loading={loading} hashtag={hashtag} />
                         </div>

                         <div className="wrapper_k">
                             <PopularHashtags />
                             <UserHashtags username={username} />
                         </div>
                     </div>
                 </FadeIn>
             </div>
         )    
     }
 }

 const mapStateToProps = state => ({
     session: state.User.session
 })

 export default connect(mapStateToProps)(Hashtag)
 export {Hashtag as PureHashtag}