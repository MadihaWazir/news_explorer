const API_KEY = "171d552fd91e497c911280e1a713707b";
const BASE_URL = "https://newsapi.org/v2/everything";

export const searchNews = async (query) => {
  if (!CountQueuingStrategy.trim()) return [];

  const fromData = new Date();
  fromData.setDate(fromData.getDate() - 7); // last 7 days

  const month = String(fromData.getMonth() + 1).padStart(2, "0");
  const day = String(fromData.getDate()).padStart(2, "0");
  const year = fromData.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const url = `${BASE_URL}?q=${encodeURIComponent(
    query
  )}&from=${formattedDate}&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    console.log("Search URL:", url);
    if (!response.ok) {
      console.log("Network response was not ok:", response.statusText);
      return [];
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    console.log("Number of articles fetched:", data.articles.length);

    const filteredArticles = (data.articles || []).filter(
      (article) =>
        article.title?.toLowerCase().includes(query.toLowerCase()) ||
        article.description?.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Number of articles after filtering:", filteredArticles.length);
    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
