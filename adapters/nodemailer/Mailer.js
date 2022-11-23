import nodemailer from 'nodemailer';

/**
 * @author Óscar Font
 * ====================
 * NodeMailerAdapter class
 * ====================
 * @description
 * Adapter Pattern applied to the logger details.
 * This class works as a wrapper of the nodemailer library.
 * Currently uses Nodemailer, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */
class NodeMailerAdapter {

    // mailer property that contains the nodemailer
    #mailer;
    username;
    password;

    constructor() {
        this.username = "oscar.font99@gmail.com";
        this.password = "besutwiwvqycnkga";
        this.#mailer = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: this.username,
                pass: this.password,
            },
        });
    }

    // getter
    get username() {
        return this.username;
    }

    get password() {
        return this.password
    }

    // setter
    set username(user) {
        this.username = user;
    }

    async sendEmail(from, subject, text) {
        try {
            // send mail with defined transport object
            const email = {
                from: this.username,
                to: this.username,
                subject: subject + ' from ' + from,
                text: text
            }
            const info = await this.#mailer.sendMail(email);
            return info;
        } catch (e) {
            throw e;
        }
    }
}

export default NodeMailerAdapter;