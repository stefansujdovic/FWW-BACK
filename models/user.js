const moongose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new moongose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        required: true,
        maxlength: 32
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
}, { timestamps: true });

userSchema.virtual('password')

    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password)
    })

    .get(function () {
        return this._password
    })


userSchema.methods = {
    //login
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return 'No password';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (error) {
            return ''
        }
    }
}

module.exports = moongose.model("User", userSchema);