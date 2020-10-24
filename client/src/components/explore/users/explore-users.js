 import React,{Component} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import classNames from 'classnames';
 import {getUsersToExplore} from '../../../actions/explore';
 import {cLoading} from '../../../utils/utils';
 import Title from '../../others/title';
 import Nothing from '../../others/nothing';
 import IsLoading from '../../others/isLoading';
 import ExploreUsersList from './explore-users-list';

 class ExploreUsers extends Component {
     state = { loading: true }

     componentWillReceiveProps = () => this.setState({ loading: false});
     componentDidMount = () => this.props.dispatch(getUsersToExplore())

     render(){
         let {users} = this.props;
         let {loading} = this.state;
         let len = users.length;
         let map_users = users.map(u => <ExploreUsersList key={u.id} {...u} />)

       return (
           <div>
               <Title value="Explore users"/>

               <FadeIn duration="300ms">
                   <IsLoading loading={loading} />
                   <div className={classNames('m_div',cLoading(loading))} style={{ marginTop: 0}} >
                       <div className="m_wrapper" style={{ width: len === 0 ? 500 : null}}>
                           {len === 0 ? (
                               <div style={{ width: '100%'}}>
                                   <Nothing message="Sorry,no users to explore" />
                               </div>
                           ) : (
                               map_users
                           )}
                       </div>
                   </div>
               </FadeIn>
           </div>
       )  
     }
 }

 const mapStateToProps = state => ({
     users: state.Explore.users
 })

 export default connect(mapStateToProps)(ExploreUsers)
 export {ExploreUsers as PureExploreUsers}






























































