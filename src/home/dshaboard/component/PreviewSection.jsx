import React, { useContext } from 'react';
import { ResumeContext } from '@/context/ResumeInfoContext';
import PersonalInformation from './preview/PersonalInformation';
import SummaryInfo from './preview/SummaryInfo';
import ExperienceInfo from './preview/ExperienceInfo';
import EducationalPreview from './preview/EducationPreview';
import SkillsPreview from './preview/Skills';
import './PreviewSection.css'

function PreviewSection() {
  const { resumeInfo } = useContext(ResumeContext);

  return (
    <div className="preview-section w-full max-w-[800px] mx-auto p-8 bg-white  rounded-lg"
    id='preview-section'>
      {/* Personal Information */}
      <div className="pb-4 mb-4">
        <PersonalInformation resumeInfo={resumeInfo} />
      </div>
      
      {/* Summary */}
      <div className=" pb-4 mb-4">
        <SummaryInfo resumeInfo={resumeInfo} />
      </div>

      {/* Experience */}
      <div className="pb-4">
        <ExperienceInfo resumeInfo={resumeInfo} />
      </div>
      <div className="pb-4">
      <EducationalPreview resumeInfo={resumeInfo}/>
      </div>
      <div className="pb-4">
      <SkillsPreview resumeInfo={resumeInfo}/>
      </div>
    </div>
  );
}

export default PreviewSection;
