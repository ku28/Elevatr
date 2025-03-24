import mongoose from 'mongoose';

const userAnswerSchema = new mongoose.Schema({
    mockIdRef: { type: String, required: true },
    question: { type: String, required: true },
    correctAns: { type: String },
    userAns: { type: String },
    feedback: { type: String },
    rating: { type: String },
    userEmail: { type: String },
    createdAt: { type: String }
}, { timestamps: true });

const UserAnswer = mongoose.models.UserAnswer || mongoose.model('UserAnswer', userAnswerSchema);

export default UserAnswer;
