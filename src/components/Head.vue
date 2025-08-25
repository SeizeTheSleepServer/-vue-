<template>
  <header class="header-container">
    <nav class="nav-container">
      <!-- 左侧导航按钮 -->
      <div class="nav-left">
        <router-link
          v-for="(item, index) in buttonItems"
          :key="index"
          :to="item.path"
          class="nav-button"
        >
          {{ item.title }}
        </router-link>
      </div>

      <!-- 右侧下拉菜单 -->
      <div class="nav-right">
        <div
          class="dropdown"
          @mouseenter="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <button class="dropdown-toggle">
            {{ dropdownConfig.title }}
            <span class="dropdown-icon">▼</span>
          </button>

          <transition name="fade">
            <ul v-show="showDropdown" class="dropdown-menu">
              <li v-for="(item, index) in dropdownConfig.items" :key="index">
                <router-link :to="item.path" class="dropdown-item">
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

// 按钮导航数据
const buttonItems = ref([
  { title: '简历', path: '/resume' },
  { title: '专业技能', path: '/skill' },
  { title: '介绍', path: '/about' }
]);

// 下拉菜单配置
const dropdownConfig = ref({
  title: '更多',
  items: [
    { title: '我的账户', path: '/my' },
    { title: '注销账号', path: '/' },
    { title: '退出登录', path: '/logout' }
  ]
});

// 下拉菜单显示状态
const showDropdown = ref(false);
</script>

<style scoped>
/* 基础样式 */
.header-container {
  background-color: #01632f;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
}

/* 左侧导航按钮样式 */
.nav-left {
  display: flex;
  gap: 20px;
}

.nav-button {
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #00ff3c;
}

/* 右侧下拉菜单样式 */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.dropdown-icon {
  font-size: 0.7rem;
  transition: transform 0.3s;
}

.dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 180px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 10px 0;
  margin: 5px 0 0 0;
  z-index: 100;
}

.dropdown-item {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #2c3e50;
  transition: background 0.3s;
}

.dropdown-item:hover {
  background-color: #f5f7fa;
}

/* 过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  transform-origin: top right;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>