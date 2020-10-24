const route = require('express').Router(),
      fs = require('fs'),
      root = procees.cwd(),
      upload = require('multer')({ dest: `${root}/dest/temp/` }),
      { catchError } = require('../../utils/error'),
      {ProcessImage,DeleteAllOfFolder} = require('../../utils/handyImageProcessor');


 //Get avatars 
 route.post('/get-avatars',(req,res) => {
     let avatars = fs.readdirSync(`${root}/dist/images/avatars`);
     res.json(avatars);
 });

 //Get stickers 
 route.post('/get-sticker',(req,res) => {
     let stickers = fs.readdirSync(`${root}/dist/images/stickers`);
     res.json(stickers);
 });

 //Change avatar [req=avatar, of,group]
 route.post('/change-avatar', async (req,res) => {
     try{
         let {avatar,of,group} = req.body,
         {id} = req.session,
         src = `${root}/dist/images/avatars/${avatar}`,
         dest = of === 'user' ? `${root}/dist/users/${id}/avatar.jpg` : `${root}/dist/groups/${group}/avatar.jpg`

         fs.createReadStream(src).pipe(fs.createWriteStream(dest));
         res.json({
             success: true,
             message: 'Avatar changed'
         })
     }catch(error){
         catchError(error,res)
     }
 });

 //Upload avatar [req=of,group,avatar(file)]
 route.post('/upload-avatar',upload.single('avatar'), async (req,res) => {
     try{
         let {file,session,body: {of,group}} = req,
         dest = of === 'user' ? `${root}/dist/users/${session.id}/avatar.jpg` : `${root}/dist/groups/${group}/avatar.jpg`,
         obj = {
             srcFile: file.path,
             width: 200,
             height: 200,
             destFile: dest
         };

        ProcessImage(obj);
        DeleteAllOfFolder(`${root}/dest/temp/`);

        res.json({
            success: true,
            message: 'Avatar changed'
        })
     }catch(error){
         catchError(error,res)
     }
 });

 module.exports = route;

























































