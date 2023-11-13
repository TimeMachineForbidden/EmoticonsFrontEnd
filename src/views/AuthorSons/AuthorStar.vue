<template>
    <div class="authorstar">
        <!-- <a v-for="(item, index) in dataList" :key="index"><img src="@/assets/testpic.jpg" alt=""><span>Author:{{
            item.createUser }}</span></a> -->
        <a v-for="(item, index) in dataList" :key="index"><img src="@/assets/testpic.jpg" alt=""></a>
    </div>
</template>
<script>
import Service from '@/utils/request';
export default {
    data() {
        return {
            userId: '',
            page: 1,
            dataList: [], // 存储返回的数据
        };
    },
    mounted() {
        this.getfirstemoji();
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        // 在组件销毁之前移除滚动事件监听器
        window.removeEventListener('scroll', this.handleScroll);
    },
    created() {
        this.getParams()
    },
    methods: {
        getParams() {
            const routerParams = this.$route.query.id
            this.userId = routerParams
        },
        getfirstemoji() {
            // 使用axios获取数据
            Service.get("/favorite/list/" + this.userId, {
                params: {
                    page: 1,
                    pageSize: 20
                }

            }).then(response => {
                if (response.code === 1) {
                    console.log(response)
                    this.dataList = response.data.records;
                } else {
                    // 处理错误情况
                    console.error('请求失败：' + response.msg);
                }
            }).catch(error => {
                console.error('请求出错：' + error);
            });
        },
        getnextemoji() {
            // 使用axios获取数据
            Service.get("/favorite/list/" + this.userId, {
                params: {
                    page: 1,
                    pageSize: 20
                }

            }).then(response => {
                if (response.code === 1) {
                    this.dataList = this.dataList.concat(response.data.records);
                    console.log(this.dataList.length)
                } else {
                    // 处理错误情况
                    console.error('请求失败：' + response.msg);
                }
            }).catch(error => {
                console.error('请求出错：' + error);
            });
        },
        handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
            if (scrollPercentage >= 95) {
                const currentTime = new Date().getTime();
                if (!this.lastScrollTime || (currentTime - this.lastScrollTime) > 500) {
                    this.page++;
                    // 滚动到底部，执行返回操作
                    this.getnextemoji();

                    window.scrollTo(0, windowHeight * ((this.page - 2) * 10 + 20 / (this.page - 1) * 10 + 20));

                    this.lastScrollTime = currentTime;
                }
            }
        },


    },
}
</script>
<style scoped>
* {
    font-family: 'Oswald', sans-serif;
}

.authorstar {
    font-family: 'Oswald', sans-serif;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-left: 8%;
    width: 84%;
    background-color: white;
}

.authorstar a {
    width: 300px;
    height: 20vh;
    margin: 15px;
    background-color: rgb(247, 247, 198);
    transition-property: transform, box-shadow;
    transition-duration: .3s, .3s;
    text-decoration: none;
    position: relative;
    /* 设置父容器为相对定位，以容纳绝对定位的图像 */
    display: block;
    /* 确保锚点元素作为块级元素显示 */
    overflow: hidden;
    /* 隐藏超出容器的内容 */
}

.authorstar a:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.authorstar a img {
    position: absolute;
    /* 图像绝对定位，相对于父容器 */
    top: 0;
    left: 0;
    width: 100%;
    /* 图像宽度填充容器 */
    height: 100%;
    /* 图像高度填充容器 */
    object-fit: cover;
    /* 以覆盖方式截取和填充图像 */
}

.authorstar a span {
    display: none;
    position: absolute;
    height: 15%;
    width: 100%;
    top: 80%;
    left: 10px;
    background-color: rbga(0, 0, 0, .4);
    text-align: left;
    color: chartreuse;
}

.authorstar a:hover span {
    display: block;
}
</style>
