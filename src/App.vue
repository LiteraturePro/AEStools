<script setup>
</script>

<template>

<div>
    <el-input v-model="data1" placeholder="请输入明文或者密文" clearable></el-input>

      <el-button type="primary" @click="jiami" plain>加密</el-button>
      <el-button type="primary" @click="jiemi" plain>解密</el-button>


     <el-input v-model="data2" v-clipboard:success="onCopy" placeholder="加解密后的字符串" :disabled="true"   ></el-input>
     <el-button @click="handleCopyText(data2)">点击复制</el-button>

</div>
</template>
<script>
import {requestService} from './js/request'
import axios from 'axios'
export default {
  data() {
    return {
      data1: '',
      data2: ''
    }
  },
  methods: {
    handleCopyText(url) {
      // 创建一个 Input标签
      const cInput = document.createElement('input')
      cInput.value = url
      document.body.appendChild(cInput)
      cInput.select() // 选取文本域内容;
      // 执行浏览器复制命令
      // 复制命令会将当前选中的内容复制到剪切板中（这里就是创建的input标签）
      // Input要在正常的编辑状态下原生复制方法才会生效
      document.execCommand('Copy')
      //this.$message.success("复制成功")
      /// 复制成功后再将构造的标签 移除
      cInput.remove()
    },
    jiami(){
      console.log("加密-----",this.data1);
      let a = axios.post('https://58004b9d60dc41389986626267835cb4.apig.ap-southeast-1.huaweicloudapis.com/aes?responseType=json&cryptType=en&cryptdata='+this.data1+'', {
      })
      .then(function (response) {
        return response.data.key
      })
      .catch(function (error) {
        console.log(error);
      });
      var that = this;
      a.then((result) => {
        that.data2= result

        console.log("result", result);
      })
      

      
    },
    jiemi(){
        console.log("解密-----",this.data1);
        let b ="12345"
        console.log(b)
        this.data2= b
    }
  }
    
}

</script>
<style scoped>
</style>
