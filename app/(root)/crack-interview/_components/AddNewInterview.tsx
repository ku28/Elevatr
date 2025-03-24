"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '@/components/ui/textarea'
import { createMockInterview } from '@/lib/actions/interview.actions'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from "@hookform/resolvers/zod";
import moment from 'moment';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { generateInterviewQuestion } from '@/lib/actions/gemini.actions';
import { LoaderCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { mockInterviewValidationSchema } from '@/lib/validations/interview';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState<string>('');
    const [jobDesc, setJobDesc] = useState<string>('');
    const [jobExperience, setJobExperience] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const form = useForm({
        resolver: zodResolver(mockInterviewValidationSchema),
        mode: "onChange",
        defaultValues: {
            jobPosition: "",
            jobDesc: "",
            jobExperience: "",
        },
    });

    const onSubmit = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        console.log(jobPosition, jobDesc, jobExperience)
        const resp = await generateInterviewQuestion(jobPosition, jobDesc, jobExperience);
        const MockJsonResp = resp;
        console.log(MockJsonResp)
        setJsonResponse(MockJsonResp);

        if (!user) {
            toast({
                title: "Authentication Error",
                description: "You need to be logged in to perform this action.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            if (MockJsonResp) {
                const mockId = uuidv4();

                const result = await createMockInterview({
                    mockId: mockId,
                    jsonMockResp: JSON.stringify(MockJsonResp),
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user.primaryEmailAddress?.emailAddress || "Unknown",
                    createdAt: moment().format("DD-MM-YYYY"),
                });

                if (result.success) {
                    form.reset();
                    const mockinterview = JSON.parse(result.data!);
                    router.push(`crack-interview/interview/${mockinterview.mockId}`);
                } else {
                    toast({
                        title: "Error",
                        description: result?.error || "Failed to create mock interview.",
                        variant: "destructive",
                    });
                }
            }
        } catch (error) {
            toast({
                title: "Unexpected Error",
                description: "An unexpected error occurred. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg border-secondary 
            hover:scale-105 hover:shadow-md cursor-pointer 
            transition-all'
                onClick={() => setOpenDialog(true)}
            >
                <h2 className='font-bold text-lg text-center'>+ Add New </h2>
            </div>
            <Dialog  open={openDialog} onOpenChange={setOpenDialog} >

                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details about your job position/role, Job Description and years of experience</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Job role/Job Position</label>
                                        <Input placeholder="Ex.Full Stack Developer" required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Description/ Tech Stack(In short)</label>
                                        <Textarea placeholder="Ex.React, Angular, etc" required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className='mt-7 my-2'>
                                        <label>Years of experience</label>
                                        <Input placeholder="Ex.5" type="number" max="10" required
                                            onChange={(event) => setJobExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type='button' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type='submit' disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' />Generating From AI
                                            </> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview