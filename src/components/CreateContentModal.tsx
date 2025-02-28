import axios from "axios";
import { CrossIcon } from "../icons/Crossicon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = 'youtube',
  Twitter = 'twitter'
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose}: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addContent() {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      const title = titleRef.current?.value;
      const link = linkRef.current?.value;
      
      // Validate inputs
      if (!title || !link) {
        alert("Please provide both title and link");
        return;
      }
      
      // Add empty tags array or default tags
      const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
        link,
        title,
        type,
        tags: tags 
      }, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });
      
      console.log("Content added successfully:", response.data);
      
      // Reset form
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setTags([]);
    } catch (error: any) {
      console.error("Error adding content:", error);
      alert(error.response?.data?.message || "Failed to add content");
    } finally {
      setIsSubmitting(false);
      onClose()
    }
  }

  function addTags() {
    const tag = tagRef.current?.value?.trim();
    if(tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      if(tagRef.current) {
        tagRef.current.value = "";
      }
    }
  }

  // Function to remove a tag
  const removetag = (tagtoRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagtoRemove));
  }

  // Safe render with error boundary
  try {
    return (
      <div>
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-fit max-w-md mx-auto"> 
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer"><CrossIcon /></div>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <Input reference={titleRef} placeholder="Title" />
                <Input reference={linkRef} placeholder="Link" />
              </div>
              <h1 className="flex justify-center mt-4">Tags</h1>
              <div className="flex flex-col justify-center items-center mb-2 gap-2">
                <Input placeholder="Add Tags --" reference={tagRef} />
                <Button onClick={addTags} variant="primary" text="Add Tag" />
              </div>
              <div className="flex flex-wrap max-w-full overflow-auto"> 
                {tags.map((tag, index) => (
                  <div key={index} className="flex flex-col items-center mr-2 mb-3">
                    {tag}
                    <Button 
                      variant="primary" 
                      text="Remove" 
                      onClick={() => removetag(tag)}
                    />
                  </div>
                ))}
              </div>
              <h1 className="flex justify-center mt-4">Type</h1>
              <div className="flex justify-center gap-1 p-4">
                <Button 
                  text="Youtube" 
                  variant={type === ContentType.Youtube ? "primary" : "secondary"} 
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button 
                  text="Twitter" 
                  variant={type === ContentType.Twitter ? "primary" : "secondary"} 
                  onClick={() => setType(ContentType.Twitter)}
                />
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={addContent} 
                  variant="primary" 
                  text={isSubmitting ? "Submitting..." : "Submit"} 
                  loading={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (e) {
    console.error("Render error in modal:", e);
    return null;
  }
}