const express = require('express');
const app = express();
      require('dotenv').config();
const {PORT,SESSION_SECRET_LETTER} = process.env; 
const favicon = require('serve-favicon');
const {join} = require('path');
const cors = require('cors');
const bodyParser = require('body-parser'); //body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
const session = require('client-sessions');
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars');

const AppRoutes = require('./routers/app-routes');
const {variables} = require('./config/Middlewares');
const connectDb = require('./config/db');
const corsOptions = { origin: "http://localhost:3000" }
const userRoutes = require('./routers/user/user-routes');
const signupRoutes = require('./routers/user/signup-routes');
const loginRoutes = require('./routers/user/login-routes');
const passwordRoutes = require('./routers/user/password-routes');  
const quickLoginRoutes = require('./routers/user/quick-login-routes');

//Post routes
const postRoutes = require('./routers/api/post/post-routes');
const getPostsRoutes = require('./routers/api/post/get-posts');
const commentRoutes = require('./routers/api/post/comment-routes');
const shareRoutes = require('./routers/api/post/share-routes');
const likesRoutes = require('./routers/api/post/likes-routes');

//Follow routes
const followRoutes = require('./routers/api/follow/follow-routes');
const favouriteRoutes = require('./routers/api/follow/favourite-routes');
const recommendRoutes = require('./routers/api/follow/recommend-routes');

//Conversation routes
const conversationRoutes = require('./routers/api/conversation/con-routes');
const messageRoutes = require('./routers/api/conversation/message-routes');

//Group routes
const groupRoutes = require('./routers/api/group/group-routes');
const getGroupSectionsRoutes = require('./routers/api/group/get-group-sections');

//Other API routes
const notifyRoutes = require('./routers/api/others/notification-routes');
const editRoutes = require('./routers/api/others/edit-routes');
const exploreRoutes = require('./routers/api/others/explore-routes');
const hashtagRoutes = require('./routers/api/others/hashtag-routes');
const notificationRoutes = require('./routers/api/others/notification-routes');
const settingsRoutes = require('./routers/api/others/settings-routes');

//Main route
const mainRoutes = require('./routers/main-routes');

connectDb();
app.use(cors(corsOptions));
app.set('view engine','ejs');
app.set('views','views');

app.use(express.json({extended:false}));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended: false }));   
app.use(express.static(join(__dirname,'/dist'))); 
app.use(session({
    cookieName: 'session',
    secret: SESSION_SECRET_LETTER,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000 
   }));
app.use(cookieParser());  //parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(variables);       //Middleware for some local variables to be used in the template

app.use(userRoutes)
app.use(signupRoutes)
app.use(loginRoutes)
app.use(passwordRoutes)
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

app.use('/api',mainRoutes);

app.listen(PORT,() => console.log(`Server started on port ${PORT}`));