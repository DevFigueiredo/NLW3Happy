import multer from 'multer';
import path from 'path'
import { request } from 'http';
export default{
    storage: multer.diskStorage({
        destination: path.join(__dirname,'..','..', 'uploads'),
        filename: (request, file, cb)=>{
            const filename =`${Date.now()}-${file.originalname}`;
            cb(null, filename);
        }
    })
}