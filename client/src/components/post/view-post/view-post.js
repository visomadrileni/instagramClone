import React,{Component} from 'react';
import {connect} from 'react-redux';
import {FadeIn} from 'animate-components';
import {getPost} from '../../../actions/post';
import {getUnreadNotifications} from '../../../actions/notification';
import {getUnreadMessages} from '../../../actions/message';
import {cLoading} from '../../../utils/utils';
import ShowPost from './show-post';
import Title from '../../others/title';
import IsLoading from '../../others/isLoading';
import Suggested from '../../others/suggested/suggested';
import CreateGroup from '../../group/create-group/create-group';

class ViewPost extends Component{
    state = {loading: true}

    componentWillReceiveProps = () => this.setState({ loading: false })
    componentDidMount = () => {
        let {match:{params:{post_id}},dispatch} = this.props;
        dispatch(getUnreadNotifications());
        dispatch(getUnreadMessages());
        return post_id ? dispatch(getPost(post_id)) : null
    }

    render(){
        let {loading} = this.state;

        return (
            <div>
                <Title value="View post" />

                <FadeIn duration="300ms">
                    <div className="wrapper_s view_s">
                        <div className="wrapper_p">
                            <IsLoading loading={loading} />

                            <div className={cLoading(loading)}>
                                <ShowPost />
                            </div>
                        </div>

                        <div className="wrapeer_k">
                           <Suggested />
                           <CreateGroup />
                        </div>
                    </div>
                </FadeIn>
            </div>
        )
    }
}

export default connect()(ViewPost)
export {ViewPost as PureViewPost}