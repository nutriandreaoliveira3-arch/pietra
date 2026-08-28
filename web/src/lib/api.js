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
  reorderModule: (moduleId, direction) =>
    request(`/modules/${moduleId}/reorder`, { method: 'POST', body: JSON.stringify({ direction }) }),
  createLesson: (moduleId, data) =>
    request(`/modules/${moduleId}/lessons`, { method: 'POST', body: JSON.stringify(data) }),
  updateLesson: (lessonId, data) =>
    request(`/modules/lessons/${lessonId}`, { method: 'PUT', body: JSON.stringify(data) }),
  removeLesson: (lessonId) => request(`/modules/lessons/${lessonId}`, { method: 'DELETE' }),
  reorderLesson: (lessonId, direction) =>
    request(`/modules/lessons/${lessonId}/reorder`, { method: 'POST', body: JSON.stringify({ direction }) }),
  products: () => request('/modules/products'),
  adminUsers: () => request('/admin/users'),
  adminCreateUser: (data) => request('/admin/users', { method: 'POST', body: JSON.stringify(data) }),
  adminRevokeUser: (userId) => request(`/admin/users/${userId}/revoke`, { method: 'POST' }),
  adminReactivateUser: (userId) => request(`/admin/users/${userId}/reactivate`, { method: 'POST' }),
  adminGrantProduct: (userId, productId) =>
    request(`/admin/users/${userId}/products/${productId}`, { method: 'POST' }),
  adminRevokeProduct: (userId, productId) =>
    request(`/admin/users/${userId}/products/${productId}`, { method: 'DELETE' }),
  adminGrantModule: (userId, moduleId) =>
    request(`/admin/users/${userId}/modules/${moduleId}`, { method: 'POST' }),
  adminRevokeModule: (userId, moduleId) =>
    request(`/admin/users/${userId}/modules/${moduleId}`, { method: 'DELETE' }),
  diaryList: () => request('/diary'),
  diaryAdd: (entry) => request('/diary', { method: 'POST', body: JSON.stringify(entry) }),
  diaryRemove: (id) => request(`/diary/${id}`, { method: 'DELETE' }),
  weightList: () => request('/weight'),
  weightAdd: (entry) => request('/weight', { method: 'POST', body: JSON.stringify(entry) }),
  weightRemove: (id) => request(`/weight/${id}`, { method: 'DELETE' }),
  mealPlan: () => request('/meal-plan'),
  adminGetMealPlan: (userId) => request(`/admin/users/${userId}/meal-plan`),
  adminSetMealPlan: (userId, content) =>
    request(`/admin/users/${userId}/meal-plan`, { method: 'PUT', body: JSON.stringify({ content }) }),
  supplements: () => request('/supplements'),
  adminGetSupplements: (userId) => request(`/admin/users/${userId}/supplements`),
  adminSetSupplements: (userId, content) =>
    request(`/admin/users/${userId}/supplements`, { method: 'PUT', body: JSON.stringify({ content }) }),
  waterList: () => request('/water'),
  waterAdd: (entry) => request('/water', { method: 'POST', body: JSON.stringify(entry) }),
  waterRemove: (id) => request(`/water/${id}`, { method: 'DELETE' }),
  waterSetGoal: (goal_ml) => request('/water/goal', { method: 'PUT', body: JSON.stringify({ goal_ml }) }),
  adminClientTracking: (userId) => request(`/admin/users/${userId}/tracking`),
};
