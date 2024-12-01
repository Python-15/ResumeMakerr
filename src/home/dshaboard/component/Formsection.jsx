import React, { useState } from 'react';
import PersonalDetail from './form/PersonalDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SummaryDetails from './form/SummaryDetails';
import Experience from './form/Experience';
import Education from './form/Educational';
import Skils from './form/Skils';
import html2pdf from 'html2pdf.js';

function Formsection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);

  const handleDownload = () => {
    const element = document.getElementById('preview-section');

    html2pdf(element, {
      margin: [0.5, 0.5, 0.5, 0.5], // Adjust margins as needed
      filename: 'resume.pdf',
      html2canvas: {
        scale: 2,
        backgroundColor: '#ffffff', // Ensure background is white
        logging: true, // Enable logging for debugging
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait',
      },
    });
  };

  return (
    <div>
      {/* Personal details */}
      <div className='flex gap-2 text-black dark:text-white'>
        {activeFormIndex > 1 && (
          <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
            <ArrowLeft />
          </Button>
        )}
        {activeFormIndex < 5 && (
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        )}
        {activeFormIndex === 5 && <Button onClick={handleDownload}>Download</Button>}
      </div>

      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <SummaryDetails enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 4 ? (
        <Education />
      ) : activeFormIndex === 5 ? (
        <Skils />
      ) : null}
    </div>
  );
}

export default Formsection;