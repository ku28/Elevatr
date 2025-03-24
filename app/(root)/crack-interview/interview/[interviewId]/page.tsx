"use client"

import { Button } from '@/components/ui/button';
import { fetchMockInterview } from '@/lib/actions/interview.actions';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from "react-webcam";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

function Interview({ params }: { params: { id: string } }) {
    interface InterviewData {
        jobPosition: string;
        jobDesc: string;
        jobExperience: string;
    }

    const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    const [interviewId, setInterviewId] = useState(null);
    const GetInterviewDetails = async (id: string) => {
        const result = await fetchMockInterview(id || "");
        console.log(result);
        const interviewData = JSON.parse(result as any);
        setInterviewData(interviewData);
        console.log(interviewData);
    }
    useEffect(() => {
        if (params.id) {
            GetInterviewDetails(params.id).then(() => {
                setInterviewId(interviewId);
            });
        }
    }, [params.id]);

    return (
        <div className='my-10 mx-10'>
            <h2 className='font-bold text-2xl'>Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        {interviewData ? (
                            <>
                                <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
                                <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData.jobDesc}</h2>
                                <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData.jobExperience}</h2>
                            </>
                        ) : (
                            <p>Loading interview details...</p>
                        )}
                    </div>
                    <div className='p-5 border rounded-lg border-blue-200 bg-blue-100'>
                        <h2 className='flex gap-2 items-center text-blue-800'><Lightbulb /><strong>Information</strong></h2>
                        <h2 className='mt-3 text-blue-950'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>
                <div>
                    {webcamEnabled ? <Webcam
                        onUserMedia={() => setWebcamEnabled(true)}
                        onUserMediaError={() => setWebcamEnabled(false)}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 300
                        }}
                    />
                        :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button variant="ghost" className="w-full" onClick={() => setWebcamEnabled(true)}>Enable Web Cam and Microphone</Button>
                        </>
                    }
                </div>
            </div>
            <div className='flex justify-end items-end'>
                <Link href={`/dashboard/interview/${interviewId}/start`}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default Interview