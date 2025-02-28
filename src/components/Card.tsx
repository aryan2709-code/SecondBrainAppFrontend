import { ShareIcon } from "../icons/Shareicon";

interface CardProps {
    title : string;
    link : string;
    type : "twitter" | "youtube";
    tags?: string[];
}

export function Card({title , link ,type , tags} : CardProps ) {
    return <div> 
        <div className= "p-8 bg-white rounded-md  border border-gray-200 min-h-0 w-96">
             <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <a href = {link} target="blank"><ShareIcon /></a>
                    </div>
                    {title}
                </div>
                
             </div>

            <div>
                <div className="pt-4">


             { type == "youtube" &&  <iframe className="w-full" src = {link.replace("watch" , "embed").replace("?v=" , "/")}
             title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
              gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

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