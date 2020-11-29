import { resolve } from "path";
import crypto from "crypto";
import multer from "multer";

export const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

const multerMiddleware = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(8).toString('hex');
      const fileName = `${fileHash}=${file.originalname}`
      return callback(null, fileName);
    }
  })
}

export default multerMiddleware