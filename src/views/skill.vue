<template>
  <Head/>
  <div class="image-container">
  <div class="image-gallery">
    <div class="gallery-header">
      <h1>Linux</h1>
    </div>
    <div class="image-grid">
      <Professional :get_image="linux" :post_image="postlinux"/>
    </div>
  </div>
    <div class="image-gallery">
    <div class="gallery-header">
      <h1>MySQL</h1>
    </div>
    <div class="image-grid">
      <Professional :get_image="MySQL" :post_image="postMySQL"/>
    </div>
  </div>
    <div class="image-gallery">
    <div class="gallery-header">
      <h1>CERTIFICATE</h1>
    </div>
    <div class="image-grid">
      <Professional :get_image="CERTIFICATE" :post_image="postCERTIFICATE"/>
    </div>
  </div>
  </div>
</template>

<script setup>
import Professional from '../components/professional.vue'
import { usePhotoStore } from '../store/photo'
let photo = usePhotoStore()

async function CERTIFICATE(){
  photo.currentImages = [];
  await photo.getPhotoCERTIFICATE()
  return photo.currentImages
}
async function postCERTIFICATE(){
  await photo.postPhotoCERTIFICATE()
}
async function postMySQL(){
  await photo.postPhotoSQL()}
async function MySQL(){
  photo.mysqlImages = [];
  await photo.getPhotoSQL()
  return photo.mysqlImages}
async function linux(){
  photo.linuxImages = [];
  await photo.getPhotoLinux()
  return photo.linuxImages}
async function postlinux(){
  await photo.postPhotoLinux();}
</script>

<style scoped>
.image-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
}

.gallery-header {
  text-align: center;
  margin-bottom: 2.5rem;
  color: #333;
}

.gallery-header h1 {
  font-size: 2.2rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.gallery-header p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.image-container {
  max-width: 900px;
  margin: 2rem auto;
  background: white;
  box-shadow: var(--card-shadow);
  border-radius: 10px;
  padding: 0 1rem;
}


/* 响应式调整 */
@media (max-width: 768px) {
  .image-gallery {
    padding: 1.5rem;
  }

  .gallery-header h1 {
    font-size: 1.8rem;
  }

}

@media (max-width: 480px) {
  .gallery-header h1 {
    font-size: 1.5rem;
  }

  .gallery-header p {
    font-size: 1rem;
  }

}
</style>
