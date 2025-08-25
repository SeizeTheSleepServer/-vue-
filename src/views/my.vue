<template>
  <Head/>
  <div class="account-container">
    <div class="user-card">
      <div class="user-info">
        <h1>{{ useData.use_data.username }}</h1>
        <p class="email">{{ useData.use_data.email }}</p>
        <div class="stats">
          <div class="stat-item">
            <pre class="stat-value">{{useData.use_data.created_at}}</pre>
            <span class="stat-label">加入日期</span>
          </div>
        </div>
      </div>
      <div class="avatar-container">
        <img :src="photo.imageUrl" alt="用户头像" class="avatar">
        <button class="edit-btn" @click="editAvatar">编辑</button>
      </div>
      <div v-if="avatar_component">
        <input type="file" @change="handleImageUpload">
        <button  @click="submitImage">上传图片</button>
      </div>
    </div>

    <!-- 账户信息区域 -->
    <div class="account-section">
      <h2>账户信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <label>手机号码</label>
          <p>{{ useData.use_data.phone }}</p>
        </div>
        <div class="info-item">
          <pre class="text-level">安全等级</pre>
          <div class="security-level">
            <h3>{{ StrengthText() }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能操作区 -->
    <div class="action-section">
      <h2>账户操作</h2>
      <div class="action-grid">
        <button class="action-btn" @click="updatause">
          <i class="icon-updatause"></i>
          <span>修改密码</span>
        </button>
        <button class="action-btn" @click="logout">
          <i class="icon-logout"></i>
          <span>退出登入</span>
        </button>
        <button class="action-btn" @click="cancel">
          <i class="icon-cancel"></i>
          <span>注销账户</span>
        </button>
      </div>
      <div v-if="updata" >
      <updatauser/>
    </div>
  </div>
    </div>

</template>

<script setup lang="ts">
import { ref,onUnmounted} from 'vue';
import {useRouter} from 'vue-router';
import {useStore}from '../store/use.ts'
import {usePhotoStore}  from "../store/photo.js";
import Head from "../components/Head.vue";
import updatauser from '../components/updatause.vue';
import {emitter} from "../tools/emitter.ts";

const router = useRouter();


const useData = useStore()
const photo=usePhotoStore();

const updata=ref(false);

photo.getPhoto()
useData.getUser()


let avatar_component=ref(false);




// 计算安全等级文本
const StrengthText = () => {
  if (useData.use_data.password.length === 0) {
    return '无';
  }

  let strength = 0;
  if (useData.use_data.password.length >= 8) strength += 1;
  if (useData.use_data.password.length >= 12) strength += 1;
  if (/[a-z]/.test(useData.use_data.password)) strength += 1;
  if (/[A-Z]/.test(useData.use_data.password)) strength += 1;
  if (/[0-9]/.test(useData.use_data.password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(useData.use_data.password)) strength += 1;
  if (strength <= 1) return '弱';
  if (strength < 3) return '中';
  if (strength <6) return '强';
  if (strength === 6) return '非常强';
}



const editAvatar = () => {
  avatar_component.value=true;
};


function handleImageUpload(event) {
  photo.selectedFile = event.target.files[0];
}

async function submitImage() {
  await photo.postPhoto();
  avatar_component.value=false;
}

function updatause() {
  updata.value=true;
  emitter.on('use:update',()=>{
    updata.value=false;
  })
}

function logout() {
  router.push('/logout');
}
function cancel() {
  router.push('/cancel');
}

onUnmounted(() => {
  emitter.off('use:update');
})
</script>

<style scoped>
.account-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #89ff5f 0%, #14ba00 100%);
  border-radius: 16px;
  padding: 25px;
  color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.avatar-container {
  position: relative;
  margin-right: 25px;

}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.3);
  object-fit: cover;
}

.edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  color: #3bc500;
  border: none;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s;
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}



.user-info h1 {
  margin: 0 0 5px 0;
  font-size: 28px;
}

.email {
  opacity: 0.9;
  margin: 0 0 15px 0;
}

.stats {
  display: flex;
  gap: 25px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 20px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.account-section, .action-section {
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.text-level{
  color: #00a115;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.info-item {
  padding: 15px;
}

.info-item label {
  display: block;
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 5px;
}

.info-item p {
  margin: 0;
  font-size: 18px;
  color: #34495e;
}

.balance {
  color: #27ae60;
  font-weight: bold;
  font-size: 22px !important;
}

.security-level {
  display: flex;
  align-items: center;
  gap: 10px;
}

.level-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ecf0f1;
}

.level-dot.active {
  background: #2ecc71;
}

.level-text {
  font-weight: 500;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  border-color: #03f806;
  background: #e8f4fe;
}

.action-btn i {
  font-size: 28px;
  margin-bottom: 10px;
  color: #0aff1e;
}

.action-btn span {
  font-size: 15px;
  color: #2c3e50;
}

.logout-section {
  text-align: center;
  margin-top: 30px;
}

.logout-btn {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 40px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #c0392b;
}

/* 图标样式 */
.icon-updatause:before { content: "⌨"; }
.icon-logout:before { content: "💳"; }
.icon-cancel:before { content: "🛡️"; }
</style>