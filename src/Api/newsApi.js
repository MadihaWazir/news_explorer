const API_KEY = "171d552fd91e497c911280e1a713707b";
const BASE_URL = "https://newsapi.org/v2/everything";

export const searchNews = async (query) => {
  if (!query.trim()) return [];

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7); // last 7 days

  const month = String(fromDate.getMonth() + 1).padStart(2, "0");
  const day = String(fromDate.getDate()).padStart(2, "0");
  const year = fromDate.getFullYear();
  const from = `${year}-${month}-${day}`;

  const url = `${BASE_URL}?q=${encodeURIComponent(
    query
  )}&from=${from}&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log("Network response was not ok:", response.statusText);
      return [];
    }

    const data = await response.json();

    const filteredArticles = (data.articles || []).filter(
      (article) =>
        article.title?.toLowerCase().includes(query.toLowerCase()) ||
        article.description?.toLowerCase().includes(query.toLowerCase())
    );

    return filteredArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
