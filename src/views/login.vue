<template>
  <div class="login-container">
    <h1>用户登录</h1>

      <div class="form-group">
        <label for="username">用户名:</label>
        <input type="text" v-model="username" autocomplete="username">
      </div>

      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" v-model="password" autocomplete="current-password">
      </div>

      <button @click="handleLogin" type="button">登录</button>
      <button @click="router.push({name: 'register'})">注册</button>


    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue';
import {useStore}from '../store/use.ts'
import { useRouter } from 'vue-router'
import {useSessionStore} from "../store/session.ts";


const router = useRouter()

const username = ref('');
const password = ref('');
const errorMessage = ref('');




const sessionStore = useSessionStore();



onMounted(async () => {
  await sessionStore.getSession();
  console.log(sessionStore.session);
  if (sessionStore.session) {
    router.push({name: 'jianli'});
  }
})




const Use = useStore();
Use.getUserList()

let into =ref(false);
function handleLogin(){
  errorMessage.value = '';
  if (!username.value.trim() || !password.value) {
    errorMessage.value = '用户名和密码不能为空';
    return;
  }


  for (let i = 0; i < Use.use_data.length; i++) {
    if (username.value ===Use.use_data[i].username  && password.value ===Use.use_data[i].password  && errorMessage.value === ''){
        sessionStore.postUsersession(Use.use_data[i])
        into.value = true;
        router.push({name: 'jianli'})
        return;
    }
  }
  if (into.value === false) {
    errorMessage.value = '用户名或密码错误';
    return;
  }
}

</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

}

h1 {
  text-align: center;
  color: #68b589;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 4px;
  box-sizing: border-box;
  color: #000000;
}

button {
  width: 50%;
  padding: 12px;
  background-color: #7ce88e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
</style>