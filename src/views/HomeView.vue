<template>
  <div class="home" style="min-height: 200vh;">
    <div :class="fixedHeaderClass">
      <div class="nav">
        <myicon></myicon>
        <div class="labels" v-if="!isFixed">
          <router-link to="/trend">Trends</router-link>
          <a>Animated</a>
          <a>Static</a>
          <a>New</a>
          <a>More</a>
        </div>
        <div class="loginbtn" v-if="!isFixed">
          <el-button type="primary" class="navbtn" size="large" @click="upload"
            style="font-family: 'Oswald', sans-serif;font-weight: 800;width: 80px;">Upload</el-button>
          <el-button type="primary" class="navbtn" size="large" @click="login"
            style="font-family: 'Oswald', sans-serif;font-weight: 800;width: 80px;">Login</el-button>
        </div>
      </div>
      <div class="search-container" :class="{ 'fixed': isFixed }">
        <el-input v-model="searchcontent" placeholder="Please input" class="search-input"
          input-style="font-family: 'Oswald', sans-serif; ">
          <template #append>
            <el-button type="primary" :icon="Search">
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
    <!-- 此处放置页面内容 -->
    <div class="page-content">
      <!-- 页面内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
</script >

<script>
import myicon from '../components/icon.vue'

export default {
  components: {
    myicon
  },
  data() {
    return {
      isFixed: false,
      isButtonDown: false, // 用于按钮移动特效
      searchcontent: ''
    };
  },
  computed: {
    fixedHeaderClass() {
      return {
        'fixed-header': this.isFixed,
        'initial-header': !this.isFixed
      };
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // 检查页面滚动位置，然后更新isFixed属性来切换样式
      this.isFixed = window.scrollY > 20;
      this.isButtonDown = this.isFixed; // 根据 isFixed 更新按钮特效
    },
    login() {
      this.$router.push('/login')
    },
    upload() {
      this.$router.push('/upload')
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

.home {
  font-family: 'Oswald', sans-serif;
  background-image: -moz-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

  background-image: -webkit-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

  background-image: linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));
}

.fixed-header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: -moz-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

  background-image: -webkit-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

  background-image: linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));
  padding: 12px 20px;
  padding-left: 8%;
  padding-right: 8%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.initial-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  background-image: -moz-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

  background-image: -webkit-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

  background-image: linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));
  padding: 10px 20px;
  padding-left: 8%;
  padding-right: 8%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: left;
}

.nav .labels {
  margin-left: 10px;
}

.nav .labels a {
  display: inline-block;
  height: 50px;
  padding: 0 20px;
  margin-right: 8px;
  font-size: 20px;
  color: rgb(251, 238, 238);
  text-decoration: none;
  line-height: 40px;
  border-bottom: 5px solid purple;
}

.nav .labels a:hover {
  background-image: -moz-linear-gradient(90deg, rgb(183, 16, 244), rgb(12, 188, 233));

  background-image: -webkit-linear-gradient(90deg, rgb(183, 16, 244), rgb(12, 188, 233));

  background-image: linear-gradient(90deg, rgb(183, 16, 244), rgb(12, 188, 233));
  border-top: 1px solid blue;
  transition: all .2s;
}

.nav .nav .loginbtn {
  float: right;
  position: absolute;
  right: 18.2%;
}

.search-container {
  flex-grow: 1;
  margin-top: 5px;
  transition: margin-top 0.3s ease, height 0.3s ease;
  /* 添加搜索框的过渡效果 */
  height: 60px;
  /* 初始高度 */
}



.search-container.fixed {
  width: 100%;
  padding-top: 0;
  margin-top: 0;
  margin-left: 8px;
  /* 移动到顶部时的样式 */
  height: 40px;
  /* 收缩高度 */
}

.search-container .search-input {
  border-radius: 5px;
  outline: none;
  height: 60px;
  font-family: 'Oswald', sans-serif !important;
  font-size: 19px;
}

.search-container.fixed .search-input {
  width: 100%;
  border-radius: 5px;
  outline: none;
  height: 40px;
  font-family: 'Oswald', sans-serif !important;
  font-size: 14px;
}

.page-content {
  margin-top: 0px;
  /* 保证内容不被固定头部遮挡 */
  /* 其他页面内容的样式 */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 100%;

}

.page-content a {
  width: 270px;
  height: 190px;
  background-color: rgb(247, 247, 198);
  margin: 20px;
  transition-property: transform, box-shadow;
  transition-duration: .3s, .3s;
  text-decoration: none;
}

.page-content a:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.page-content a img {
  width: 270px;
  height: 190px;
}

.page-content a span {
  display: none;
  position: absolute;
  height: 15%;
  width: 100%;
  top: 161.5px;
  left: 10px;
  background-color: rbga(0, 0, 0, .4);
  text-align: left;
  color: chartreuse;
}

.page-content a:hover span {
  display: block;
}
</style>