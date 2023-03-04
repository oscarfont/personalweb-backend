import FroalaEditor from 'wysiwyg-editor-node-sdk/lib/froalaEditor.js';
import { LogLevel } from "../../adapters/logger/LogLevel.js";

/**
 * @author Óscar Font
 * ====================
 * FroalaAdapter class
 * ====================
 * @description
 * Adapter Pattern applied to the froala sdk details.
 * This class works as a wrapper of the Image upload library.
 * Currently uses Froala, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */
class FroalaAdapter {

    #froalaSdk;
    imagesDirectory;

    constructor() {
        this.imagesDirectory = '/public/';
        this.#froalaSdk = FroalaEditor;
    }

    // getter
    get imagesDir() {
        return this.imagesDirectory;
    }

    // setter
    set imagesDir(newDir) {
        this.imagesDirectory = newDir;
    }

    async processImage(logger, request) {
        logger.log("/utils/uploadImage", LogLevel.INFO, `log request information: ${request}`);
        return new Promise((resolve, reject) => {
            var options = {
                resize: [512, 512]
            }
            this.#froalaSdk.Image.upload(request, this.imagesDirectory, options, (error, data) => {
                if (error) {
                    return reject(error);
                }

                logger.log("/utils/uploadImage", LogLevel.INFO, `image data received: ${data}`);
                logger.log("/utils/uploadImage", LogLevel.INFO, `image data link: ${data?.link}`);

                const newPath = data?.link.split('/')[2];

                resolve({ link: newPath });
            });
        });
    }

    async deleteImage(fileName) {
        return new Promise((resolve, reject) => {
            this.#froalaSdk.Image.delete(fileName, (error) => {
                if (error) {
                    return reject(error);
                }

                resolve();
            });
        });
    }
}

export default FroalaAdapter;