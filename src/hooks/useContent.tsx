import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Define the ContentItem type
interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  tags?: { _id: string; title: string }[];
}

export function useContent() {
  // Explicitly type state as an array of ContentItem
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, authentication issue!");
      setError("401: Unauthorized Access ,Authentication required");
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get<{ content: ContentItem[] }>(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setContents(response.data.content);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
        setError(error.message || "Failed to fetch content");
        setContents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refresh();

    const interval = setInterval(() => {
      refresh();
    }, 2 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, loading, error, refresh };
}
