import Header from '@/components/layout/Header'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div className='mx-5 md:mx-20 lg:mx-36'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout