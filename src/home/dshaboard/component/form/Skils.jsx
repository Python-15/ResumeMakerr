import React, { useEffect, useState, useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResumeContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';

import './Skills.css';

function Skils() {
  const [skils, setSkilss] = useState([{ name: '' }]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.skills) {
      setSkilss(resumeInfo.skills);
    }
  }, [resumeInfo.skills]);

  const handleInputChange = (index, e) => {
    const newSkils = [...skils];
    newSkils[index].name = e.target.value;
    setSkilss(newSkils);
    setResumeInfo({
      ...resumeInfo,
      skills: newSkils,
    });
  };

  const AddNewSkilss = () => {
    setSkilss([...skils, { name: '' }]);
  };

  const RemoveSkills = () => {
    setSkilss(skils.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    // Add your save logic here
    setLoading(false);
  };

  return (
    <div className=' skills-section shadow-lg rounded-lg border-t-primary border-t-4 mt-10 '>
      <div>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add Your Skills</p>
        {skils.map((skill, index) => (
          <Input className='text-black dark:text-white mb-2'
            key={index}
            type="text"
            placeholder="Enter Your Skill"
            value={skill.name}
            onChange={(e) => handleInputChange(index, e)}
          />
        ))}
      </div>
      <div className='all_buttons flex justify-between'>
        <div className='flex gap-3'>
          <Button variant='outline' onClick={AddNewSkilss} className='text-primary'>
            + Add More Skills
          </Button>
          <Button variant='outline' onClick={RemoveSkills} className='text-primary'>
            - Remove
          </Button>
        
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
        </div>
      </div>
    </div>
  );
}

export default Skils;