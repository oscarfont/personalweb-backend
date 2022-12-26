import MockDb from '../adapters/database/MockDb.js';
import LoggerAdapter from '../adapters/logger/Logger.js';
import ServerAdapter from '../adapters/server/Server.js';
import JWTAdapter from '../adapters/auth/JWTAdapter.js';
import CryptoAdapter from '../adapters/auth/CryptoAdapter.js';
import request from 'supertest';

describe("Testing the blog endpoints", () => {

    let server = undefined;
    let postId = undefined;

    // start the server before executing all the tests
    beforeAll(() => {
        // init logger
        const logger = new LoggerAdapter();

        // init database
        const db = new MockDb(logger);
        db.start();

        // init auth adapter
        const jwtAdapter = new JWTAdapter(logger);
        const cryptoAdapter = new CryptoAdapter(logger);

        // init server
        const port = 3000;
        server = new ServerAdapter(port, logger, db, jwtAdapter, cryptoAdapter);
        server.start();
    });


    test("The POST /blog/publish?category shall publish a blog to the system successfully", async () => {
        const body = {
            title: "How to use custom properties",
            summary: "The today trendy CSS properties are defined and used in some examples",
            content: "lorem ipsum lore lore ipsum lore",
            media: []
        }
        const response = await request(server.server).post("/blog/publish?category=IT%20Blog", body);
        expect(response.statusCode).toBe(200);
    });

    test("The GET /blog/get/all?category shall return return the recently published test sucessfully", async () => {
        const response = await request(server.server).get("/blog/get/all?category=IT%20Blog");
        expect(response.body.status).toBe("success");
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
        postId = response.body.data[0]?.id;
    });

    test("The DELETE /blog/remove/id shall remove the recently published post sucessfully", async () => {
        const response = await request(server.server).delete(`/blog/remove/${postId}`);
        expect(response.body.status).toBe("success");
        expect(response.statusCode).toBe(200);
    });
});