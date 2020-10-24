 import {applyMiddleware,combineReducers,createStore,compose} from 'redux';
 import thunk from 'redux-thunk';
 import logger from 'redux-logger';

 import User from './User';
 import Follow from './Follow';
 import Notification from './Notification';
 import Post from './Post';
 import Explore from './Explore';
 import Group from './Group';
 import Message from './Message';
 import Setting from './Setting';
 import Hashtag from './Hashtag';

  const reducers = combineReducers({
      User,Follow,Notification,Post,Explore,Group,Message,Setting,Hashtag
  });

  const middlewares = applyMiddleware(thunk,logger);

  export default createStore(reducers,middlewares)




















































