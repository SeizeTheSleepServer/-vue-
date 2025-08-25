<template>
  <div class="container">
    <button class="entry-button" @click="handleClick">取消退出</button>
    <button class="entry-button" @click="iscancel">确定注销</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '../store/use.ts'


const router = useRouter()
const use=useStore()

function handleClick() {
  router.push('/my')
}
async function iscancel() {
  await use.postCancel()
  setTimeout(() => {router.push('/login')
  }, 3000)

}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  min-height: 100vh;       /* 确保全屏高度 */
  width: 100%;             /* 确保全屏宽度 */
}
</style>