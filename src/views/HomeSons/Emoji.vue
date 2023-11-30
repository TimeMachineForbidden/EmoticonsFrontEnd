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
                <div class="image"><img :src="this.url" alt="">
                    <div class="operate">
                        <a @click="starEmoji(this.emojiID)"><el-icon>
                                <Star />
                            </el-icon> {{ this.favorites }}</a>
                        <a><el-icon @click="downloadEmoji(this.url)">
                                <Download />
                            </el-icon> {{ this.downloads }}</a>
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
                            <a><img :src="authordata.profilePhoto" alt=""></a>
                        </div>
                        <div class="right">
                            <h style="font-size:1.5vw">name:{{ authordata.username }}</h>
                            <div>signature:{{ authordata.signature }}</div>
                        </div>
                        <el-divider></el-divider>
                        <div>You may like:</div>
                        <div class="relatedemoji">
                            <a v-for="(item, index) in dataList" :key="index"><img src="@/assets/testpic.jpg"
                                    alt=""><span>author:{{
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
import { Download } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
</script >
<script>
import axios from 'axios';
import Service from '@/utils/request';
export default {
    data() {
        return {
            emojiID: '',
            url: '',
            favorites: '',
            downloads: '',
            page: 1,
            dataList: [], // 存储返回的数据
            lastScrollTime: '',
            authordata: {
                createTime: '',
                email: '',
                gender: '',
                id: '',
                isOfficial: '',
                profilePhoto: '',
                signature: '',
                username: '',
                hits: ''
                // similar: {}
            },
        }
    },
    mounted() {
        this.getuserdata();
        this.getemojiInformation();
        this.getfirstemoji();
        window.scrollTo(0, 0);
    },
    created() {
        this.getParams()
    },
    methods: {
        getParams() {
            const routerParams = this.$route.query.id
            this.emojiID = routerParams
            // console.log(this.emojiID)
        },
        getemojiInformation() {
            Service.get('/emoji/' + this.emojiID, {
            }).then((response) => {
                // console.log(response);
                if (response.code === 1) {
                    this.url = response.data.url;
                    this.favorites = response.data.favorite;
                    this.downloads = response.data.downloads;
                    this.hits = response.data.hits
                }
            }).catch(error => {
                // console.log(error);
            });

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
                // console.log(response);
                if (response.code === 1) {
                    this.userdata = response.data;
                    // console.log(this.userdata)
                }
            }).catch(error => {
                // console.log(error);
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
                    // console.log(response)
                    this.dataList = response.data.records;
                } else {
                    // 处理错误情况
                    // console.error('请求失败：' + response.msg);
                }
            }).catch(error => {
                // console.error('请求出错：' + error);
            });
        },
        starEmoji(id) {
            axios.interceptors.request.use((config) => {
                if (localStorage.getItem('Authorization')) {
                    config.headers.Authorization = localStorage.getItem('Authorization')
                }
                return config;
            }, (error) => {
                return Promise.reject(error);
            });
            Service.post(`/favorite?emojiId=${id}`).then((response) => {
                // console.log(response)
                if (response.code === 1) {
                    ElMessage.success('Successfully star!')
                } else {
                    // 处理错误情况
                    ElMessage.error('You have already stared the emoji!')
                }
            }).catch(error => {
                ElMessage.error('Please login first!')
            });

        },
        downloadEmoji(url) {

            if (localStorage.getItem('Authorization')) {
                axios.interceptors.request.use((config) => {
                    if (localStorage.getItem('Authorization')) {
                        config.headers.Authorization = localStorage.getItem('Authorization')
                    }
                    return config;
                }, (error) => {
                    return Promise.reject(error);
                });
                Service.put('/emoji/download', {
                    emojiId: this.emojiID
                }).then((response) => {
                    console.log(response);
                })
                const link = document.createElement('a');
                link.href = url;
                link.download = 'emoji_image'; // 下载文件的默认名称
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else {
                ElMessage.error('Please login first!')
            }
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

/* .main-container .emoji .image {
    margin-top: 20px;
    width: 50vw;
    height: 40vw;
}

.main-container .emoji .image img {
    width: 60%;
    height: 100%;
    display: block;
    margin: 0 auto;
} 
*/
.main-container .emoji .image {
    margin-top: 20px;
    width: 50vw;
    /* 设置固定宽度 */

    position: relative;
    /* 让内部元素相对于此容器定位 */
}

.main-container .emoji .image img {
    width: 60%;
    /* 图像宽度占满容器 */

    height: auto;
    /* 高度自适应 */

    display: block;
    /* 确保图像是块级元素 */

    /* position: absolute; */
    /* 绝对定位，相对于父容器 */

    top: 0;
    left: 0;
    /* 将图像定位在容器的左上角 */

    bottom: 0;
    right: 0;
    /* 将图像的底部和右侧与容器的底部和右侧对齐 */
    margin: 0 auto;
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
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.relatedemoji a {
    width: 20vw;
    height: 24vh;
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

@media (max-width: 800px) {
    .AuthorInformation {
        display: none;
    }

    .el-divider--vertical {
        display: none;
    }

    .image {
        width: 100vw !important;
        height: 45vw !important;
    }
}
</style>