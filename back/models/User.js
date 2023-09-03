module.exports.User = class User {
    id;

    name;

    locations = [];

    constructor(name) {
        this.id = this.#uuid();
        this.name = name;
    }

    #uuid(num = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
