import { useContent } from "../hooks/useContent";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/Plusicon";
import { ShareIcon } from "../icons/Shareicon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export function Dashboard() {
  const { contents, loading, error , refresh } = useContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [itemsType , setItemsType] = useState("all");
  
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  } , [modalOpen])

  return (
    <div> 
      { error &&
      <div className="flex flex-col justify-center items-center bg-black w-screen h-screen">  
       <div  className="text-red-500 text-center text-2xl ">{error}</div>
      <div className="fixed bottom-64">
        <Button variant="primary" text="Go Back To The Landing Page " onClick={() => {navigate("/")}} />
      </div>
      </div> }
      
   

{!error && <div className="flex">
     {/* Sidebar */}
     <Sidebar setItemsType = {setItemsType}/>

     {/* Main Content */}
     <div className="flex-1 p-8 ml-72">
       
       {/* Header Section: Dashboard Title + Buttons */}
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold">Dashboard</h1>
         <div className="flex gap-2">
           <Button onClick={() => {setModalOpen(true)}} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
           <Button onClick={ async() => {
             const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share` , {
               share : true
             } , {
               headers : {
                 "Authorization" : localStorage.getItem("token")
               }
             } );
             const shareurl:string = `http://localhost:5173/share/${response.data.hash}`
             // Copying to clipboard functionality
             navigator.clipboard.writeText(shareurl)
             .then(() => {
              alert("Link Copied to Clipboard: " + shareurl)
             })
             .catch(err => {
              console.error("Failed to Copy: " + err);
              alert("Shareable Link: " + shareurl)
             })
             
           } }   variant="secondary" text="Share" startIcon={<ShareIcon />} />
         </div>
       </div>

       {/* Error & Loading States */}
       
       {!loading && !error && contents.length === 0 && <p>No content available.</p>}

       {/* Create Content Modal */}
       <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

       {/* Grid Layout for Cards with Proper Spacing if itemsType is all */}
       {itemsType == "all" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
         {contents.map((content) => (
           <Card
             contentId= {content._id}
             key={content._id}
             title={content.title}
             link={content.link}
             type={content.type}
             tags={content.tags?.map((tag) => tag.title)}
           />
         ))}
       </div> }

       {itemsType == "youtube" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
         {contents
 .filter((content) => content.type === "youtube") // Filtering for YouTube type
 .map((content) => (
   <Card
   contentId= {content._id}
     key={content._id}
     title={content.title}
     link={content.link}
     type={content.type}
     tags={content.tags?.map((tag) => tag.title)}
   />
 ))}
       </div> }

       {itemsType == "twitter" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
         {contents
 .filter((content) => content.type === "twitter") // Filtering for YouTube type
 .map((content) => (
   <Card
   contentId= {content._id}
     key={content._id}
     title={content.title}
     link={content.link}
     type={content.type}
     tags={content.tags?.map((tag) => tag.title)}
   />
 ))}
       </div> }

     </div>
   </div> }

   
      
    </div>
  );
}
