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
import { formatter } from "../../utils/formatter.js";

export const sendMail = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // TODO check user is logged in

        // extract data from req
        const { from, subject, text } = req.body;

        // create node mailer instance
        const mailAdapter = new NodeMailerAdapter();

        // send email
        const info = await mailAdapter.sendEmail(from, subject, text);

        return res.json(formatter.formatOKResponse(200, "Message with " + info.messageId + " sent successfully"));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};

export const uploadImage = async (logger, dbAdapter, jwtAdapter, cryptoAdapter, req, res) => {
    try {
        // TODO check user is logged in

        // create node mailer instance
        const froalaAdapter = new FroalaAdapter();

        // process image upload
        const result = await froalaAdapter.processImage(req);

        return res.json(formatter.formatOKResponse(200, result?.link));
    } catch (e) {
        return res.status(500).send(formatter.formatErrorResponse(500, e.message));
    }
};