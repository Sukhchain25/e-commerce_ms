import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    emailId: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', UserSchema);
export default Users;
