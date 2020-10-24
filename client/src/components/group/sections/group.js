 import React,{Component,Fragment} from 'react';
 import {connect} from 'react-redux';
 import {FadeIn} from 'animate-components';
 import {getUnreadNotifications} from '../../actions/notification';
 import {getUnreadMessages} from '../../actions/message';
 import {forGroup,Me,cLoading} from '../../utils/utils';
 import {isAdmin} from '../../utils/admin-utils';
 import Title from '../others/title';
 import IsLoading from '../others/isLoading';
 import Nothing from '../others/nothing';
 import GroupNav from './group-nav';
 import GroupBanner from './group-banner';
 import GroupRoutes from './group-routes';

 class Group extends Component {
    state = {loading: true }

    group_url = () => this.props.history.push('/error/group');

    //A match object contains information about how a <Route path> matched the URL.A match objects contain the following
    // properties: params,isExact,url,path.To access group_id props used on our cases(in <Route /> )as we put group_id
    // in some routes make available accross this.props.match.params.id
    componentWillReceiveProps = ({dispatch,match}) => {
        if(this.props.match.url != match.url){
            forGroup({
                group_id: match.params.group_id,
                dispatch,
                invalidGroup: this.group_url
            })
        }
        this.setState({ loading: false })
    }

    componentDidMount = () => {
        let {match:{params: {group_id}},dispatch} = this.props;
        forGroup({
            group_id,
            dispatch,
            invalidGroup: this.group_url
        })
        dispatch(getUnreadNotifications())
        dispatch(getUnreadMessages())
    }

    render(){
       let {loading} = this.state;
       let {group_details:{name,admin,group_type},joined,match:{url,params:{group_id}}} = this.props;
       let showContent = Me(admin) || group_type == 'public' || joined || isAdmin()

       return (
           <div>
               <Title value={name} desc={`View ${name}'s posts,members and much more..`} />

               <div className="groupDeatils" data-group-id={group_id} data-group-name={name}>
                   <IsLoading loading={loading} when={page} />

                   <FadeIn duration="300ms" className={cLoading(loading)}>
                      <GroupBanner />
                      {showContent ? (
                          <Fragment>
                              <GroupNav url={url} admin={adnmin} />
                              <GroupRoutes url={url} group_id={group_id} />
                          </Fragment>
                      ) : (
                          <div style={{ marginTop: 85 }}>
                              <Nothing message={`${name} group is private.Join to connect`} />
                          </div>
                      )}
                   </FadeIn>
               </div>
           </div>
       )
    } 
 } 

 const mapStateToProps = state => ({
     group_details: state.Group.group_details,
     joined: state.Group.joined
 })

 export default connect(mapStateToProps)(Group);
 export {Group as PureGroup}