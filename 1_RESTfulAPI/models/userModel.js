const bcrypt = require('bcrypt');

const users = [];
let currentId = 0;

const saltRounds = 12;

const hashPassword = async (plainPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        // console.log('Hashed Password:', hashedPassword);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
    }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (err) {
        console.error('Error verifying password:', err);
    }
};

function checkBirth(dateOfBirth) {
    let age = new Date().getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = new Date().getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < dateOfBirth.getDate())) {
        age--; // before birthday
    }
    return age
}

class User {
    constructor(id, email, password, name, dateOfBirth, gender, address, subscribe) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        this.subscribe = subscribe;
    }

    static async createUser(email, password, name, dateOfBirth, gender, address, subscribe) {
        let checkemail = this.getUserbyEmail(email);
        const hashpasswork = await hashPassword(password);
        if (!checkemail) {
            const id = ++currentId;
            const newUser = {
                id: id,
                email: email,
                password: hashpasswork,
                name: name,
                dateOfBirth: new Date(dateOfBirth),
                gender: gender,
                address: address,
                subscribe: subscribe,
            };
            users.push(newUser);
            return true
        } else {
            return false;
        }
    }

    static getUsers() {
        if (users) {
            const userResponses = users.map(user => {
                let age = checkBirth(user.dateOfBirth)
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    age: age,
                    gender: user.gender,
                    address: user.address,
                    subscribe: user.subscribe
                };
            });
            return userResponses
        }

        return null
    }

    static getUser(id) {
        return users.find(u => u.id === id);
    }

    static getUserbyId(id) {
        const user = users.find(u => u.id === id);
        if (user) {
            let age = checkBirth(user.dateOfBirth)
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                age: age,
                gender: user.gender,
                address: user.address,
                subscribe: user.subscribe
            };
        }
        return null
    }

    static getUserbyEmail(email) {
        return users.find(u => u.email === email);
    }

    static updateUser(id, data) {
        const user = this.getUser(id);
        if (user) {
            const { dateOfBirth, gender, address, subscribe } = data;

            user.dateOfBirth = dateOfBirth !== undefined ? new Date(dateOfBirth) : user.dateOfBirth;
            user.gender = gender !== undefined ? gender : user.gender;
            user.address = address !== undefined ? address : user.address;
            user.subscribe = subscribe !== undefined ? subscribe : user.subscribe;
            return this.getUserbyId(id);
        }
        return null;
    }

    static deleteUser(id) {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            return true;
        }
        return false;
    }

    static async changePassword(id, data) {
        const user = this.getUser(id);
        if (user) {
            const match = await verifyPassword(data.currentPassword, user.password);
            if (!user || !match) {
                return { status: 401, message: 'Current password is incorrect' };
            }
            if (data.newPassword !== data.confirmPassword) {
                return { status: 400, message: 'New passwords do not match' };
            }
            user.password = await hashPassword(data.newPassword);
            return { status: 200, message: 'Update password successfully' }
        }
        return { status: 404, message: 'User not found' }
    }
}

module.exports = User;