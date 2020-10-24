 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {cLoading} from '../../../utils/utils';
 import {getGroupsToExplore} from '../../../actions/explore';
 import ExploreGroupList from './explore-group-list';
 import IsLoading from '../../others/isLoading';
 import Title from '../../others/title';
 import Nothing from '../../others/nothing';

 class ExploreGroups extends Component {
     state = {
         loading: true
     }

     componentDidMount = () => this.props.dispatch(getGroupsToExplore())

     componentWillReceiveProps = () => {
         this.setState({ loading: false})
     }

     render(){
         let {groups} = this.props;
         let {loading} = this.state;
         let len = groups.length;
         let map_groups = groups.map(g => (
             <ExploreGroupList
                   key={g.group_id}
                   {...g}
             />
          ))

        return (
            <div>
                <Title value="Explore groups" />

                <FadeIn duration="300ms">
                    <IsLoading loading={loading} />

                    <div className={classNames('m_div',cLoading(loading))} style={{ marginTop: 0}} >
                       {len === 0 ? (
                           <div style={{ width: '100%'}}>
                               <Nothing message="Sorry,no groups to explore. " />                    
                           </div>
                          ) : (
                              map_groups
                          )}
                    </div>
                </FadeIn>
            </div>
        ) 
     }
 }

 const mapStateToProps = state => ({
     groups: state.Explore.groups
 })

 export default connect(mapStateToProps)(ExploreGroups);
 export {ExploreGroups as PureExploreGroups}













































































