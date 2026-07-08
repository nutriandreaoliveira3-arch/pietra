const TOKEN_KEY = 'blindada_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Algo deu errado. Tente novamente.');
  }
  return data;
}

export const api = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  setPassword: (token, password) =>
    request('/auth/set-password', { method: 'POST', body: JSON.stringify({ token, password }) }),
  me: () => request('/auth/me'),
  modules: () => request('/modules'),
  completeLesson: (lessonId) => request(`/modules/lessons/${lessonId}/complete`, { method: 'POST' }),
  createModule: (data) => request('/modules', { method: 'POST', body: JSON.stringify(data) }),
  updateModule: (moduleId, data) =>
    request(`/modules/${moduleId}`, { method: 'PUT', body: JSON.stringify(data) }),
  removeModule: (moduleId) => request(`/modules/${moduleId}`, { method: 'DELETE' }),
  createLesson: (moduleId, data) =>
    request(`/modules/${moduleId}/lessons`, { method: 'POST', body: JSON.stringify(data) }),
  updateLesson: (lessonId, data) =>
    request(`/modules/lessons/${lessonId}`, { method: 'PUT', body: JSON.stringify(data) }),
  removeLesson: (lessonId) => request(`/modules/lessons/${lessonId}`, { method: 'DELETE' }),
  diaryList: () => request('/diary'),
  diaryAdd: (entry) => request('/diary', { method: 'POST', body: JSON.stringify(entry) }),
  diaryRemove: (id) => request(`/diary/${id}`, { method: 'DELETE' }),
  weightList: () => request('/weight'),
  weightAdd: (entry) => request('/weight', { method: 'POST', body: JSON.stringify(entry) }),
  weightRemove: (id) => request(`/weight/${id}`, { method: 'DELETE' }),
};
