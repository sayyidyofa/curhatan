import { model, Schema } from 'mongoose'
import IUser from './interfaces/IUser';


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(_, userData: Partial<IUser>) {
      delete userData.password;
      delete userData._id;
    }
  }
});

userSchema.virtual('curhats', {
  ref: 'CurhatModel',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

// https://stackoverflow.com/questions/49473635/mongoose-pre-save-gives-me-red-lines
/*userSchema.pre('save', async function (this: IUser) {
  if (this.password && this.isModified('password')) {
    const salt = await BCrypt.genSalt(10);
    this.password = await BCrypt.hash(this.password, salt);
  }
})*/

export default model<IUser>('IUser', userSchema)
