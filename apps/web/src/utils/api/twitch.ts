import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const twitch = {
  clipDirectUrl: async (url: string): Promise<{ direct_url: string }> => {
    const response = await axios.post(`${API_BASE_URL}/twitch/clip`, { clip_url: url })
    return response.data
  },
}
