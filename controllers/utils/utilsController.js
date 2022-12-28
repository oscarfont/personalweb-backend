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

import NodeMailerAdapter from "../../adapters/nodemailer/Mailer.js";
import FroalaAdapter from "../../adapters/froalasdk/FroalaAdapter.js";
import InvalidRequest from "../../models/errors/InvalidRequest.js";
import { formatter } from "../../utils/formatter.js";

export const sendMail = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // extract data from req
        const { from, subject, text } = req.body;

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
        const jwtToken = authHeader?.slice(7, authHeader.length - 1);

        if (!jwtToken || !jwtAdapter.verify(jwtToken)) throw new InvalidRequest("Authorization header must be present and valid");

        // create node mailer instance
        const froalaAdapter = new FroalaAdapter();

        // process image upload
        const result = await froalaAdapter.processImage(req);

        return res.json(formatter.formatSuccessfulResponse(result?.link));
    } catch (e) {
        next(e);
    }
};

export const deleteImage = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res, next) => {
    try {
        // check user is logged in
        const authHeader = req.headers.authorization;
        const jwtToken = authHeader?.slice(7, authHeader.length - 1);

        if (!jwtToken || !jwtAdapter.verify(jwtToken)) throw new InvalidRequest("Authorization header must be present and valid");

        const fileName = req.body.src;

        // create node mailer instance
        const froalaAdapter = new FroalaAdapter();

        // process image upload
        const result = await froalaAdapter.deleteImage(fileName);

        return res.json(formatter.formatSuccessfulResponse(result?.link));
    } catch (e) {
        next(e);
    }
};