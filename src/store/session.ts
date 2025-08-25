import { defineStore } from 'pinia'
import axios from "axios";


axios.defaults.xsrfCookieName = 'session:'
axios.defaults.withCredentials = true;

export const useSessionStore = defineStore('session', {
    state: () => ({
        session: false,
    }),
    actions: {
        async postUsersession(data: any) {
            try {
                await axios.post("http://127.0.0.1:5000/session", data, {withCredentials: true});
            }catch (error) {
                console.log(error)
            }
        },
        async DeleteUsersession() {
            try {
                await axios.post("http://127.0.0.1:5000/user/session", 'delete', {withCredentials: true});
                this.session = false;
            } catch (error) {
                this.session = true;
                console.log(error)
            }
        },
        async getSession() {
            try {
                await axios.get("http://127.0.0.1:5000/user/session", {withCredentials: true});
                this.session = true;
            } catch (error) {
                console.log(error)
            }
        },
    }
})