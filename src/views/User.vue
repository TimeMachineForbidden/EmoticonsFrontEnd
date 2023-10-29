<template>
    <div class="home">
        <div class="uploadheader">
            <h2>User</h2>
        </div>
        <div class="main-container">
            {{ this.userdata.createTime }}
        </div>
    </div>
</template>

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

.uploadheader {
    background-color: none;
    /* 设置头部背景色为白色 */
    padding: 20px;
    /* 设置内边距 */
    text-align: center;
}

.main-container {
    width: 80%;
    /* 设置宽度为页面宽度的80% */
    margin: 0 auto;
    /* 居中对齐 */
    background-color: white;
    /* 设置中间大盒子背景色为白色 */
    padding: 20px;
    /* 设置内边距 */
    min-height: 80vh;
    /* 设置最小高度为110视窗高度（vh） */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* 添加阴影效果 */
    border-radius: 10px;
    background-image: -moz-linear-gradient(125deg, rgb(0, 255, 255), rgb(240, 155, 253));

    background-image: -webkit-linear-gradient(125deg, rgb(0, 255, 255), rgb(240, 155, 253));

    background-image: linear-gradient(125deg, rgb(0, 255, 255), rgb(240, 155, 253));
}
</style>