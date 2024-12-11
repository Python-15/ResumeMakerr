import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FormSection from '../../component/Formsection';
import PreviewSection from '../../component/PreviewSection';
import { ResumeContext } from '@/context/ResumeInfoContext';
import mockdata from '@/data/dummy';
import './style.css';
import { Skeleton } from '@/components/ui/skeleton';

function Edit() {
    const params = useParams();
    const location = useLocation();
    const [resumeInfo, setResumeInfo] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate data fetching or use setTimeout to mimic asynchronous behavior
        setTimeout(() => {
            const initialData = { ...mockdata, title: location.state?.title || mockdata.title };
            setResumeInfo(initialData);
            setLoading(false); // Data is loaded
        }, 1000); // Simulate a 1 second delay
    }, [params, location.state]);

    // Show a loading message while fetching data
    if (loading) {
        return <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>;
    }

    return (
        <ResumeContext.Provider value={{ resumeInfo, setResumeInfo}}>
            <div className="p-10 h-screen Edit_screen">
                <FormSection />
                <PreviewSection />

            </div>
            
        </ResumeContext.Provider>
    );
}

export default Edit;