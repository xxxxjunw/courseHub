import { Schema, model, Model, Document as mongooseDoc } from "mongoose";
import { Password } from "../util/password";

// An interface describes the properties that are required to create a new user.

interface UserAttrs {
    email: string,
    password: string
};


// An interface describe the property the User model has;
interface UserModel extends Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface describes the property the User document has.
interface UserDoc extends mongooseDoc {
    email: string;
    password: string

}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
}); 

userSchema.statics.build = (attrs: UserAttrs) => {

    return new User(attrs);
}

const User = model<UserDoc, UserModel>("User", userSchema);


export { User };