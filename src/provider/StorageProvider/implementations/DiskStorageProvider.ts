import fs from "fs";
import path from "path";
import { tmpFolder } from "../../../config/upload";
import IStorageProvider from "../IStorageProvider";

export default class DiskStorageProvider implements IStorageProvider {
  async deleteFile(file: string): Promise<void> {
    const filePath = path.join(tmpFolder, file);
    const imageFileExists = await fs.promises.stat(filePath);
    if (imageFileExists) {
      await fs.promises.unlink(filePath);
    }
  }
}