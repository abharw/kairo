import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },   
    username: {
        type: String,
        unique: true,
    },
    photo: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
        unique: true,
    },
    lastName: {
        type: String,
        unique: true,
    },
});

const User = models?.User || model("User", UserSchema);

export default User;