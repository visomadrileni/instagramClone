//Routes file
//User routes 
const userRoutes = require('./user/user-routes');
const signupRoutes = require('./user/signup-routes');
const loginRoutes = require('./user/login-routes');
const passwordRoutes = require('./user/password-routes');  
const quickLoginRoutes = require('./user/quick-login-routes');

//Post routes
const postRoutes = require('./api/post/post-routes');
const getPostsRoutes = require('./api/post/get-posts');
const commentRoutes = require('./api/post/comment-routes');
const shareRoutes = require('./api/post/share-routes');
const likesRoutes = require('./api/post/likes-routes');

//Follow routes
const followRoutes = require('./api/follow/follow-routes');
const favouriteRoutes = require('./api/follow/favourite-routes');
const recommendRoutes = require('./api/follow/recommend-routes');

//Conversation routes
const conversationRoutes = require('./api/conversation/con-routes');
const messageRoutes = require('./api/conversation/message-routes');

//Group routes
const groupRoutes = require('./api/group/group-routes');
const getGroupSectionsRoutes = require('./api/group/get-group-sections');

//Other API routes
const notifyRoutes = require('./api/others/notification-routes');
const editRoutes = require('./api/others/edit-routes');
const exploreRoutes = require('./api/others/explore-routes');
const hashtagRoutes = require('./api/others/hashtag-routes');
const notificationRoutes = require('./api/others/notification-routes');
const settingsRoutes = require('./api/others/settings-routes');

//Main route
const mainRoutes = require('./main-routes');

const AppRoutes = app => {
    app.use('/',userRoutes)
    app.use('/',signupRoutes)
    app.use('/',loginRoutes)
    app.use('/',passwordRoutes)
    app.use('/api',quickLoginRoutes)

    app.use('/api',postRoutes)
    app.use('/api',getPostsRoutes)
    app.use('/api',commentRoutes)
    app.use('/api',shareRoutes)
    app.use('/api',likesRoutes)

    app.use('/api',followRoutes)
    app.use('/api',recommendRoutes)
    app.use('/api',favouriteRoutes)

    app.use('/api',conversationRoutes)
    app.use('/api',messageRoutes)

    app.use('/api',groupRoutes)
    app.use('/api',getGroupSectionsRoutes)

    app.use('/api',notifyRoutes)
    app.use('/api',editRoutes)
    app.use('/api',exploreRoutes)
    app.use('/api',hashtagRoutes)
    app.use('/api',notificationRoutes)
    app.use('/api',settingsRoutes)

    app.use('/api',mainRoutes)
}

module.exports = AppRoutes;