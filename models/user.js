/**
 * @author Óscar Font
 * ====================
 * User model class
 * ====================
 * @description
 * This class is represents an entity of the database.
 * In this case the User entity of our db.
 * In the architectural pattern applied in the system
 * this consists in the model of the user.
 */

class User {
    email;
    name;
    role;
    password;
    #jwt;

    constructor(email, role) {
        this.email = email;
        this.role = role;
    }

    setJWT(token) {
        this.#jwt = token;
    }

    getJWT() {
        return this.#jwt;
    }

    setPassword(pass) {
        this.password = pass;
    }

    getPassword() {
        return this.password;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

export default User;