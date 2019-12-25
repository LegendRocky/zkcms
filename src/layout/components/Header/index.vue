<template>
  <div>
  <div>广安正康医院</div>
  <el-menu :default-active="activeIndex" class="el-menu-wrap" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">医院概况</template>
      <el-menu-item index="2-1"><router-link to="/jianjie">医院简介</router-link></el-menu-item>
      <el-menu-item index="2-2"><router-link to="/dashboard">医院文化</router-link></el-menu-item>
      <el-menu-item index="2-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">老年养护院</template>
      <el-menu-item index="3-1">医院简介</el-menu-item>
      <el-menu-item index="3-2">医院文化</el-menu-item>
      <el-menu-item index="3-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">新闻中心</template>
      <el-menu-item index="4-1">医院简介</el-menu-item>
      <el-menu-item index="4-2">医院文化</el-menu-item>
      <el-menu-item index="4-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">科教研护</template>
      <el-menu-item index="5-1">医院简介</el-menu-item>
      <el-menu-item index="5-2">医院文化</el-menu-item>
      <el-menu-item index="5-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">科室导航</template>
      <el-menu-item index="6-1">医院简介</el-menu-item>
      <el-menu-item index="6-2">医院文化</el-menu-item>
      <el-menu-item index="6-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">专家团队</template>
      <el-menu-item index="7-1">医院简介</el-menu-item>
      <el-menu-item index="7-2">医院文化</el-menu-item>
      <el-menu-item index="7-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="8">
      <template slot="title">医院党建</template>
      <el-menu-item index="8-1">医院简介</el-menu-item>
      <el-menu-item index="8-2">医院文化</el-menu-item>
      <el-menu-item index="8-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="9">
      <template slot="title">健康知识</template>
      <el-menu-item index="9-1">医院简介</el-menu-item>
      <el-menu-item index="9-2">医院文化</el-menu-item>
      <el-menu-item index="9-3">医院设备</el-menu-item>
    </el-submenu>
    <el-submenu index="10">
      <template slot="title">就医指南</template>
      <el-menu-item index="10-1">医院简介</el-menu-item>
      <el-menu-item index="10-2">医院文化</el-menu-item>
      <el-menu-item index="10-3">医院设备</el-menu-item>
    </el-submenu>
  </el-menu>
<div class="line"></div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu-wrap{
    background: #675436;
    color: white;
    padding: 0 20px;
  }
  li{
    width: 10%;
  }
  .el-menu-item{
    width: 10%;
  }
  .el-submeun{
    width: 10%;
  }
</style>
