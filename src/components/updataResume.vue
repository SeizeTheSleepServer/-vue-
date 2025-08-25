<template>
  <form @submit.prevent="submitForm" class="edit-form">
    <label for="PROFESSIONAL_SKILL">专业技能:</label>
    <textarea v-model="resumes.PROFESSIONAL_SKILL" placeholder="请输入你的专业技能"></textarea>
    <br>
    <label for="CERTIFICATE">荣誉证书:</label>
    <textarea v-model="resumes.CERTIFICATE" placeholder="请输入你的证书"></textarea>
    <br>
    <label for="EDUCATION">教育经历:</label>
    <textarea v-model="resumes.EDUCATION" placeholder="请输入你的教育经历"></textarea>
    <br>
    <label for="INTERNSHIP">实习经历:</label>
    <textarea v-model="resumes.INTERNSHIP" placeholder="请输入你的实习经历"></textarea>
    <br>
    <label for="SELF_ASSESSMENT">自我评价:</label>
    <textarea v-model="resumes.SELF_ASSESSMENT" placeholder="请输入你的自我评价"></textarea>
    <br>
    <button type="submit">提交修改</button>
  </form>
</template>
<script setup lang="ts">
import {useResumeStore} from "../store/resume.ts";
import {ref} from 'vue'

const resume=useResumeStore();
resume.getResumeData();


let resumes=ref({
  'phone': resume.resume_data.phone,
  'PROFESSIONAL_SKILL': resume.resume_data.PROFESSIONAL_SKILL,
  'CERTIFICATE': resume.resume_data.CERTIFICATE,
  'EDUCATION': resume.resume_data.EDUCATION,
  'INTERNSHIP': resume.resume_data.INTERNSHIP,
  'SELF_ASSESSMENT':resume.resume_data.SELF_ASSESSMENT,
});

console.log(resumes.value);

const submitForm=()=>{
  resume.updateResume(resumes.value);
  console.log(resumes.value);
}
</script>

<style>
.edit-form {
  /* 让表单居中，和简历容器保持一致风格 */
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: var(--card-shadow);
}

.edit-form label {
  /* 让 label 占一行，和 textarea 垂直对齐 */
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--secondary-color);
}

.edit-form textarea {
  /* 统一文本域样式 */
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  resize: vertical; /* 允许垂直拉伸 */
  font-size: 1rem;
  line-height: 1.6;
}



</style>