<template>
  <div class="common-layout">
    <div class="header-sys">
      <div class="header-sys-msg"
        ><el-icon color="#fff" :size="20"><Bell /></el-icon
      ></div>
      <div class="header-sys-my"
        ><el-icon color="#fff" :size="20"><User /></el-icon
      ></div>
      <div class="header-sys-lang">cn</div>
    </div>
    <div class="main">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" router>
        <el-menu-item index="0">
          <img style="width: 80px" src="../assets/images/byh-logo.png" alt="宝远航科技" />
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="index-home" route="/index-home">首页</el-menu-item>
        <el-menu-item index="index-flight" route="/index-flight">航线航班</el-menu-item>
        <el-menu-item index="index-business" route="/index-business">招商会展</el-menu-item>
        <el-menu-item index="/index-regulations">政策法规</el-menu-item>
        <el-menu-item index="/index-standards">标准规范</el-menu-item>
        <el-menu-item index="/index-reports">专家报告</el-menu-item>
        <el-menu-item index="/index-research">数据研究</el-menu-item>
        <el-menu-item index="/index-feedback">意见反馈</el-menu-item>
      </el-menu>
      <router-view />
    </div>
    <div class="footer">
      <div class="footer-copyright">2024©xxxx</div>
      <div class="footer-privatePolicy">隐私政策</div>
      <div class="footer-beian">鄂备xxxxx</div>
      <div class="footer-contact">联系电话:xxx-xxxxxxxx</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const activeIndex = ref('index-home');
  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
</script>

<style lang="less" scoped>
  .header-sys {
    height: 30px;
    background-color: rgb(16 20 62);
    //background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20%;
    gap: 10px;
  }
  //.header-sys-my .header-sys-msg .header-sys-lang {
  //  margin-left: 10px;
  //}
  .header-sys-lang {
    color: #fff;
  }

  .el-menu-demo {
    margin: 0 20%;
  }

  .footer {
    height: 80px;
    padding: 0 20%;
    background-color: rgb(28 34 88);
    display: flex;
    flex-direction: row;
    color: rgb(142 145 172);
    justify-content: space-between;
    align-items: center;
  }

  .footer > * {
    color: rgb(142 145 172);
  }

  .flex-grow {
    flex-grow: 1;
  }
</style>
