import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv';

const storage=new GridFsStorage({
    url:process.env.MONGODVURL,
    file:(request,file)=>{
        const match=["image/png","image.jpg"];
        if(match.indexOf(file.mimetype)===-1){
            return null;
        }
        return{
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`,
            _id:file._id,
        }
    }
});

const upload=multer({storage});

export default upload;