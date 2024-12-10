import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeContext } from '@/context/ResumeInfoContext';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'react-router-dom';
import apiServices from '../../../../../apiServices/apiServices';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { chatSession } from '../../../../../apiServices/AiapiService';
import './Experience.css';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: '',
};

function Experience() {
    const [experinceList, setExperinceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [aiGeneratedExperienceList, setAiGeneratedExperienceList] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (resumeInfo?.experience?.length > 0) {
            setExperinceList(resumeInfo.experience);
        }
    }, []); // Run only once when the component mounts

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            experience: experinceList,
        }));
    }, [experinceList, setResumeInfo]);

    const handleChange = (index, event) => {
        const newEntries = [...experinceList];
        const { name, value } = event.target;
        newEntries[index] = {
            ...newEntries[index],
            [name]: value,
        };
        setExperinceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperinceList([...experinceList, { ...formField }]);
    };

    const RemoveExperience = () => {
        setExperinceList(experinceList => experinceList.slice(0, -1));
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                experience: experinceList.map(({ id, ...rest }) => rest),
            },
        };
        apiServices.updatePersonalDetails(params?.resumeId, data).then(
            res => {
                setLoading(false);
                toast('Details updated!');
            },
            error => {
                setLoading(false);
                console.error('Error updating details:', error.response.data);
            }
        );
    };

    const GenerateExperienceFromAI = async () => {
        setLoading(true);
        const PROMPT = `Generate a professional experience based on the job title: ${resumeInfo?.jobTitle}`;
        try {
            const result = await chatSession.sendMessage(PROMPT);
            let responseText = await result.response.text();
            const jsonResponse = JSON.parse(responseText);
            const aiExperienceList = jsonResponse.professionalExperience;
            if (aiExperienceList && aiExperienceList.length > 0) {
                setAiGeneratedExperienceList(aiExperienceList);
                setIsDialogOpen(true);
            } else {
                console.error("AI Experience List is empty or undefined");
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleExperienceSelection = (selectedExperience) => {
        setExperinceList([...experinceList, selectedExperience]);
        setResumeInfo(prev => ({
            ...prev,
            experience: [...experinceList, selectedExperience]
        }));
        setIsDialogOpen(false); // Close the dialog after selection
    };

    return (
        <div>
            <div className='experience_section p-5 shadow-lg rounded-lg border-t-primary border-t-4 border-blue-500 mt-10 '>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>
                <div>
                    {experinceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input
                                        name='title'
                                        onChange={event => handleChange(index, event)}
                                        defaultValue={item?.title}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input
                                        name='companyName'
                                        onChange={event => handleChange(index, event)}
                                        defaultValue={item?.companyName}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input
                                        name='city'
                                        onChange={event => handleChange(index, event)}
                                        defaultValue={item?.city}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input
                                        name='state'
                                        onChange={event => handleChange(index, event)}
                                        defaultValue={item?.state}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                        type='date'
                                        name='startDate'
                                        onChange={event => handleChange(index, event)}
                                        defaultValue={item?.startDate}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                        type='date'
                                        name='endDate'
                                        onChange={event => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <label className='text-xs'>Work Summary</label>
                                    <Textarea
                                        name='workSummery'
                                        onChange={event => handleChange(index, event)}
                                        defaultValue={item?.workSummery}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant='outline' onClick={AddNewExperience} className='text-primary'>
                            + Add More Experience
                        </Button>
                        <Button variant='outline' onClick={RemoveExperience} className='text-primary'>
                            - Remove
                        </Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
                <div className='mt-3 pt-2'>
                    <Button size='sm' type='button' onClick={GenerateExperienceFromAI} variant="outline">
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Generate with AI'}
                    </Button>
                </div>
            </div>
            {/* Dialog for displaying AI-generated experiences */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="dialouge_box sm:max-w-[600px] mt-6 ">
                    <DialogHeader>
                        <DialogTitle>Select an Experience</DialogTitle>
                        <DialogDescription>
                            Choose one of the AI-generated experiences that best fits your profile.
                        </DialogDescription>
                    </DialogHeader>
                    {/* Container with scrolling */}
                    <div 
                        className="grid gap-4 py-4"
                        style={{
                            maxHeight: '400px',  // Adjust the height to your preference
                            overflowY: 'auto',   // Enables vertical scrolling when content overflows
                        }}
                    >
                        {aiGeneratedExperienceList && aiGeneratedExperienceList.length > 0 && 
    aiGeneratedExperienceList.map((item, index) => (
        <div key={index} onClick={() => handleExperienceSelection(item)}>
            <h3>{item.title}</h3>
            <p>{item.company}</p>
            <p>{item.years}</p>
            <p>{item.description}</p>
            <ul>
                {item.achievements?.length > 0 ? (
                    item.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                    ))
                ) : (
                    <li>No achievements listed.</li>
                )}
            </ul>
        </div>
    ))
}

                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsDialogOpen(false)} variant="ghost">Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Experience;