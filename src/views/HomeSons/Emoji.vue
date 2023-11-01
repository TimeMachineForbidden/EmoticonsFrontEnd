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
                <div class="image"><img src="@/assets/testpic.jpg" alt=""></div>
                <div class="AuthorInformation">
                    <div class="information">
                        <div class="left">
                            <a><img src="@/assets/testpic.jpg" alt=""></a>
                        </div>
                        <div class="right">
                            <h2>username:{{ userdata.username }}</h2>
                            <div>signature:{{ userdata.signature }}</div>
                        </div>
                    </div>
                    <div class="data">
                        <a>220 follows</a>
                        <a>220 stars</a>
                        <a>220 collections</a>
                    </div>
                    <div class="operate">
                        <a>Like</a>
                        <a>Star</a>
                        <a>Download</a>
                        <a>Share</a>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="discussion">
                nihao
            </div>
        </div>
    </div>
</template>

<script setup>
import { ArrowLeft } from '@element-plus/icons-vue'
</script >
<script>
import axios from 'axios';
export default {
    data() {
        return {
            ID: '',
            headers: {
                Authorization: localStorage.getItem('Authorization')
            },
            userdata: {
                createTime: '',
                email: '',
                gender: '',
                id: '',
                isOfficial: '',
                profilePhoto: '',
                signature: '',
                username: '',
            }
        }
    },
    mounted() {
        this.getuserdata();
    },
    methods: {
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
            axios.get('http://123.249.110.185:8080/user/' + this.ID).then((response) => {
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
        }
    }
}
</script>

<style scoped>
.home {
    min-height: 110vh;
    width: 100%;
    background-image: -moz-linear-gradient(180deg, rgb(156, 206, 252), rgb(117, 250, 170));

    background-image: -webkit-linear-gradient(180deg, rgb(156, 206, 252), rgb(117, 250, 170));

    background-image: linear-gradient(180deg, rgb(156, 206, 252), rgb(117, 250, 170));
}

.main-container {
    display: grid;
    width: 84%;
    /* 设置宽度为页面宽度的80% */
    margin: 0 auto;
    /* 居中对齐 */
    padding: 10px;
    /* 设置内边距 */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
    border-radius: 10px;
    background-image: -moz-linear-gradient(90deg, rgb(168, 255, 203), rgb(255, 184, 197));

    background-image: -webkit-linear-gradient(90deg, rgb(168, 255, 203), rgb(255, 184, 197));

    background-image: linear-gradient(90deg, rgb(168, 255, 203), rgb(255, 184, 197));
}

.main-container .emoji {
    height: 90%;
    display: flex;
}

.main-container .emoji .image {
    margin-top: 20px;
    width: 55vw;
    height: 55vw;
    display: block;
    /* 确保.image容器是块级元素 */
}

.main-container .emoji .image img {
    width: 70%;
    height: 70%;
    display: block;
    /* 确保图像是块级元素 */
    margin: 0 auto;
    /* 将图像水平居中 */
}

.main-container .emoji .AuthorInformation .information {
    margin-top: 20px;
    display: flex;
    height: 10vh;
    justify-content: left;
}


.main-container .emoji .AuthorInformation .information .left {
    margin-right: 1.5%;
    width: 10vh;
}

.main-container .emoji .AuthorInformation .information .right {
    display: grid;
    align-content: flex-end;
    font-family: 'Oswald';
}

.main-container .emoji .AuthorInformation .information .left a {
    width: 10vh;
    height: 10vh;
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

.main-container .emoji .AuthorInformation .operate {
    display: grid;
    margin-top: 20px;
}

.main-container .emoji .AuthorInformation .operate a {
    margin-top: 20px;
}

.main-container .backhome {
    cursor: pointer;
    top: 10px
}

.backhome span {
    font-size: 20px;
}
</style>