const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user_schema = new mongoose.Schema({
    display_name: {
        type: String,
        required: [true, "display name is required"],
    },
    username: {
        type: String,
        required: [true, "username required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    wallet_address: {
        type: String,
        required: [true, "address is required"],
        index: true,
        unique: true,
        lowercase: true,
        trim: true   // no whitespaces allowed
    },
    email: {
        type: String,
        required: [true, "email is required"],
        index: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],

    },
    level: {
        type: Number,
        default: 0,
    },
    coins: {
        type: Number,
        default: 50,
    },
    liked_chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ],
    library: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ],
    voter: {
        type: Boolean,
        default: false
    },
    voted_chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ],
    refresh_token: {
        type: String,
    },

    // --- STATISTICS ---
    stats: {
        chapters_read: {
            type: Number,
            default: 0
        },
        books_completed: {
            type: Number,
            default: 0
        },
        chapters_written: {
            type: Number,
            default: 0
        },
        canon_chapters_won: {
            type: Number,
            default: 0
        }
    },

    // --- CURRENTLY READING ---
    currently_reading: [{
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books"
        },
        last_read_chapter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        },
        last_read_date: {
            type: Date,
            default: Date.now
        }
    }],

    // --- DRAFTS/WORKS IN PROGRESS ---
    writing_drafts: [{
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books"
        },
        title: String,
        content: String,
        last_saved: {
            type: Date,
            default: Date.now
        }
    }],
},)

user_schema.pre("save", async function (next) {      //its a hook 
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

user_schema.methods.validate_password = async function (password) {     //method injection
    return await bcrypt.compare(password, this.password);
}

user_schema.methods.generate_access_token = async function () {
    const token = await jwt.sign({                                            //encoding
        _id: this._id,                                         //payload or data needs to be in object 
        display_name: this.display_name,
        username: this.username,
        email: this.email,
        wallet_address: this.wallet_address,

    },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                             //options  needs to be in obejct
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
    console.log(token, "this is access token");
    console.log(typeof (token));
    return token;
}

user_schema.methods.generate_refresh_token = async function () {
    const refreshToken = await jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
    console.log(refreshToken, "this is refresh token");
    console.log(typeof (refreshToken));
    return refreshToken;
}
const User = mongoose.model("User", user_schema);
module.exports = User;


