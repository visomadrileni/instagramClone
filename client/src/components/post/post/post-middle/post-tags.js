 import React,{Component} from 'react';
 import ToolTip from 'react-tooltip';
 import {humanReadable} from '../../../../utils/utils';
 import MaterialIcon from '../../../others/icons/material-icon'
 import Tags from '../../tags/tags'
 import {number} from 'prop-types';

 export default class PostTags extends Component {
     state = {
         tags_count: 0,
         showTags: false
     }

     componentDidMount = () => this.setState({ tags_count: this.props.tags_count})
     decrementTags = () => this.setState({ tags_count: --this.state.tags_count})

    render(){
        let {tags_count,showTags} = this.state;
        let {post_id} = this.props;

        return (
            <div>
                {tags_count != 0 && (
                    <div>
                        <span className="p_tag_icon" data-tip={`${humanReadable(tags_count,'tag')}`} onClick={() => this.setState({showTags: true})}>
                            <MaterialIcon icon="account_circle" />
                        </span>
                        <ToolTip />
                    </div>
                )}

                {showTags && (
                    <Tags
                        post={post_id}
                        decrementTags={this.decrementTags}
                        back={() => this.setState({ showTags: false})}
                    />
                )}
            </div>
        )
    }
 }

 PostTags.propTypes = {
     post_id: number.isRequired,
     tags_count: number.isRequired
 }