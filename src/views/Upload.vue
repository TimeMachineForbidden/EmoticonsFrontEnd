<template>
    <div class="uploadpage">
        <div class="uploadheader">
            <h2>Upload</h2>
        </div>
        <div class="main-container">
            <div class="beforeupload" v-if="beforeuploaded">
                <div class="uploadtips">
                    <h2 style="color: white;">You can Upload here</h2>
                </div>
                <div class="uploadfield">
                    <el-upload class="upload-demo" drag action="http://123.249.110.185:8080/common/upload"
                        :headers="headers" multiple :on-success="successfn" :limit="1">
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template>
                    </el-upload>
                </div>
            </div>
            <div class="afterupload" v-else>
                <div class="leftpart">
                    <div class="backward" @click="back">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                        <span>Back</span>
                    </div>
                    <div class="displayimg">
                        <div class="imgintroduction">
                            <p>Pic:</p>
                            <span>{{ imageName }}</span>
                        </div>
                        <img :src="imageUrl">
                    </div>
                </div>
                <div class="rightpart">
                    <div class="emoinfo"></div>
                    <el-form ref="EmoticonFormRef" :model="EmoticonData" :rules="EmoticonFormRules" label-width="60px"
                        label-position='top'>
                        <el-form-item>
                            <el-row :gutter="70">
                                <el-col :span="24">
                                    <h1>Add Info</h1>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="Emoticon name" prop="name" style="margin-top:20px;margin-bottom: 30px;">
                            <el-input v-model="EmoticonData.name" placeholder="Name"
                                input-style="font-family: 'Raleway', sans-serif;"></el-input>
                        </el-form-item>
                        <el-form-item label="Emoticon Description" prop="desciption" style="margin-bottom: 20px;">
                            <el-input v-model="EmoticonData.description" placeholder="Description"
                                input-style="font-family: 'Raleway', sans-serif;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-row :gutter="70">
                                <el-col :span="24">
                                    <el-button class="long-button" type="primary" @click="uploademoji">Upload </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-row :gutter="70">
                                <el-col :span="24">
                                    <el-button class="long-button" type="danger" @click="back">Cancel </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>

                    </el-form>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue'
</script>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            imageUrl: '',
            imageName: '',
            headers: {
                Authorization: localStorage.getItem('Authorization')
            },
            beforeuploaded: true,
            EmoticonData: {
                name: '',
                description: ''
            },
            loginFormRules: {
                name: [{
                    required: true, message: "input name", trigger: 'blur'
                },
                {
                    min: 4,
                    max: 100,
                    message: 'Emoticon name should be between 4 and 100',
                }
                ],
                description: [{
                    required: false, message: "input description", trigger: 'blur'
                },
                {
                    min: 6,
                    max: 100,
                    message: 'description name should be between 6 and 100',
                }
                ]
            },
        }
    },
    mounted() {
    },
    beforeDestroy() {
        console.log("niaho")
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        successfn(response, file, fileList) {
            this.imageName = file.name
            this.imageUrl = response.data
            this.beforeuploaded = false;
            ElMessage.success('Successfully Upload')
        },
        back() {
            this.imageName = ''
            this.imageUrl = ''
            this.beforeuploaded = true;
        },
        uploademoji() {
            let _this = this;
            this.$refs.EmoticonFormRef.validate(valid => {
                if (!valid) {
                    return
                }
                else {
                    console.log(localStorage.getItem('Authorization'))
                    axios.interceptors.request.use((config) => {
                        if (localStorage.getItem('Authorization')) {
                            config.headers.Authorization = localStorage.getItem('Authorization')
                        }
                        return config;
                    }, (error) => {
                        return Promise.reject(error);
                    });
                    axios.post('http://123.249.110.185:8080/emoji', {
                        name: this.EmoticonData.name,
                        description: this.EmoticonData.description,
                        url: this.imageUrl,
                    }).then((response) => {
                        console.log(response)

                        if (response.code === 1) {
                            ElMessage.success('Successfully Upload')
                            this.$router.push('/')
                        }
                        else {
                            ElMessage.error('Something Went Wrong!Please try again!')
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
            })
        }

    },
}
</script>
<style scoped>
.uploadpage {
    height: 110vh;
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

.main-container .uploadheader h2 {
    text-align: center;
    margin: 0 auto;
}

.main-container .uploadfield {
    width: 90%;
    margin: 0 auto;
    margin-top: 5%;
}

.main-container .afterupload {
    width: 100%;
    height: 80vh;
    display: flex;
    padding: 0;
}

.main-container .afterupload .leftpart {
    width: 50%;
    height: 100%;
    position: relative;

    border-radius: 5px;
}

.main-container .afterupload .leftpart .backward {
    position: absolute;
    cursor: pointer;
    top: 10px
}

.backward span {
    font-size: 20px;
}

.displayimg {
    width: 95%;
    height: 70%;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 70px;
}

.displayimg img {
    width: 100%;
    width: 100%;
    display: block;
    margin: 0 auto;

}

.main-container .afterupload .rightpart {
    width: 50%;
    height: 100%;
    background-image: -moz-linear-gradient(90deg, rgb(62, 249, 233), rgb(157, 251, 245));

    background-image: -webkit-linear-gradient(90deg, rgb(62, 249, 233), rgb(157, 251, 245));

    background-image: linear-gradient(90deg, rgb(62, 249, 233), rgb(157, 251, 245));
    border-radius: 5px;
}

.emoinfo {
    width: 90%;
}

.long-button {
    width: 350px;
    margin: 0 auto;
}
</style>
