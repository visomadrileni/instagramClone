const route = require('express').Router(),
      User = require('../../../model/User');

//<> on mysql means that each table has at least one data category in a column,and each row has a certain data
// instance for the categories which are defined in the columns.

//User to recommend [req=user]
route.post('/get-users-to-recommend', async (req,res) => {
    let users =  User.find({});
    res.json(users);
});

//RECOMMEND USER [req=user,recommend_to]
route.post('/recommend-user', async (req,res) => {
    let respObj = {};

    try{
        const {user,recommend_to} = req.body,
              {id: recommend_by} = req.session;

         User.findById({user},(err,user) => {
            if(user){
                let isBlocked = user.isBlocked.map(blckUser => blckUser.id === recommend_by),
                    isBlockedTwo = user.recommendTo.map(rUser => rUser.id === recommend_by),
                    recommend = {
                        recommend_by,
                        recommend_to,
                        recommend_of: user,
                        recommend_time: new Date().getTime()
                    };

                    if(!isBlocked && !isBlockedTwo){
                        user.findOneAndUpdate({$set:{recommendations:recommend}},{new:true});
                        let recommend_to_username = user.findOne({username:recommend_to});
                        respObj = {
                            success: true,
                            message: `Recommended ${user.username} to ${recommend_to_username} `
                        }
                    }else {
                        respObj = {
                            message: 'Could not recommend'
                        }
                    }
            
                  res.json(respObj)
            }
        })
    }catch(error){
        console.log(error);
    }
});

//Remove recommandation [req=recommend_id]
route.post('/remove-recommandation', async (req,res) => {
    User.findOneAndRemove({recommendations:{recommend_id:req.body.recommend_id}});
    res.json(`Remove ${req.body.recommend_id}`)
});

module.exports = route;


























