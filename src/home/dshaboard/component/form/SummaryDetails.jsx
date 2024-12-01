import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeContext } from '@/context/ResumeInfoContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiServices from '../../../../../apiServices/apiServices';
import { LoaderCircle } from 'lucide-react';
import { chatSession } from '../../../../../apiServices/aiAPIservice';
import './PersonalDetails.css'; 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
   
  } from "@/components/ui/dialog"
import { DialogOverlay } from '@radix-ui/react-dialog';

const Prompt = "Job Title: {jobTitle}, Summary: {summery}, Depends on job title and summary give me list of summary for 3 experience levels, Mid Level and Fresher level in 3-4 lines in array format, With summary and experience_level Field in JSON Format";

const SummaryDetails = ({ enabledNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeContext);
    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState([]);
  

  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

    const params = useParams();

    useEffect(() => {
        if (summery) {
            setResumeInfo({
                ...resumeInfo,
                summery: summery
            });
        }
    }, [summery]);

    // const GenerateSummeryFromAI = async () => {

    //     setLoading(true);
    //     const PROMPT = Prompt.replace('{jobTitle}', resumeInfo?.jobTitle).replace('{summery}', summery);
    //     console.log(PROMPT);
    
    //     try {
    //         const result = await chatSession.sendMessage(PROMPT);
    //         let responseText = await result.response.text();
    
    //         // Log the raw response for debugging
    //         console.log("Raw response text:", responseText);
    
    //         // Try to extract JSON part only
    //         const jsonStart = responseText.indexOf('[');
    //         const jsonEnd = responseText.lastIndexOf(']');
    //         if (jsonStart !== -1 && jsonEnd !== -1) {
    //             const jsonResponse = responseText.slice(jsonStart, jsonEnd + 1);
    //             const aiSummaryList = JSON.parse(jsonResponse);
    //               // Log the list to verify it
    //             setAiGeneratedSummeryList(aiSummaryList);
    //             console.log("AI Summary List:", aiGeneratedSummeryList);
                
    //             setIsDialogOpen(true)
    //         } else {
    //             console.error("No JSON array found in response:", responseText);
    //         }
    //     } catch (error) {
    //         console.error("Error parsing JSON:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    //     const GenerateSummeryFromAI = async () => {
    //       if (!summery) {
    //           console.error("Summary is undefined");
    //           return;
    //       }
      
    //       setLoading(true);
    //       const PROMPT = Prompt.replace('{jobTitle}', resumeInfo?.jobTitle).replace('{summery}', summery);
    //       console.log(PROMPT);
      
    //       try {
    //           const result = await chatSession.sendMessage(PROMPT);
    //           let responseText = await result.response.text();
      
    //           // Log the raw response for debugging
    //           console.log("Raw response text:", responseText);
      
    //           // Try to extract JSON part only
    //           const jsonStart = responseText.indexOf('[');
    //           const jsonEnd = responseText.lastIndexOf(']');
    //           if (jsonStart !== -1 && jsonEnd !== -1) {
    //               const jsonResponse = responseText.slice(jsonStart, jsonEnd + 1);
    //               const aiSummaryList = JSON.parse(jsonResponse);
    //               // Log the list to verify it
    //               setAiGeneratedSummeryList(aiSummaryList);
    //               console.log("AI Summary List:", aiGeneratedSummeryList);
      
    //               setIsDialogOpen(true);
    //           } else {
    //               console.error("No JSON array found in response:", responseText);
    //           }
    //       } catch (error) {
    //           console.error("Error parsing JSON:", error);
    //       } finally {
    //           setLoading(false);
    //       }
    //   };
    // }
    const GenerateSummeryFromAI = async () => {
    
  
      setLoading(true);
      const PROMPT = Prompt.replace('{jobTitle}', resumeInfo?.jobTitle).replace('{summery}', summery);

  
      try {
          const result = await chatSession.sendMessage(PROMPT);
          let responseText = await result.response.text();
  
          // Log the raw response for debugging

  
          // Try to extract JSON part only
          const jsonStart = responseText.indexOf('[');
          const jsonEnd = responseText.lastIndexOf(']');
          if (jsonStart !== -1 && jsonEnd !== -1) {
              const jsonResponse = responseText.slice(jsonStart, jsonEnd + 1);
              const aiSummaryList = JSON.parse(jsonResponse);
              // Log the list to verify it
              setAiGeneratedSummeryList(aiSummaryList);

  
              setIsDialogOpen(true);
          } else {
              console.error("No JSON array found in response:", responseText);
          }
      } catch (error) {
          console.error("Error parsing JSON:", error);
      } finally {
          setLoading(false);
      }
  };
    
    
    const handleSummarySelection = (selectedSummary) => {
        setSummery(selectedSummary);
        setResumeInfo({ ...resumeInfo, summary: selectedSummary });
        setIsDialogOpen(false); // Close the dialog after selection
    };
    

    
    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: {
                summery: summery
            }
        };
        apiServices.updatePersonalDetails(params?.resumeId, data).then(resp => {

            enabledNext(true);
            setLoading(false);
            toast("Details updated");
        }, (error) => {
            setLoading(false);
        });
    };

    return (
        <>
            <form onSubmit={onSave}>
                <div className='summary_details shadow-lg rounded-lg border-t-primary border-t-4 border-blue-500 mt-10'>
                    <h2 className='font-bold text-lg mt-10'>Professional Summary</h2>
                    <p>Add your Professional Summary</p>
                    
                    {/* Textarea for user input */}
                    <div className='mt-2'>
                        <Textarea
                            placeholder="Type your message here."
                            value={summery}
                            defaultValue={summery || resumeInfo?.summery}
                            onChange={(e) => setSummery(e.target.value)}
                        />
                    </div>
                    
                    {/* Button to generate summaries with AI */}
                    <div className='mt-3 pt-2'>
                        <Button size='sm' type='button' onClick={GenerateSummeryFromAI} variant="outline">
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Add with AI'}
                        </Button>
                    </div>

                    {/* Save button */}
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </div>
            </form>

            
         
     {/* Dialog for displaying AI-generated summaries */}
     <div className=''>

    
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent className="dialouge_box sm:max-w-[600px] mt-6 ">
    <DialogHeader>
      <DialogTitle>Select a Summary</DialogTitle>
      <DialogDescription>
        Choose one of the AI-generated summaries that best fits your profile.
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
      {aiGeneratedSummeryList.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
         
          <div className="mt-2">
           <input 
           type="radio"
            onClick={() => handleSummarySelection(item.summary)}
           />
             
           <strong>{item.experience_level}</strong>: 
            {/* Split summary into multiple paragraphs */}
            {item.summary.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className="mb-2">
                {paragraph}
              </p>
            ))}
          </div>
         
        </div>
      ))}
    </div>

    <DialogFooter>
      <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
        Cancel
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>


</div>

    </>
  );
};

export default SummaryDetails;