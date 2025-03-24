import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import PageWrapper from '@/components/common/PageWrapper'
import Header from '@/components/layout/Header'


function CrackInterview() {
    return (
        <PageWrapper>
            <Header />
            <div className='p-10'>
                <div className="my-10 !mb-0 mx-10 md:mx-20 lg:mx-36">
                    <h2 className="text-center text-2xl font-bold">
                        Your Mock Interview Dashboard
                    </h2>
                    <p className="text-center text-gray-600">
                        Create and Start your AI Mockup Inteview
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
                    <AddNewInterview />
                </div>
            </div>
            <InterviewList />
        </PageWrapper>
    )
}

export default CrackInterview