const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Instead of adding username and passport to UserSchema, we use the plugin as shown in below code.
// Because this plugin of passportLocalMongoose will do that job of adding a space for username and passport as well as helps use in keeping every username unique.
// Also it get us to use some additional methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);