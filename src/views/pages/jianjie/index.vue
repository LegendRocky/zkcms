<template>
  <div class="jianjie-container">
    <div class="block" height="600px">
      <el-carousel>
        <el-carousel-item v-for="item in items" :key="item.index">
          <img :src=item.src alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row>
      <el-col :span="7">
        <div class="grid-content bg-purple news1">
          <img src="@/images/news1.jpg" />
          <div class="subtitle">这是简介1</div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple news1">
          <img src="@/images/news2.jpg" />
          <div class="subtitle">这是简介2</div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple news1">
          <img src="@/images/news3.jpg" />
          <div class="subtitle">这是简介3</div>
        </div>
      </el-col>
    </el-row>
    <div class="keshinav">
    <el-row>
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    </div>
    <div>
      <span>专家团队</span>
      <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
    </div>
    <span>科研</span>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <span>设备</span>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
  import firImg from "@/images/1.jpg";
  import secImg from "@/images/2.jpg";
  import thiImg from "@/images/3.jpg";
  import forImg from "@/images/4.jpg";

  export default {
    name: 'Jianjie',
    data() {
      return {
        items: [
          {
            "index": 1,
            "name": "zhangyi1",
            "src": firImg
          },
          {
            "index": 2,
            "name": "zhangyi2",
            "src": secImg
          },
          {
            "index": 3,
            "name": "zhangyi3",
            "src": thiImg
          },
          {
            "index": 4,
            "name": "zhangyi4",
            "src": forImg
          }
        ]
      }
    }
  }
</script>

<style>
  img{
    display: block;
    width: 100%;
  }
  .el-carousel__container{
    height: 600px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    padding: 20px 10px;
  }
  .bg-purple-dark {
    background: #222;
  }
  .bg-purple {
    background: #333;
  }
  .bg-purple-light {
    background: #444;
  }
  .grid-content {
    border-radius: 6px;
    height: 500px;
    overflow: hidden;
    position: relative;
    
  }
  .subtitle {
    position: absolute;
    bottom: 0;
    padding: 20px;
    color: white;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /*科室导航*/
  .keshinav{
    background: url('http://gazkyy.cn/images/zkDepart-pageBg.jpg');
  }
</style>

