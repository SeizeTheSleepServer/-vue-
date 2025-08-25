<template>
  <!-- 添加包裹容器 -->
  <div class="container">
    <button class="entry-button" type="button" @click="handleClick">取消退出</button>
    <button class="entry-button" type="button" @click="logout">确定退出</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '../store/session.ts'
const router = useRouter()


function handleClick() {
  router.push('/resume')
}
async function logout() {
  await useSessionStore().DeleteUsersession()
  if (useSessionStore().session === false) {
    router.push('/login')
  }
}
</script>

<style scoped>
/* 新增容器样式 */
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  min-height: 100vh;       /* 确保全屏高度 */
  width: 100%;             /* 确保全屏宽度 */
}

</style>
