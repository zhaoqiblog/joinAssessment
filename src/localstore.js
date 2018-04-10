
export function getNews() {
  return JSON.parse(localStorage.getItem('news') || '[]')
}

export function setNews(data) {
  return localStorage.setItem('news', JSON.stringify(data))
}
