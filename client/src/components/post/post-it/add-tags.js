 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {changePostitProperties} from '../../../actions/post';
 import SearchFollowings from '../../others/serach-followings/serach-followings';

 class AddTags extends Component {
     updateTags = tags => this.props.dispatch(changePostitProperties('tags',tags))

     deleteTag = tag => {
         let {tags} = this.props.postIt;
         let remainder = tags.filter(t => t.username !== tag);
         this.updateTags(remainder)
     }

     render(){
         let {tags,addTag} = this.props.postIt;

         let map_tags = tags.map(t => (
             <span key={t.username} className="p_taggings" onClick={() => this.deleteTag(t.username)}>
                 {t.username}
             </span>
         ))

         return (
            <Fragment>
                <div className="p_tagging">{map_tags}</div>

                {addTag && (
                    <SearchFollowings when="tag" placeholder="Search to tag" done={data => this.updateTags(data)} />
                )}
            </Fragment>
         )
     }
 }

 const mapStateToProps = state => ({
     postIt: state.Post.postIt
 })

 export default connect(mapStateToProps)(AddTags);
 export {AddTags as PureAddTags}