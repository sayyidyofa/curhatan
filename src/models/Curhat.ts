import { model, Schema } from 'mongoose';
import ICurhat from "./interfaces/ICurhat";


const CurhatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        index: true,
        unique: false,
        required: 'CurhatModel user cannot be blank'
    },
    content: {
        type: String,
        required: 'CurhatModel content cannot be blank'
    }
})

export default model<ICurhat>('CurhatModel', CurhatSchema)