import axios from "axios";
import { Removeicon } from "../icons/Removeicon";
import { ShareIcon } from "../icons/Shareicon";
import { BACKEND_URL } from "../config";
import { useState } from "react";



interface CardProps {
    title : string;
    link : string;
    type : "twitter" | "youtube";
    tags?: string[];
    contentId : string;
}



export function Card({title , link ,type , tags , contentId} : CardProps ) {
  
  const [deleting , setIsDeleting ] = useState(false);
    function getYouTubeEmbedUrl(url:string) {
        // Handle different YouTube URL formats
        let videoId = '';
        
        // Regular youtube.com/watch?v= format
        const watchRegex = /youtube\.com\/watch\?v=([^&]+)/;
        // Short youtu.be/ format
        const shortRegex = /youtu\.be\/([^?&]+)/;
        // Embed format (already properly formatted)
        const embedRegex = /youtube\.com\/embed\/([^?&]+)/;
        
        let match = url.match(watchRegex) || url.match(shortRegex) || url.match(embedRegex);
        
        if (match && match[1]) {
          videoId = match[1];
          return `https://www.youtube.com/embed/${videoId}`;
        }
        
        // If no match found, return the original URL (fallback)
        return url;
      }

    return <div> 
        <div className= "relative p-8 bg-white rounded-md  border border-gray-200 min-h-0 w-96">
             <div className="flex justify-between">
                <div className="flex items-center justify-center text-md">
                    <div className="text-gray-500 pr-2">
                        <a href = {link} target="blank"><ShareIcon /></a>
                    </div>
                    <div>{title}</div>  
                    <div onClick={() => {
                      setIsDeleting(true);
                      axios.delete(`${BACKEND_URL}/api/v1/content` , {
                        data : {
                          contentId : contentId
                        },
                        headers : {
                          Authorization : localStorage.getItem("token")
                        }
                      })
                      .then( () => {
                        setIsDeleting(false);
                      } 
                      )
                      .catch((error) => {
                        console.error("error deleting: ",error)
                        setIsDeleting(false);
                      })
                     
                    }} className="text-gray-500 justify-self-end absolute top-8 right-4 cursor-pointer text-xl" > {deleting == true ? "DELETING---" : <Removeicon /> }  </div>
                </div>
                
             </div>

            <div>
                <div className="pt-4">


                { type == "youtube" && 
  <iframe 
    className="w-full" 
    src={getYouTubeEmbedUrl(link)}
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerPolicy="strict-origin-when-cross-origin" 
    allowFullScreen>
  </iframe> 
}
              {
                type == "twitter" && <blockquote className="twitter-tweet"> <a href={link.replace("x.com" , "twitter.com")}>
                February 20, 2025</a></blockquote> 
              }
                </div>
               
        
            </div>
            <div className="flex flex-wrap gap-2 mt-2 text-green-950">
                <h1 className="text-blue-950">Related Tags:</h1>
                {tags?.map((tag) => <div>{tag}</div> )}
            </div>

            </div>
    </div>
}