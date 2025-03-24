import mongoose from 'mongoose';

const mockInterviewSchema = new mongoose.Schema({
    mockId: { type: String, required: true, unique: true },
    jsonMockResp: { type: String, required: true },
    jobPosition: { type: String, required: true },
    jobDesc: { type: String, required: true },
    jobExperience: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: String, required: true },
}, { timestamps: true });

const MockInterview = mongoose.models.MockInterview || mongoose.model('MockInterview', mockInterviewSchema);

export default MockInterview;
