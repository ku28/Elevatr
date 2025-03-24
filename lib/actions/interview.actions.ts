"use server"
import { connectToDB } from "../mongoose";
import MockInterview from '../models/mockinterview.model';
import exp from "constants";

export async function createMockInterview({
    mockId,
    jsonMockResp,
    jobPosition,
    jobDesc,
    jobExperience,
    createdBy,
    createdAt,
}: {
    mockId: string;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string;
}) {
    try {
        await connectToDB();

        const newMockInterview = await MockInterview.create({
            mockId,
            jsonMockResp,
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy,
            createdAt,
        });

        return { success: true, data: JSON.stringify(newMockInterview) };
    } catch (error: any) {
        console.error(`Failed to create mock interview: ${error.message}`);
        return { success: false, error: error.message };
    }
}

export async function fetchMockInterview(mockId: string) {
    try {
        await connectToDB();

        const interviewData = await MockInterview.findOne({ mockId }).lean();
        if (!interviewData) {
            console.log("No interview found with this mockId:", mockId);
            return null;
        }
        return interviewData;
    } catch (error: any) {
        throw new Error(`Failed to fetch mock interview: ${error.message}`);
    }
}