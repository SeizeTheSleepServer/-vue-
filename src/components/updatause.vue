<template>

    <h2>修改用户信息</h2>
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          @blur="validateField('username')"
          placeholder="请输入用户名"
        >
        <div v-if="errors.username" class="error">{{ errors.username }}</div>

      </div>
      <div class="form-group">
        <label for="email">邮箱</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          @blur="validateField('email')"
          placeholder="请输入有效邮箱"
        >
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>
  <button @click="updata_password? updata_password = false : updata_password = true">{{ updata_password? '取消修改' : '修改密码' }}</button>
      <div v-if="updata_password">
        <div class="form-group">
        <label for="oldpassword">旧密码</label>
        <input
          type="text"
          id="oldpassword"
          v-model="formData.oldpassword"
          @blur="validateField('oldpassword')"
          placeholder="请输入旧密码"
        >
        <div v-if="errors.oldpassword" class="error">{{ errors.oldpassword }}</div>
          </div>
      <div class="form-group">
        <label for="newpassword">新密码</label>
        <input
          type="password"
          id="newpassword"
          v-model="formData.newpassword"
          @blur="validateField('newpassword')"
          placeholder="至少6位字符"
        >
        <div v-if="errors.newpassword" class="error">{{ errors.newpassword }}</div>
      </div>
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="formData.confirmPassword"
          @blur="validateField('confirmPassword')"
          placeholder="请再次输入密码"
        >
        <div v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</div>
      </div>
      </div>
      <button class="submit-btn" @click="Submit">
        {{ isSubmitting ? '修改中...' : '提交修改' }}
      </button>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue';
import { useStore } from '../store/use.js';
import {useRouter} from 'vue-router';
import {emitter} from "../tools/emitter.ts";


const formData = reactive({});
const user = useStore();
const router = useRouter();

onMounted(async () => {
  await user.getUser();
  Object.assign(formData, {
    phone: user.use_data.phone,
    username: user.use_data.username,
    email: user.use_data.email,
    oldpassword: '',
    newpassword: '',
    password: user.use_data.password,
    confirmPassword: ''
  })
})


  const errors = reactive({
  username: '',
  email: '',
  oldpassword: '',
  newpassword: '',
  confirmPassword: ''
});

let updata_password = ref(false);
const isSubmitting = ref(false);


const validateRules = {
  phone: value => {
    return '';
  },
  username: value => {
    if (!value) return '用户名不能为空';
    return '';
  },
  email: value => {
    if (!value) return '邮箱不能为空';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '请输入有效的邮箱地址';
    return '';
  },
  password: value => {
    return '';
  },
  oldpassword: value => {
    if (value !== user.use_data.password) return '密码不正确'
    return '';
  },
  newpassword: value => {
    if (!value) return '请确认密码';
    if (value === formData.password) return '新密码与原密码不能相同';
    if (value.length < 6) return '密码至少6位字符';
    return '';
  },
  confirmPassword: value => {
    if (!value) return '请确认密码';
    if (value !== formData.newpassword) return '密码不一致';
    return '';
  }
};


const validateField = (field) => {
  errors[field] = validateRules[field](formData[field]);
};


async function Submit() {
  try {
    let isValid = true;
    const fieldsToValidate = updata_password.value
      ? ['username', 'email', 'oldpassword', 'newpassword', 'confirmPassword']
      : ['username', 'email'];

    fieldsToValidate.forEach(field => {
      errors[field] = validateRules[field](formData[field]);
      if (errors[field]) isValid = false;
    });

  if (!isValid) return;
  console.log(formData);
    if (formData.newpassword !== '') {
      formData.password = formData.newpassword;
    }
    isSubmitting.value = true;
    await user.postUser(formData);
    emitter.emit('use:update');
    alert('修改成功！');
  } catch (error) {
    console.error('注册失败:', error);
    alert('注册失败，请重试');
  } finally {
    isSubmitting.value = false;
  }
}

</script>

<style scoped>
h2 {
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
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  color: #333;
}



</style>