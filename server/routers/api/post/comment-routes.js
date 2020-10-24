const route = require('express').Router(),
      Post = require('../../../model/Post'),
      root = process.cwd(),
      upload = require('multer')({ dest: `${root}/dist/temp/`}),
     {unlinkSync,createReadStream,createWriteStream} = require('fs'),
     {ProcessImage,DeleteAllFolder} = require('../../../utils/handyImageProcessor'),
     {catchError} = require('../../../utils/error');

 //Comment text [req=post, test]
 route.post('/comment-text', async (req,res) => {
     try{
         const {post_id,text} = req.body,
               {id} = req.session;
         let comment_id = Post.create({posts:{post:{comments:{
                    type: 'text',
                    text,
                    comment_by: id,
                    post_id,
                    comment_time: new Date().getTime()
                }}}}).save();

         res.json({
             success: true,
             message: 'Commented',
             comment_id
         });
     }catch(error){
         catchError(error,res);
     }
 });

 //Comment image [req=post,commentImage(file)]
 route.post('/comment-image',upload.single('commentImmage'), async (req,res) => {
   try{
     const {id} = req.session,
           {post} = req.body;
        let filename = `instagram_account_${new Date().getTime()}.jpg`,
            obj = {
                srcFile: req.file.path,
                destFile: `${root}/dist/comments/${filename}`
            };

        ProcessImage(obj);
        DeleteAllFolder(`${root}/dist/temp/`);

        let comment_id = Post.create({posts:{post:{comments:{
            type: 'image',
            commentSrc: filename,
            comment_by: id,
            post_id: post,
            comment_time: new Date().getTime()
         }}}}).save();

        res.json({
            success: true,
            message: 'Commented',
            comment_id,
            filename
        })
   }catch(error){
       catchError(error,res)
   }
 });

 //Comments sticker [req=post,sticker]
  route.post('/comment-sticker', async (req,res) => {
      try{
          const {sticker,post,id} = req.body;
          let filename = `instagram_account_${new Date().getTime()}.jpg`;


          createReadStream(`${root}/dist/images/stickers/${sticker}`).pipe(createWriteStream(`${root}/dist/comments/${filename}`));
          let comment_id = Post.create({posts:{post:{comments:{
                    type: 'sticker',
                    commentSrc: filename,
                    comment_by: id,
                    post_id: post,
                    comment_time: new Date().getTime()
              }}}}).save();

          res.json({
              success: true,
              message: 'Commented',
              comment_id,
              filename
          });    
     }catch(error){
         catchError(error,res);
     }
  });

  //Delete comment [req=comment_id,type,commentSrc]
  route.post('/delete-comment', async (req,res) => {
      const {comment_id,type,commentSrc} = req.body;
      Post.findByIdAndRemove({posts:{post:{comments:{comment_id:comment_id}}}});
      if(type === 'image' || type === 'sticker'){
          unlinkSync(`${root}/dist/comments/${commentSrc}`)
      }
     res.json('Comment deleted')
  });

  //Edit comments [req=comment_id,comment]
 route.post('/edit-comment', async (req,res) => {
   const {comment_id,comment} = req.body;
   Post.updateMany({posts:{post:{comments:{text:comment,comment_id:comment_id}}}});
   res.json('Comment edit')
 });

  module.exports = route;





















