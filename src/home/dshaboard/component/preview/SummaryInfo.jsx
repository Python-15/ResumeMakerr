import React from 'react';

function SummaryInfo({ resumeInfo }) {
  return (
    <div>
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Summary
      </h2>
      <p className="text-xs">
        {resumeInfo?.summery}
      </p>
    </div>
  );
}

export default SummaryInfo;
