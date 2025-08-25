<template>
    <button class="upload-btn" @click="updataImages=!updataImages">{{updataImages? '取消修改': '修改图片' }}</button>
    <div class="image-grid">
  <div
      v-if="!updataImages"
      class="item"
      v-for="(item, index) in images"
      :key="index"
    >
      <img @click="openLightbox(index)" :src="item"/>
    </div>
    <div
        v-if="updataImages"
      class="item"
      v-for="(item, index) in images"
      :key="index"
      draggable="true"
      @dragstart="handleDragStart(index)"
      @dragover.prevent
      @drop="handleDrop(index)"
    >
      <img @click="openLightbox(index)" :src="item"/>
      <button class="remove-btn" @click="removeImage(index)">x</button>
    </div>
    <div v-if="showLightbox" class="lightbox">
      <button class="close-btn" @click="closeLightbox">×</button>
      <button  @click.stop="prevImage">‹</button>

      <div class="lightbox-content">
        <img :src="images[currentIndex]" class="enlarged-img">
      </div>

      <button @click.stop="nextImage">›</button>
    </div>
</div>
  <div v-if="updataImages">
    <input type="file" accept="image/*" @change="handleImageUpload">
    <button  @click="submitImage">提交修改</button>
    <input
      type="file"
      accept="image/*"
      multiple
      ref="fileInput"
      style="display: none;"
    >
  </div>

</template>



<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { usePhotoStore } from '../store/photo.ts';

const props = defineProps<{
  get_image: () => void;
  post_image: () => void;
}>();

const photo = usePhotoStore();


let images = ref([]);


let dragIndex = null
let showLightbox = ref(false)
let currentIndex = ref(0)
let updataImages = ref(false)


const handleDragStart = (index) => {
  dragIndex = index
}
onMounted(async () => {
  images.value = [];
  images.value = await props.get_image();})


const handleDrop = (dropIndex) => {
  if (dragIndex === null) return
  const newImages = [...images.value]
  const temp = newImages[dragIndex]
    newImages[dragIndex] = newImages[dropIndex]
  newImages[dropIndex] = temp
  images.value = newImages
  dragIndex = null
}



function handleImageUpload(event) {
  images.value.push(URL.createObjectURL(event.target.files[0]));

  if (images.value.length > 9) {
    alert('不能上传超过9张图片');
    event.target.value = null;
    return;
  }

  console.log(event.target.files);
}

async function submitImage() {
 for (let i = 0; i < images.value.length; i++) {
  await fetch(images.value[i])
        .then(response => {
          return response.blob();
        })
        .then(originalBlob => {
          photo.selectedFile.push(originalBlob);
        })
  }
  props.post_image();
}


function removeImage(index) {
  images.value.splice(index, 1)
}

function openLightbox(index) {
  currentIndex.value = index
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}

// 关闭大图查看器
function closeLightbox() {
  showLightbox.value = false
  document.body.style.overflow = '' // 恢复页面滚动
}

// 上一张
function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

// 下一张
function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

</script>


<style scoped>
.image-grid {
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.item {
  width: 30%;
  aspect-ratio: 1/1;
  position: relative;
}
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
}
.enlarged-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}
.remove-btn {
  position: absolute;
  top: 2px;
  right: -15px;
  font-size: 15px;
  cursor: pointer;
  z-index: 10;
  background-color: #fff;
  border-radius: 50%;
  padding: 2px;
}


</style>