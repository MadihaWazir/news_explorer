export function getUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : { name: "User " };
}

export function setUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getSavedArticles() {
  const data = localStorage.getItem("savedArticles");
  return data ? JSON.parse(data) : [];
}

export function saveArticles(article) {
  const current = getSavedArticles();
  const updated = [...current, article];
  localStorage.setItem("savedArticles", JSON.stringify(updated));
}

export function removeArticle(url) {
  const current = getSavedArticles();
  const updated = current.filter((article) => article.url !== url);
  localStorage.setItem("savedArticles", JSON.stringify(updated));
}
