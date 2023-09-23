<template>
    <div style="min-height: 200vh;">
        <div :class="fixedHeaderClass">
            <button class="header-button" :class="{ 'button-animation': isFixed, 'down': isButtonDown }">按钮</button>
            <div class="search-container" :class="{ 'fixed': isFixed }">
                <input type="text" placeholder="搜索" class="search-input">
            </div>
        </div>
        <!-- 此处放置页面内容 -->
        <div class="page-content">
            <!-- 页面内容 -->
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isFixed: false,
            isButtonDown: false // 用于按钮移动特效
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
            this.isFixed = window.scrollY > 0;
            this.isButtonDown = this.isFixed; // 根据 isFixed 更新按钮特效
        }
    }
};
</script>
  
<style scoped>
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.initial-header {
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.header-button {
    padding: 10px 20px;
    width: 50px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.button-animation {
    transition: transform 0.3s ease;
    /* 添加按钮的过渡效果 */
}

.search-container {
    flex-grow: 1;
    margin-top: 10px;
    transition: margin-top 0.3s ease, height 0.3s ease;
    /* 添加搜索框的过渡效果 */
    height: 60px;
    /* 初始高度 */
}

.search-container.fixed {
    margin-top: 0;
    /* 移动到顶部时的样式 */
    height: 40px;
    /* 收缩高度 */
}

.search-input {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

.page-content {
    margin-top: 80px;
    /* 保证内容不被固定头部遮挡 */
    /* 其他页面内容的样式 */
}
</style>