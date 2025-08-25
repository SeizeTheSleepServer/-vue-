<template>
  <div class="register-container">
    <h2>用户注册</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          @blur="validateField('username')"
        >
        <div v-if="errors.username" class="error">{{ errors.username }}</div>
      </div>
        <div class="form-group">
        <label for="phone">电话</label>
        <input
          type="text"
          id="phone"
          v-model="formData.phone"
          @blur="validateField('phone')"
          placeholder="请输入有效电话"
        >
        <div v-if="errors.phone" class="error">{{ errors.phone }}</div>
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

      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          @blur="validateField('password')"
          placeholder="至少6位字符"
        >
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
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

      <button type="submit" :disabled="isSubmitting" class="submit-btn">
        {{ isSubmitting ? '注册中...' : '立即注册' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from '../store/use';
import {useRouter} from 'vue-router';


const user = useStore();
const router = useRouter();


const formData = reactive({
  username: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = reactive({
  username: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const isSubmitting = ref(false);


const validateRules = {
  username: value => {
    if (!value) return '用户名不能为空';
    return '';
  },
  phone: value => {
    if (!value) return '手机号不能为空';
    if (value.length !== 11)return '请输入有效的手机号';
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(value)) return '请输入有效的手机号';
    return '';
  },
  email: value => {
    if (!value) return '邮箱不能为空';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '请输入有效的邮箱地址';
    return '';
  },
  password: value => {
    if (!value) return '密码不能为空';
    if (value.length < 6) return '密码长度不能少于6位';
    return '';
  },
  confirmPassword: value => {
    if (!value) return '请确认密码';
    if (value !== formData.password) return '两次输入的密码不一致';
    return '';
  }
};


const validateField = (field) => {
  errors[field] = validateRules[field](formData[field]);
};


const handleSubmit =  () => {
  let isValid = true;
  Object.keys(formData).forEach(field => {
    errors[field] = validateRules[field](formData[field]);
    if (errors[field]) isValid = false;
  });

  if (!isValid) return;

  try {
    isSubmitting.value = true;


    user.postLogin(formData);
    alert('注册成功！');

    router.push('/login');
  } catch (error) {
    console.error('注册失败:', error);
    alert('注册失败，请重试');
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

}

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

button {
  width: 100%;
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