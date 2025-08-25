<template>
  <Head/>
<div class="container">
  <h1>系统介绍</h1>
  <h2><span>🌠</span>系统简介：</h2>
  <div class="text-css">
  <pre>系统将简历内容划分为 职业技能、荣誉证书、教育经历、实习经历、自我评价 等独立模块：

职业技能：集中呈现专业能力，比如编程技术、设计软件掌握度等，帮招聘方快速判断与岗位匹配度；
荣誉证书：通过 “展开” 设计，隐藏 / 展示获奖详情，既保持简历简洁，又能按需呈现亮点；
教育经历：按时间线梳理学历背景，从院校到专业一目了然；
实习经历：聚焦职场实践，可展开查看具体工作内容、成果，体现实操能力；
自我评价：从主观视角补充个人特质、职业态度，让招聘方更立体了解求职者。
  </pre>
  </div>
  <h2><span>✍️</span>技术介绍：</h2>
  <div class="text-css">
  <pre>前后端分离架构：

    前端：采用vue3技术实现前端页面，使用TypeScript进行编程，使用Axios进行HTTP请求。
    后端：采用flask框架进行后端开发，使用ORM进行数据库操作，使用restful API进行接口开发。
  </pre>
  </div>
  <h2><span>💓</span>系统功能：</h2>
  <div class="text-css">
  <pre>功能：
    1. 登录注册：用户可以注册或登录系统，系统会记录用户的登录状态，并提供退出功能。
        2. 简历展示：展示用户上传的简历，可修改编辑简历。
        3. 专业技能：展示用户的专业技能，包括编程技术、设计软件掌握度等。
        4. 个人中心：展示用户的个人信息，包括电话、邮箱、个人简介等可对个人信息修改。
  </pre>
</div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  --light-bg: #f8f9fa;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.text-css {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: var(--light-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  transition: var(--transition);
}


.container {
  max-width: 900px;
  margin: 2rem auto;
  background: white;
  box-shadow: var(--card-shadow);
  border-radius: 10px;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  color: #68b589;
}
h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  color: var(--secondary-color);
  padding-bottom: 0.8rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #eaeaea;
  position: relative;
}
</style>