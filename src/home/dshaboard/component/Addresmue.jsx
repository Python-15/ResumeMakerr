import { Loader2, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import apiServices from '../../../../apiServices/apiServices';

function Addresmue() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userName, setUserName] = useState('');
    const [resumeTitle, setResumeTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const user = useUser();
    const navigate = useNavigate();

    const email = user.user.primaryEmailAddress.emailAddress;

    const onSave = async () => {
        setIsCreating(true);  // Set loader to active
        const data = {
            data: {
                Name: userName,
                resumeid: uuidv4(),
                userEmail: email,
                title: resumeTitle
            }
        };

        try {
            const resp = await apiServices.createResume(data);

            if (resp) {
                setIsCreating(false);
                navigate(`/dashboard/resume/${resp.data.data.documentId}/edit`, { state: { title: resumeTitle } });
            }
        } catch (error) {
            console.error('Error creating resume:', error);
            // Navigate to the edit page with a fallback documentId
            navigate(`/dashboard/resume/fallback-document-id/edit`, { state: { title: resumeTitle } });
            setIsCreating(false);
        }
    };

    const handleChange = (e) => {
        setUserName(e.target.value);
    };
    const handleTitleChange = (e) => {
        setResumeTitle(e.target.value);
    };

    return (
        <>
            <div
                className='p-14 py-24 border 
                items-center flex 
                justify-center bg-secondary
                rounded-lg h-[250px]
                hover:scale-105 transition-all hover:shadow-md
                cursor-pointer border-dashed'
                onClick={() => setOpenDialog(true)}
            >
                <PlusIcon />
            </div>

            <Dialog open={openDialog} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Your Resume</DialogTitle>
                        <DialogDescription>
                            Enter Your Name
                        </DialogDescription>
                        <Input 
                            type='text'
                            placeholder="EX: Aaditya"
                            onChange={handleChange}
                        />
                        <DialogDescription>
                            Add your Resume Title
                        </DialogDescription>
                        <Input
                            id="Title"
                            type="text"
                            placeholder="Title"
                            className="col-span-3"
                            onChange={handleTitleChange}
                        />
                        <DialogFooter>
                            <div className="flex flex-col sm:flex-row sm:gap-8 md:gap-[2rem]">
                                <Button onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                                <Button disabled={!userName && !resumeTitle || isCreating} onClick={onSave}>
                                    {isCreating ? <Loader2 className="animate-spin" /> : 'Start'}
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Addresmue;