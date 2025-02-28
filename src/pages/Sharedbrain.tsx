import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

interface Tag {
  _id: string;
  title: string;
}

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  tags?: Tag[];
  userId: string;
  __v: number;
}

interface BrainData {
  username: string;
  content: ContentItem[];
}

export function SharedBrain() {
  const { hash } = useParams();
  const [brainData, setBrainData] = useState<BrainData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrainData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        setBrainData(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching brain: ", err);
        setError(err.response?.data?.message || "Failed to load second brain");
        setLoading(false);
      }
    };

    if (hash) {
      fetchBrainData();
    }
  }, [hash]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  
  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }
  
  if (!brainData) {
    return <div className="container mx-auto p-4">No Data Found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{brainData.username}'s Second Brain</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {brainData.content.map((item) => (
          <Card
            key={item._id}
            title={item.title}
            link={item.link}
            type={item.type}
            tags={item.tags?.map(tag => tag.title)} // Transform tag objects to string array
          />
        ))}
      </div>
    </div>
  );
}