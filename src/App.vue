<script setup>
</script>

<template>
<div>
  <h3>AppId,RedirectUrl加解密</h3>
  <!-- <textarea id="before" style="width: 100%; height: 100px"></textarea> -->
  <el-input id="before" v-model="data3" placeholder="请输入明文或者密文"  type="textarea" clearable></el-input>
  <el-button type="primary" @click="encrypt" plain>加密</el-button>
  <el-button type="primary" @click="decrypt" plain>解密</el-button>
  <!-- <textarea id="after" style="width: 100%; height: 100px" readonly></textarea> -->
  <el-input id="before" v-model="data4"  type="textarea"  readonly="true" ></el-input>
</div>
<div>
  <h3>身份证、手机号加解密工具</h3>
  <el-input v-model="data1" placeholder="请输入明文或者密文"  type="textarea" clearable></el-input>
  <el-button type="primary" @click="jiami" plain>加密</el-button>
  <el-button type="primary" @click="jiemi" plain>解密</el-button>
  <el-input v-model="data2" v-clipboard:success="onCopy" type="textarea"  @click="handleCopyText(data2)" placeholder="加解密后的字符串" :disabled="true"   ></el-input>
  <el-button @click="handleCopyText(data2)">点击复制</el-button>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      data1: '',
      data2: '',
      data3: '',
      data4:''
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
      })
      

      
    },
    jiemi(){
        console.log("解密-----",this.data1);
        let b = axios.post('https://58004b9d60dc41389986626267835cb4.apig.ap-southeast-1.huaweicloudapis.com/aes?responseType=json&cryptType=de&cryptdata='+this.data1+'', {
          })
          .then(function (response) {
            return response.data.key
          })
          .catch(function (error) {
            console.log(error);
          });
          var that = this;
          b.then((result) => {
            that.data2= result
          })
    },
      encrypt() {
        var before = document.getElementById("before");
        var after = document.getElementById("after");
        var code = before.value;
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        }
        this.data4= escape(c);
      },
      decrypt() {
        var before = document.getElementById("before");
        var after = document.getElementById("after");
        var code = before.value;
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) {
          c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        this.data4= c;
      }
  }
    
}

</script>
<style scoped>
</style>
