const newsApiBaseUrl = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const searchNews = async (query) => {
  if (!query.trim()) return [];

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7); // last 7 days

  const month = String(fromDate.getMonth() + 1).padStart(2, "0");
  const day = String(fromDate.getDate()).padStart(2, "0");
  const year = fromDate.getFullYear();
  const from = `${year}-${month}-${day}`;

  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
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
