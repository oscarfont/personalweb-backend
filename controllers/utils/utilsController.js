import NodeMailerAdapter from "../../adapters/nodemailer/Mailer.js";
import ImageManager from "../../adapters/imageManager/ImageManager.js";
import InvalidRequest from "../../models/errors/InvalidRequest.js";
import { formatter } from "../../utils/formatter.js";
import { LogLevel } from "../../adapters/logger/LogLevel.js";
import { statSync } from 'node:fs';

/**
 * @author Óscar Font
 * =====================
 * utilsController module
 * =====================
 * @description 
 * This file works as a controller.
 * It contains the main functions that handle the main requests
 * of the backend server endpoints regarding utils posts.
 */
export const sendMail = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // extract data from req
        const { from, subject, text } = req.body;

        logger.log("/utils/sendMail", LogLevel.INFO, `method: POST, params: [], request-body: {${from}, ${subject}, ${text}}`);

        // create node mailer instance
        const mailAdapter = new NodeMailerAdapter();

        // send email
        const info = await mailAdapter.sendEmail(from, subject, text);

        return res.json(formatter.formatSuccessfulResponse("Message with " + info.messageId + " sent successfully"));
    } catch (e) {
        next(e);
    }
};

export const uploadImage = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // check user is logged in
        const authHeader = req.headers.authorization;
        const jwtToken = authHeader?.slice(7, authHeader.length);

        if (!jwtToken || !jwtAdapter.verifyToken(jwtToken)) throw new InvalidRequest("Authorization header must be present and valid");

        logger.log("/utils/uploadImage", LogLevel.INFO, `method: POST, params: [], request-body: {${req?.body}}`);

        // create node mailer instance
        const imageManager = new ImageManager();

        // process image upload
        const result = await imageManager.processImage(req, res);

        return res.json(formatter.formatSuccessfulResponse(result?.link));
    } catch (e) {
        next(e);
    }
};

export const deleteImage = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // check user is logged in
        const authHeader = req.headers.authorization;
        const jwtToken = authHeader?.slice(7, authHeader.length);

        if (!jwtToken || !jwtAdapter.verifyToken(jwtToken)) throw new InvalidRequest("Authorization header must be present and valid");

        const fileName = req.body.src;

        logger.log("/utils/deleteImage", LogLevel.INFO, `method: POST, params: [], request-body: {${fileName}}`);

        // create nimage manager instance
        const imageManager = new ImageManager();

        // process image deletion
        const result = await imageManager.deleteImage(fileName);

        return res.json(formatter.formatSuccessfulResponse({ success: result }));
    } catch (e) {
        next(e);
    }
};