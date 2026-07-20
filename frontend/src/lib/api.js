import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    if (error.response?.status === 401 && !request?._retry && !request.url?.includes("/auth/refresh-token")) {
      request._retry = true
      try {
        await api.post("/auth/refresh-token")
        return api(request)
      } catch {
        // The calling page handles an expired session.
      }
    }
    return Promise.reject(error)
  },
)

export const authApi = {
  login: (payload) => api.post("/auth/login", payload),
  register: (payload) => api.post("/auth/register", payload),
  profile: () => api.get("/auth/profile"),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh-token"),
}

export const messageApi = {
  conversations: () => api.get("/messages/conversations"),
  messages: (userId) => api.get(`/messages/${userId}`),
  send: (userId, message) => api.post(`/messages/send/${userId}`, { message }),
}

export const userApi = { list: () => api.get("/users") }
export const itemApi = { list: () => api.get("/items"), create: (payload) => api.post("/items", payload) }

export default api
