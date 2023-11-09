<template>
    <div class="home">
        <div class="userheader">
            <h2>User</h2>
        </div>
        <div class="main-container">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Service from '@/utils/request';
export default {
    data() {
        return {
            ID: '',
            headers: {
                Authorization: localStorage.getItem('Authorization')
            },
        }
    },
    mounted() {
        this.getuserdata();
    },
    methods: {

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

.userheader {
    padding: 20px;
    /* 设置内边距 */
    text-align: center;
}

.main-container {
    width: 80%;
    /* 设置宽度为页面宽度的80% */
    margin: 0 auto;
    /* 居中对齐 */
    padding: 10px;
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