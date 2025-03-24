// "use client"

// import { fetchMockInterview } from '@/lib/actions/interview.actions';
// import { useUser } from '@clerk/nextjs';
// import React, { useEffect, useState } from 'react'
// import InterviewItemCard from './InterviewItemCard';

// function InterviewList() {
//     const { user } = useUser();
//     const [interviewList, setInterviewList] = useState([]);
//     useEffect(() => {
//         user && GetInterviewList();
//     }, [user])
//     const GetInterviewList = async () => {
//         try {
//             const createdBy = user?.primaryEmailAddress?.emailAddress;
//             if (!createdBy) {
//                 console.error("User email not found");
//                 return;
//             }

//             const result = await fetchMockInterview(createdBy);
//             if (result) {
//                 const parsedResult = JSON.parse(result);
//                 setInterviewList(parsedResult);
//             } else {
//                 console.error("No interviews found for the user");
//             }
//         } catch (error: any) {
//             console.error("Error fetching interview list: ", error.message);
//         }
//     };
//     return (
//         <div>
//             <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
//                 {interviewList && interviewList.map((interview, index) => (
//                     <InterviewItemCard
//                         interview={interview}
//                         key={index} />
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default InterviewList