import { defineStore } from 'pinia'
import axios from "axios";
import  JSZip  from 'jszip';

axios.defaults.xsrfCookieName = 'session:'
axios.defaults.withCredentials = true;

export const usePhotoStore = defineStore('main', {
  state: () => ({
    selectedFile: [],
    imageUrl:'',
    linuxImages: [],
    mysqlImages: [],
    currentImages: []
  }),
  actions: {
    async postPhoto() {
      if (!this.selectedFile) return;
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      try {
        await axios.post(
          'http://127.0.0.1:5000/photo',
          formData,
          {
            withCredentials: true ,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        console.log('上传成功:');
      } catch (error) {
        console.error('上传失败:', error);
      }
    },
    async getPhoto() {
      try {
        const response = await axios.get(
          'http://127.0.0.1:5000/photo',
          {
            responseType: 'blob',
            withCredentials: true
          }
        );
        this.imageUrl = URL.createObjectURL(response.data)
        console.log('Received image type:', this.imageUrl)
      } catch (error) {
        console.error('获取失败:', error);
      }
    },
    async postPhotoLinux() {
      if (!this.selectedFile) return;
      const formData = new FormData();
      for(let i=0;i<this.selectedFile.length;i++)
      formData.append('image', this.selectedFile[i]);
      try {
        await axios.post(
          'http://127.0.0.1:5000/photo/data',
          formData,
          {
            withCredentials: true ,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        alert('上传成功:');
      } catch (error) {
        alert('上传失败:', error);
      }
    },
    async getPhotoLinux() {
      try {
        const response =await axios.get(
          'http://127.0.0.1:5000/photo/data',
          {
            responseType: 'blob',
            withCredentials: true
          }
        );
        console.log(response)
        const zip = new JSZip();
        let filelist=await zip.loadAsync(response.data)
        for (const filename in filelist.files) {
          const file = filelist.files[filename];
          if (!file.dir) {
            const imgBlob = await file.async('blob');
            const imgUrl = URL.createObjectURL(imgBlob);
            this.linuxImages.push(imgUrl);
            }
          }
        } catch (error) {
        console.error('获取失败:', error);
      }
    },
    async postPhotoSQL() {
      if (!this.selectedFile) return;
      const formData = new FormData();
      for(let i=0;i<this.selectedFile.length;i++)
      formData.append('image', this.selectedFile[i]);
      try {
         await axios.post(
          'http://127.0.0.1:5000/photo/sqldata',
          formData,
          {
            withCredentials: true ,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        alert('上传成功:');
      } catch (error) {
        alert('上传失败:', error);
      }
    },
    async getPhotoSQL() {
      try {
        const response =await axios.get(
          'http://127.0.0.1:5000/photo/sqldata',
          {
            responseType: 'blob',
            withCredentials: true
          }
        );
        console.log(response)
        const zip = new JSZip();
        let filelist=await zip.loadAsync(response.data)
        for (const filename in filelist.files) {
          const file = filelist.files[filename];
          if (!file.dir) {
            const imgBlob = await file.async('blob');
            const imgUrl = URL.createObjectURL(imgBlob);
            this.mysqlImages.push(imgUrl);
            }
          }
        } catch (error) {
        console.error('获取失败:', error);
      }
    },
    async postPhotoCERTIFICATE() {
      if (!this.selectedFile) return;
      const formData = new FormData();
      for(let i=0;i<this.selectedFile.length;i++)
      formData.append('image', this.selectedFile[i]);
      try {
         await axios.post(
          'http://127.0.0.1:5000/photo/CERTIFICATEdata',
          formData,
          {
            withCredentials: true ,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        alert('上传成功:');
      } catch (error) {
        alert('上传失败:', error);
      }
    },
    async getPhotoCERTIFICATE() {
      try {
        const response =await axios.get(
          'http://127.0.0.1:5000/photo/CERTIFICATEdata',
          {
            responseType: 'blob',
            withCredentials: true
          }
        );
        console.log(response)
        const zip = new JSZip();
        let filelist=await zip.loadAsync(response.data)
        for (const filename in filelist.files) {
          const file = filelist.files[filename];
          if (!file.dir) {
            const imgBlob = await file.async('blob');
            const imgUrl = URL.createObjectURL(imgBlob);
            this.currentImages.push(imgUrl);
            }
          }
        } catch (error) {
        console.error('获取失败:', error);
      }
    },
  }
})

