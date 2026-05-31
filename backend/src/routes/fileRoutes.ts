import { Router } from 'express';
import { getFiles, uploadFile, deleteFile } from '../controllers/fileController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'motionflow_uploads',
    allowed_formats: ['jpg', 'png', 'pdf', 'mp4', 'zip'],
  } as any,
});

const upload = multer({ storage: storage });

router.route('/')
  .get(protect, getFiles)
  .post(protect, upload.single('file'), uploadFile);

router.route('/:id').delete(protect, deleteFile);

export default router;
