<template>
    <div class="trendcontent">
        <a href=""><img src="@/assets/testpic.jpg" alt=""> <span>Author:Lan</span></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    },
}
</script>
<style scoped>
.trendcontent {
    display: flex;
    height: 100%;
    justify-content: center;
    flex-wrap: wrap;
    width: 90%;
    background-color: white;
}

.trendcontent a {
    width: 270px;
    height: 190px;
    background-color: rgb(247, 247, 198);
    margin: 20px;
    transition-property: transform, box-shadow;
    transition-duration: .3s, .3s;
    text-decoration: none;
}

.trendcontent a:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.trendcontent a img {
    width: 270px;
    height: 190px;
}

.trendcontent a span {
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

.trendcontent a:hover span {
    display: block;
}
</style>
