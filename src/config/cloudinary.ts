import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

export interface Request {
    files?: Express.Multer.File[]; 
  }

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: 'article-images', 
        format: file.mimetype.split('/')[1], 
        public_id: `${Date.now()}-${file.originalname}`,
      }),
  });
  
  const upload = multer({ storage });
  
  export { cloudinary, upload };