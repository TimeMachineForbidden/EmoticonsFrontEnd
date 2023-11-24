<template>
    <div class="home">
        <div class="main-container">
            <div class="backhome" @click="backhome">
                <el-icon>
                    <ArrowLeft />
                </el-icon>
                <span>Back</span>
            </div>
            <div class="emoji">
                <div class="image"><img src="@/assets/testpic.jpg" alt="">
                    <div class="operate">
                        <a @click="StarEmoji()"><el-icon>
                                <Star />
                            </el-icon> 220</a>
                        <a><el-icon>
                                <Download />
                            </el-icon> 220</a>
                        <a><el-icon>
                                <Share />
                            </el-icon> 220</a>
                    </div>
                    <el-divider></el-divider>
                    <div class="discussion">
                        nihao
                    </div>
                </div>
                <el-divider direction="vertical" style="height: auto;"></el-divider>
                <div class="AuthorInformation">
                    <div class="information">
                        <div class="left">
                            <a><img src="@/assets/testpic.jpg" alt=""></a>
                        </div>
                        <div class="right">
                            <h style="font-size:1.5vw">username:{{ userdata.username }}</h>
                            <el-button type="primary" class="navbtn" size="large" @click="upload"
                                style="font-family: 'Oswald', sans-serif;font-weight: 800;height: 20px;width: 10vw;">Follow</el-button>
                        </div>
                        <div class="relatedemoji">
                            <a v-for="(item, index) in dataList" :key="index"><img src="@/assets/testpic.jpg"
                                    alt=""><span>Author:{{
                                        item.createUser }}</span></a>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { Star } from '@element-plus/icons-vue';
import { Share } from '@element-plus/icons-vue';
import { Download } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
</script >
<script>
import axios from 'axios';
import Service from '@/utils/request';
export default {
    data() {
        return {
            // ID: '',
            // headers: {
            //     Authorization: localStorage.getItem('Authorization')
            // },
            emojiID: '',
            page: 1,
            dataList: [], // 存储返回的数据
            lastScrollTime: '',
            userdata: {
                createTime: '',
                email: '',
                gender: '',
                id: '',
                isOfficial: '',
                profilePhoto: '',
                signature: '',
                username: '',
            },
        }
    },
    mounted() {
        this.getuserdata();
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
            this.emojiID = routerParams
            console.log(this.emojiID)
        },
        getuserdata() {
            axios.interceptors.request.use((config) => {
                if (localStorage.getItem('Authorization')) {
                    config.headers.Authorization = localStorage.getItem('Authorization')
                }
                return config;
            }, (error) => {
                return Promise.reject(error);
            });
            this.ID = localStorage.getItem('ID')
            Service.get('/user/' + this.ID).then((response) => {
                console.log(response);
                if (response.code === 1) {
                    this.userdata = response.data;
                    console.log(this.userdata)
                }
            }).catch(error => {
                console.log(error);
            });
        },
        backhome() {
            this.$router.push('/')
        },
        getfirstemoji() {
            // 使用axios获取数据
            Service.get('/emoji', {
                params: {
                    page: 1,
                    pageSize: 5
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
            Service.get('/emoji', {
                params: {
                    page: 1,
                    pageSize: 10
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
        StarEmoji() {
            ElMessage.error('Something Went Wrong!Please try again!')
        }
    }
}
</script>
<style scoped>
* {
    font-family: 'Oswald', sans-serif;
}

.home {
    font-family: 'Oswald', sans-serif;
    /* min-height: 110vh; */
    width: 100%;
    display: flex;
    background-image: -moz-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

    background-image: -webkit-linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));

    background-image: linear-gradient(135deg, rgb(134, 134, 249), rgb(255, 247, 87));
}

.main-container {
    width: 84%;
    /* 设置宽度为页面宽度的80% */
    margin: 0 auto;
    /* 居中对齐 */
    padding: 10px;
    /* 设置内边距 */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
    border-radius: 10px;
    background-image: -moz-linear-gradient(180deg, rgb(156, 206, 252), rgb(117, 250, 170));

    background-image: -webkit-linear-gradient(180deg, rgb(156, 206, 252), rgb(117, 250, 170));

    background-image: linear-gradient(180deg, rgb(156, 206, 252), rgb(117, 250, 170));

}

.main-container .emoji {
    min-height: 150vh;
    display: flex;
}

.main-container .emoji .image {
    margin-top: 20px;
    width: 50vw;
    height: 30vw;
    display: block;
    /* 确保.image容器是块级元素 */
}

.main-container .emoji .image img {
    width: 60%;
    height: 100%;
    display: block;
    /* 确保图像是块级元素 */
    margin: 0 auto;
    /* 将图像水平居中 */
}

.main-container .emoji .AuthorInformation .information {
    width: 30vw;
    margin-top: 20px;
    /* min-height: 100vh; */
    /* display: flex; */
    justify-content: left;
}

.main-container .emoji .AuthorInformation .information .left {
    margin-right: 1.5%;
    width: 10vh;
}

.main-container .emoji .AuthorInformation .information .right {
    width: 5vw;
    display: grid;
    font-family: 'Oswald';
}

.main-container .emoji .AuthorInformation .information .left a {
    width: 5vw;
    height: 5vw;
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

.main-container .emoji .AuthorInformation .information .left a img {
    position: absolute;
    border-radius: 50%;
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

.main-container .emoji .AuthorInformation .data {
    margin-top: 10px;
}

.main-container .emoji .AuthorInformation .data a {
    margin-right: 20px;
}

.operate {
    margin-left: 20%;
    display: flex;
    font-size: 15px;
    /* margin-top: 10px; */
}

.operate a {
    cursor: pointer;
    margin-top: 20px;
    margin-right: 4%;
}

.main-container .backhome {
    cursor: pointer;
    top: 10px
}

.backhome span {
    font-size: 20px;
}

.relatedemoji {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.relatedemoji a {
    width: 20vw;
    height: 20vh;
    margin-top: 15px;
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

.relatedemoji a:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.relatedemoji a img {
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

.relatedemoji a span {
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

.relatedemoji a:hover span {
    display: block;
}
</style>