import { defineStore } from 'pinia'
import axios from "axios";


axios.defaults.xsrfCookieName = 'session:'
axios.defaults.withCredentials = true;
export const useStore = defineStore('user', {
    state: () => ({
        use_data: {},
    }),
    actions: {
        async getUserList() {
            try {
              const response = await axios.get("http://127.0.0.1:5000/user",{withCredentials: true});
              this.use_data = response.data
            } catch (error) {
              alert(error)
            }
        },
        async postUser(user:any) {
            console.log("提交的用户数据：", user)
            try {
                await axios.post("http://127.0.0.1:5000/user/userdata",
                    user,
                    {withCredentials: true ,
                        headers: {'Content-Type': 'application/json'}},);
            }catch (error) {
                alert(error)
            }
        },
        async getUser() {
            try {
                const response = await axios.get("http://127.0.0.1:5000/user/userdata",{withCredentials: true});
                this.use_data = response.data
            }catch (error) {
                console.log(error)
            }
        },
        postLogin(user:any) {
            console.log("提交的登录数据：", user)
            try {
                return axios.post("http://127.0.0.1:5000/user/login",
                    user,
                    {withCredentials: true ,
                        headers: {'Content-Type': 'application/json'}},);
            }catch (error) {
                alert(error)
            }
        },
        async postCancel() {
            try {
                await axios.post("http://127.0.0.1:5000/user/cancel",'cancel',{withCredentials: true});
            }catch (error) {
                alert(error)
            }
        },

    }
})