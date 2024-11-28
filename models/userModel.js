import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
        token:{
            type: String,
            default:'',
        }
    },
    { timestamps : true,}
);

const User = mongoose.model("User", userSchema);

export default User;



const userDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    gstNumber: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});


const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

export {UserDetails};



// // reset password

// const userReset = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   resetToken: { type: String },
//   tokenExpiry: { type: Date }
// });

// module.exports = mongoose.model('userReset', userReset);
