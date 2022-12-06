import FroalaEditor from 'wysiwyg-editor-node-sdk/lib/froalaEditor.js';

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

    processImage(request) {
        this.#froalaSdk.Image.upload(request, this.imagesDirectory, (error, data) => {
            // if there is an error in image processing
            if (error) {
                throw new Error(JSON.stringify(error));
            }

            return data;
        });
    }
}

export default FroalaAdapter;