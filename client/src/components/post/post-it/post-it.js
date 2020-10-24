 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import ToolTip from 'react-tooltip';
 import {changePostitProperties} from '../../../actions/post';
 import PostItActions from './actions';
 import PostItHeader from './header';
 import GetLocation from './getLeocation'
 import ToggleAndTags from './toggleAddTags';
 import AddTags from './add-tags';
 import Middle from './middle';
 import Filters from './filters/filters';
 import Overlay from '../../others/overlay';
 import AddEmojis from '../../others/emojis/add-emojis';
 import {number,func,oneOf} from 'prop-types';

 class PostIt extends Component {
    componentDidMount = () => {
        let {type,group,dispatch} = this.props;
        dispatch(changePostitProperties('type',type))
        dispatch(changePostitProperties('group',group))
     }

     render(){
         let {postIt:{fileChanged,showOverlay},dispatch,back} = this.props;

         return (
             <div>
                 <Overlay />

                 <div className="post" style={{ left: fileChanged ? '41%' : '50%'}}>
                     <FadeIn duration="300ms">
                         {fileChanged && <Filters />}

                         <PostItHeader />
                         <Middle />
                         <AddTags />

                         <div className="t_p_bottom p_bottom">
                             <div className="t_p_tag p_tag" style={{ visibility: !fileChanged && 'hidden'}}>
                                 <AddEmojis
                                   position={{top:104,left:-215}}
                                   textArea=".t_p_ta"
                                   updateTextArea={value => dispatch(changePostitProperties('desc',value))}
                                   addClassOnClicked
                                   className="p_span_toggle"
                                 />

                                 <ToggleAndTags />
                                 <GetLocation />
                             </div>

                             <PostItActions back={back} />
                         </div>
                     </FadeIn>
                 </div>

                 {showOverlay && <Overlay type="white" />}

                 <ToolTip />
             </div>
         )
     }
 }

 PostIt.propTypes = {
     back: func.isRequired,
     type: oneOf(['user','group']).isRequired,
     group: number
 }

 const mapStateToProps = state => ({
     postIt: state.Post.postIt
 })

 export default connect(mapStateToProps)(PostIt)