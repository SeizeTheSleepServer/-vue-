import { defineStore } from 'pinia'
import axios from "axios";


axios.defaults.xsrfCookieName = 'session:'
axios.defaults.withCredentials = true;
export const useResumeStore = defineStore('resume', {
  state: () => ({
    resume_data: {},
  }),
  actions: {
    async getResumeData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/resumes/date',{withCredentials: true})
        this.resume_data = response.data
        console.log(this.resume_data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateResume(data:object) {
      try {
        await axios.post('http://127.0.0.1:5000/resumes/date',data, {withCredentials: true})
      } catch (error) {
        console.log(error)
        }
    }
  }
})
