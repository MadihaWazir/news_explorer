export function getUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : { name: "User " };
}

export function setUser(user) {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

export function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || {};
}

export function setRegisteredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

export function getSavedArticles() {
  return JSON.parse(localStorage.getItem("savedArticles")) || [];
}

export function saveArticles(article) {
  localStorage.setItem("savedArticles", JSON.stringify(article));
}

export function removeArticle(url) {
  const current = getSavedArticles();
  const updated = current.filter((article) => article.url !== url);
  localStorage.setItem("savedArticles", JSON.stringify(updated));
}
