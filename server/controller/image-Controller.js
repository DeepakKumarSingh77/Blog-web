import grid from "gridfs-stream";
import mongoose from "mongoose";
const url = 'http://localhost:8000';

let gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection('fs');
})
export const uploadImage=(request,response)=>{
    // console.log('Request received at /fileupload endpoint');
    if(!request.file){
        return response.status(404).json({msg:"File not Found"});
    }
    const imageUrl=`${url}/file/${request.file.filename}`;
    return response.status(200).json({imageUrl});
}

export const getImage=async(req,res)=>{
    // console.log(req.params.file);
    try {
        const file=await gfs.files.findOne({filename:req.params.id});
        // console.log(file);
        const readstream=gridfsBucket.openDownloadStream(file._id);
        // console.log(readstream);
        readstream.pipe(res);
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
    }