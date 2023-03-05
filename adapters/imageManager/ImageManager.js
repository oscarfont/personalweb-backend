import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from 'uuid';

/**
 * @author Óscar Font
 * ====================
 * ImageManager class
 * ====================
 * @description
 * Adapter Pattern applied to the multer details.
 * This class works as a wrapper of the Image upload library also removes images.
 * Currently uses Multer, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */
class ImageManager {

    #uploader;
    imagesDirectory;

    constructor() {
        this.imagesDirectory = `${process.cwd()}/public/`;
        this.#uploader = multer({
            dest: this.imagesDirectory,
            filename: function (req, file, cb) {
                let fileName = req.query.id;
                if (req.method === 'POST' && req.path === '/utils/uploadImage') {
                    const extension = file.mimetype.slice(file.mimetype.lastIndexOf('/'));
                    fileName = `${v4()}.${extension}`;
                }
                cb(null, fileName);
            }
        });
    }

    // getter
    get imagesDir() {
        return this.imagesDirectory;
    }

    // setter
    set imagesDir(newDir) {
        this.imagesDirectory = newDir;
    }

    async processImage(req, res) {
        const upload = this.#uploader.single('image');
        return new Promise((resolve, reject) => {
            upload(req, res, (error) => {
                if (error) {
                    reject(error);
                }

                const fileName = req?.file?.path.slice(req?.file?.path.lastIndexOf('/'))

                resolve({ link: fileName });
            });
        });
    }

    async deleteImage(imageName) {
        return new Promise((resolve, reject) => {
            fs.unlink(path.join(this.imagesDirectory, imageName), (error) => {
                if (error) {
                    reject(error);
                }

                resolve(true);
            });
        });
    }
}

export default ImageManager;