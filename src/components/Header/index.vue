<template>
  <div class="header">
    <div class="header-sys"> </div>
    <!--    <div class="header-tabbar">-->

    <!--    </div>-->
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .header {
    height: 100px;
    display: flex;
    flex-direction: column;
    border: 1px solid red;
  }

  .header-sys {
    height: 30px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .header-tabbar {
    height: 70px;
    border: solid 1px #000;
    display: flex;
  }
</style>
