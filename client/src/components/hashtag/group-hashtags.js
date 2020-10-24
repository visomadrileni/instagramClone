 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {getGroupHashtags} from '../../actions/hashtag';
 import MapHashtags from './hashtag-utils/map-hashtags';
 import HashtagHeader from './hashtag-utils/hashtag-header';
 import {number} from 'prop-types';

 class GroupHashtags extends Component{
     componentDidMount = async () => {
         let {group,dispatch} = this.props;
         dispatch(getGroupHashtags(group))
     }

    render(){
        let {hashtags} = this.props;
        let len = hashtags.length;

        return (
            <div>
                {len != 0 && (
                    <div className="recomm user-hashtags">
                        <HashtagHeader text="Group recent hashtags" />
                        <MapHashtags hashtags={hashtags} />
                    </div>
                )}
            </div>
        )
    }
 }

 GroupHashtags.propTypes = {
     group: number
 }

 const mapStateToProps = state => ({
     hashtags: state.Hashtag.groupHashtags
 })

 export default connect(mapStateToProps)(GroupHashtags)