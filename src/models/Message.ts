import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Check if model already exists to prevent overwrite error during hot reloading
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
