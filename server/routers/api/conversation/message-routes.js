const route = require('express').Router(),
      Message = require('../../../model/Message'),
      root = process.cwd(),
      { promisify } = require('util'),
      { createReadStream, createWriteStream} = require('fs'),
      upload = require('multer')({ dest: `${root}/dist/temp`}),
      {catchError} = require('../../../utils/error'),
      {ProcessImage,DeleteAllOfFolder} = require('../../../utils/handyImageProcessor');


//Text message [req=message, con_id,con_with]
route.post('/text-message', async (req,res) => {
    try{
        const {message,con_id,con_with} = req.body;
        let newMessage = Message.create([{conversation:{conversation:con_id}},{conDetails:{
                            message_by: req.session.id,
                            message_to: con_with,
                            message:message,
                            type: 'text',
                            message_time: new Date().getTime()}}]).save();
        res.json(newMessage);
    }catch(error){
        catchError(error,res)
    }
});

//Image message [req=con_id,con_wth,messageFile(file)]
route.post('/image-message',upload.single('messageFile'), async (req,res) => {
    try{
        const {con_id,con_with} = req.body;
        let filename = `instagram_message_${new Date().getTime()}.jpg`,
            obj = {
                srcFile: req.file.path,
                destFile: `${root}/dist/messages/${filename}`
            };
        ProcessImage(obj);
        DeleteAllOfFolder(`${root}/dist/temp/`);

        let newImageMssg = Message.create([{conversation:{conversation:con_id}},{conDetails:{
            message_by: req.session.id,
            message_to: con_with,
            message:message,
            type: 'image',
            message_time: new Date().getTime()}}]).save();

        res.json({
            success: true,
            message: 'Messaged',
            message_id: newImageMssg,
            filename
        })
    }catch(error){
        catchError(error,res);
    }
});

//Comment sticker [req=con_id,sticker,con_with]
route.post('/sticker-message',async (req,res) => {
   try{
       const {sticker,con_id,con_with} = req.body;
       let filename = `instagram_message_${new Date().getTime()}.jpg`;

     createReadStream(`${root}/dist/images/stickers/${sticker}`).pipe(createWriteStream(`${root}/dist/messages/${filename}`))
     let newStickerMsg = Message.create([{conversation:{conversation:con_id}},{conDetails:{
                                    message_by: req.session.id,
                                    message_to: con_with,
                                    message:filename,
                                    type: 'sticker',
                                    message_time: new Date().getTime()}}]).save();
        res.json({
            success: true,
            message: 'Messaged',
            message_id: newStickerMsg,
            filename
        })
    }catch(error){
        catchError(error,res)
    }
});

//Edit Message [req=message,message_id]
route.post('/edit-message', async (req,res) => {
    try{
        const {message,message_id} = req.body;
        Message.findOneAndUpdate({conDetails:message_id},{$set:{message}});

        res.json({
            success: true,
            message: 'Message updated'
        })
    }catch(error){
        catchError(error,res);
    }
});

//Delete message [req=message_id,type,message]
route.post('delete-message', async (req,res) => {
    try{
        const {message_id,type,message} = req.body;
        let deleteMessageFile = promisify(unlink);

        Message.findOneAndRemove({conDetails:message_id});
        if(type === 'image' || type === 'sticker'){
            deleteMessageFile(`${root}/dist/messages/${message}`)
        }

        res.json({
            success: true, 
            message: 'Deleted'
        })
    }catch(error){
        catchError(error,res);
    }
})

module.exports = route;















