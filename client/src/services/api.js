const API_BASE = '/api';

const getHeaders = (withAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (withAuth) {
    const token = localStorage.getItem('bt_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Auth
  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return await res.json();
  },

  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    return await res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(true),
    });
    return await res.json();
  },

  // Members Management
  async getMembers() {
    const res = await fetch(`${API_BASE}/members`, {
      headers: getHeaders(true),
    });
    return await res.json();
  },

  async updateMemberStatus(id, status) {
    const res = await fetch(`${API_BASE}/members/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  async updateMemberPlan(id, planData) {
    const res = await fetch(`${API_BASE}/members/${id}/plan`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(planData),
    });
    return await res.json();
  },

  async updateWorkoutStats(id, workoutStats) {
    const res = await fetch(`${API_BASE}/members/${id}/workout-stats`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(workoutStats),
    });
    return await res.json();
  },

  async updateTraineeNote(id, coachNotes) {
    const res = await fetch(`${API_BASE}/members/${id}/coach-note`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ coachNotes }),
    });
    return await res.json();
  },

  async getStats() {
    const res = await fetch(`${API_BASE}/members/stats`);
    return await res.json();
  },

  // Contact
  async submitContact(data) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async getContacts() {
    const res = await fetch(`${API_BASE}/contact`, {
      headers: getHeaders(true),
    });
    return await res.json();
  },

  // Exercises
  async getExercises(params = {}) {
    const query = new URLSearchParams();
    if (params.q) query.append('q', params.q);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.muscle && params.muscle !== 'All') query.append('muscle', params.muscle);
    if (params.difficulty && params.difficulty !== 'All') query.append('difficulty', params.difficulty);

    const queryString = query.toString();
    const url = `${API_BASE}/exercises${queryString ? `?${queryString}` : ''}`;
    const res = await fetch(url);
    return await res.json();
  },

  async getExerciseById(id) {
    const res = await fetch(`${API_BASE}/exercises/${id}`);
    return await res.json();
  },

  async getExerciseFilters() {
    const res = await fetch(`${API_BASE}/exercises/meta/filters`);
    return await res.json();
  },
};

