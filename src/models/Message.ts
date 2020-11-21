import { model, Schema } from 'mongoose';
import IMessage from './interfaces/IMessage';


const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        index: true,
        unique: false,
        required: 'IMessage sender cannot be blank'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        index: true,
        unique: false,
        required: 'IMessage receiver cannot be blank'
    },
    content: {
        type: String,
        required: 'IMessage content cannot be blank'
    }
}, { timestamps: true })

export default model<IMessage>('IMessage', MessageSchema)
