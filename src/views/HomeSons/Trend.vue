<template>
    <div class="trendcontent">
        <a v-for="(item, index) in dataList" :key="index"><img src="@/assets/testpic.jpg" alt=""><span>Author:{{
            item.createUser }}</span></a>
    </div>
</template>
<script>
import axios from 'axios';
import Service from '@/utils/request.js';
export default {
    data() {
        return {
            page: 1,
            dataList: [], // 存储返回的数据
        };
    },
    mounted() {
        this.getfirstemoji();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        getfirstemoji() {
            // 使用axios获取数据
            axios.get('http://123.249.110.185:8080/emoji', {
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
        getemoji() {
            // 使用axios获取数据
            axios.get('http://123.249.110.185:8080/emoji', {
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

            if (scrollPercentage >= 99) {
                this.page++;
                // 滚动到底部，执行返回操作
                this.getemoji();
                window.scrollTo(0, windowHeight * ((this.page - 2) * 10 + 20 / (this.page - 1) * 10 + 20));
            }
        }

    },
}
</script>
<style scoped>
.trendcontent {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 84%;
    background-color: white;
}

.trendcontent a {
    width: 20%;
    height: 20vh;
    margin: 20px;
    background-color: rgb(247, 247, 198);
    transition-property: transform, box-shadow;
    transition-duration: .3s, .3s;
    text-decoration: none;
}

.trendcontent a:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.trendcontent a img {
    width: 100%;
    height: 100%;
}

.trendcontent a span {
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

.trendcontent a:hover span {
    display: block;
}
</style>
