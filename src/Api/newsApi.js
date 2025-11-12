const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export const searchNews = async (query) => {
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  if (!API_KEY || API_KEY.trim() === "" || API_KEY === "YOUR_NEWS_API_KEY") {
    console.error("Invalid API key");
    return [];
  }

  console.log("API Key is present.");
  const url = `${newsApiBaseUrl}?q=${query}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    console.log("Fetch response received.");

    if (!response.ok) {
      console.error("Network response was not ok:", response.statusText);
      console.error(`HTTP error! Status: ${response.status}`);

      try {
        const errorData = await response.json();
        if (errorData.message) {
          console.error("Error message from API:", errorData.message);
        }
      } catch (jsonError) {
        console.error("Error parsing error response JSON:", jsonError);
      }
      return [];
    }

    const data = await response.json();

    return data.articles || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
