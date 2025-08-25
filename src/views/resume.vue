<template>
  <Head/>
  <div class="resume-container" >
    <main class="resume-content">
      <div class="name-title">
        <div class="avatar-container">
        <img :src="photo.imageUrl" alt="用户头像" class="avatar">
        </div>
        <div class="contact-info">
          <h1>{{ useData.use_data.username }}</h1>
        </div>
        <div class="contact-info">
          <pre>电话：{{ useData.use_data.phone }}</pre>
          <pre>邮箱：{{ useData.use_data.email }}</pre>
        </div>
      </div>
      <section class="resume-section">
        <h2 class="section-title">
          <span class="icon">✪</span>
          <span>职业技能</span><button @click='PROFESSIONAL_SKILL_show=!PROFESSIONAL_SKILL_show'>{{PROFESSIONAL_SKILL_show?'收起':'展开'}}</button>
          <span class="en-title">PROFESSIONAL SKILL</span>
        </h2>
        <div class="text-css" v-if='PROFESSIONAL_SKILL_show'>
          <pre>{{resumeStore.resume_data.PROFESSIONAL_SKILL}}</pre>
        </div>
      </section>

      <section class="resume-section">
        <h2 class="section-title">
          <span class="icon">◎</span>
          <span>荣誉证书</span><button @click='CERTIFICATE_show=!CERTIFICATE_show'>{{CERTIFICATE_show?'收起':'展开'}}</button>
          <span class="en-title">CERTIFICATE</span>
        </h2>
        <div class="text-css" v-if='CERTIFICATE_show'>
          <pre>{{resumeStore.resume_data.CERTIFICATE}}</pre>
        </div>
      </section>

      <section class="resume-section">
        <h2 class="section-title">
          <span class="icon">□</span>
          <span>教育经历</span><button @click='EDUCATION_show=!EDUCATION_show'>{{EDUCATION_show?'收起':'展开'}}</button>
          <span class="en-title">EDUCATION</span>
        </h2>
        <div class="text-css" v-if='EDUCATION_show'>
          <pre>{{resumeStore.resume_data.EDUCATION}}</pre>
        </div>
      </section>

      <section class="resume-section">
        <h2 class="section-title">
          <span class="icon">❀</span>
          <span>实习经历</span><button @click='INTERNSHIP_show=!INTERNSHIP_show'>{{INTERNSHIP_show?'收起':'展开'}}</button>
          <span class="en-title">INTERNSHIP</span>
        </h2>
        <div class="text-css" v-if='INTERNSHIP_show'>
        <pre>{{resumeStore.resume_data.INTERNSHIP}}</pre>
        </div>
      </section>

      <section class="resume-section">
        <h2 class="section-title">
          <span class="icon">☆</span>
          <span>自我评价</span><button @click='SELF_ASSESSMENT_show=!SELF_ASSESSMENT_show'>{{SELF_ASSESSMENT_show?'收起':'展开'}}</button>
          <span class="en-title">SELF ASSESSMENT</span>
        </h2>
        <div class="text-css" v-if='SELF_ASSESSMENT_show'>
          <pre>{{resumeStore.resume_data.SELF_ASSESSMENT}}</pre>
        </div>
      </section>
      <button class="entry-button" @click="edit_show=!edit_show">{{edit_show?'取消修改':'修改简历'}}</button>
    </main>
    <main>
      <div v-if="edit_show" class="text-css" >
        <updataResume/>
        </div>
    </main>
  </div>




</template>

<script setup lang="ts">
import {useStore}from '../store/use.ts'
import {ref, onMounted, onBeforeMount} from 'vue'
import {useResumeStore} from "../store/resume.ts";
import {usePhotoStore}  from "../store/photo.js";
import updataResume from '../components/updataResume.vue'
import {useSessionStore} from '../store/session.ts'
import {useRouter} from 'vue-router'


const router = useRouter()
const sessionStore = useSessionStore()
onBeforeMount(async () => {
  await sessionStore.getSession();
  console.log(sessionStore.session);
  if (!sessionStore.session) {
    router.push({name: 'login'});
  }
})

const photo=usePhotoStore();
photo.getPhoto();

const edit_show = ref(false)

let PROFESSIONAL_SKILL_show = ref(false)
let CERTIFICATE_show = ref(false)
let EDUCATION_show = ref(false)
let INTERNSHIP_show = ref(false)
let SELF_ASSESSMENT_show = ref(false)




const useData = useStore()
const resumeStore = useResumeStore()
onMounted(async () => {
  await useData.getUser()
  await resumeStore.getResumeData()
})








</script>




<style scoped>
/* 基础样式 */
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

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f0f2f5;
}



.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.3);
  object-fit: cover;
}


/* 简历容器 */
.resume-container {
  max-width: 900px;
  margin: 2rem auto;
  background: white;
  box-shadow: var(--card-shadow);
  border-radius: 10px;
  padding: 0 1rem;
}

.name-title {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.name-title h1 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.contact-info {
  display: flex;
  gap: 1.5rem;
  font-size: 1.1rem;
  opacity: 0.9;
}


/* 内容区域 */
.resume-content {
  padding: 2rem;
}

.resume-section {
  margin-bottom: 2.5rem;
  position: relative;
}

.section-title {
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

.section-title::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100px;
  height: 2px;
  background: var(--primary-color);
}

.icon {
  font-size: 1.8rem;
  color: var(--primary-color);
}

.en-title {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
  margin-left: auto;
}



.skills-list li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.skills-list li::before {
  content: "•";
  color: var(--primary-color);
  font-size: 1.5rem;
  position: absolute;
  left: 0;
  top: -3px;
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

.text-css:hover {
  transform: translateY(-3px);
  box-shadow: var(--card-shadow);
}



.self-assessment p {
  margin-bottom: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .resume-container {
    margin: 0;
    border-radius: 0;
  }

  .name-title h1 {
    font-size: 2.2rem;
  }

  .contact-info {
    flex-direction: column;
    gap: 0.5rem;
  }


  .section-title {
    flex-wrap: wrap;
  }

  .en-title {
    margin-left: 0;
    width: 100%;
  }
}

@media print {
  .resume-container {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }

  .resume-header {
    background: var(--secondary-color);
    color: white;
  }

  .header-decoration {
    display: none;
  }
}


/* 打印优化 */
@media print {
  .text-container {
    column-width: auto;
    max-width: 100%;
  }
}

.avatar-container {
  position: relative;
  margin-right: 25px;
}


</style>