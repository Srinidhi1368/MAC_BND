const ResumeRoutes =require('express').Router()

const { uploadResume, getResumes, deleteResume } = require('../controller/Resume/ResumeController')
 
const  multer =require('multer')
 const storage =multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        return cb(null,`${file.originalname}_${Date.now()}`)
    }
 })
 
 const upload =multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // Limit file size to 2MB
    
  })


ResumeRoutes.post('/upload',upload.single('resumefile'),uploadResume)
ResumeRoutes.get('/getall/:email',getResumes)
ResumeRoutes.delete('/delete',deleteResume)


module.exports =ResumeRoutes