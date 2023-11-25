<template>
    <div class="set">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <data>
                        <span>UserData</span>
                        <el-button class="button" @click="isEditing ? saveChanges() : toggleEditMode()">
                            {{ isEditing ? "Save" : "Edit" }}
                        </el-button>
                    </data>
                    <el-button class="button2" @click="exit">EXIT</el-button>
                </div>
            </template>
            <div class="text item" v-if="!isEditing">Username: {{ this.userdata.username }}</div>
            <div class="text item" v-if="!isEditing">Password: </div>
            <div class="text item" v-if="!isEditing">Signature: {{ this.userdata.signature }}</div>

            <div class="text item" v-if="isEditing">
                <label for="username">Username: </label>
                <el-input type="text" id="username" v-model="editedData.username" style="width:60%;">
                </el-input>
            </div>
            <div class="text item" v-if="isEditing">
                <label for="username">Password: </label>
                <el-input type="text" id="password" v-model="editedData.password" style="width:60%;">
                </el-input>
            </div>
            <div class="text item" v-if="isEditing">
                <label for="signature">Signature: </label>
                <el-input type="text" id="signature" v-model="editedData.signature" style="width:60%;">
                </el-input>
            </div>

        </el-card>
    </div>
</template>
  
<script>
import axios from 'axios';
import Service from '@/utils/request';
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            ID: '',
            userID: '',
            userToken: '',
            userdata: {
                createTime: '',
                email: '',
                gender: '',
                id: '',
                isOfficial: '',
                profilePhoto: '',
                signature: '',
                username: '',
                password: '',
            },
            isEditing: false,
            editedData: {
                email: '',
                username: '',
                password: '',
                gender: '',
                profilePhoto: '',
                signature: '',
            }
        }
    },
    mounted() {
        this.getuserdata();
    },
    methods: {
        ...mapMutations(['changeLogin']),
        toggleEditMode() {
            this.isEditing = !this.isEditing;
            if (this.isEditing) {
                this.editedData = { ...this.userdata };
            }
        },
        saveChanges() {
            // // console.log(this.editedData)
            axios.interceptors.request.use((config) => {
                if (localStorage.getItem('Authorization')) {
                    config.headers.Authorization = localStorage.getItem('Authorization')
                }
                return config;
            }, (error) => {
                return Promise.reject(error);
            });
            Service.put('/user', this.editedData)
                .then(response => {
                    // // console.log(response)
                    if (response.code === 1) {
                        this.userdata = { ...this.editedData };
                        console.log(this.userdata)
                        this.toggleEditMode();
                        ElMessage.success('Successfully edit!');

                        // 在第一个请求完成后等待一秒钟再触发第二个请求
                        return new Promise(resolve => {
                            setTimeout(() => {
                                resolve(Service.post("/user/login", {
                                    username: this.userdata.username,
                                    password: this.userdata.password
                                }));
                            }, 1000); // 1000毫秒等于1秒
                        });
                    }
                })
                .then((response) => {
                    let _this = this;
                    // // console.log(response)
                    if (response.code === 1) {
                        _this.userToken = 'Token ' + response.data.token;
                        _this.userID = response.data.id;
                        _this.changeLogin({ Authorization: _this.userToken, ID: _this.userID });
                        this.$router.push('/')
                    }
                })
                .catch(error => {
                    // // console.log(error);
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
            Service.get('user/' + this.ID).then((response) => {
                // console.log(response);
                if (response.code === 1) {
                    this.userdata = response.data;
                    // console.log(this.userdata)
                }
            }).catch(error => {
                // console.log(error);
            });
        },
        exit() {
            ElMessageBox.confirm('Are you sure you want to exit?', 'Confirmation', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning',
            })
                .then(() => {
                    // 处理确认退出逻辑
                    // 例如：跳转到登录页面
                    localStorage.removeItem('Authorization');
                    localStorage.removeItem('ID');
                    this.$router.push('/login');
                })
                .catch(() => {
                    // 取消操作
                });

        }
    }
}
</script>
  
<style scoped>
@import url('https://fonts.font.im/css?family=Open+Sans+Condensed:300');

.set {
    display: flex;
    flex-wrap: wrap;
    margin-left: 8%;
}

.box-card {
    font-family: 'Open Sans Condensed', sans-serif;
    margin-top: 20px;
}

.card-header {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 20px;
    font-family: 'Open Sans Condensed', sans-serif;
}

.item {
    margin-bottom: 18px;
    font-family: 'Open Sans Condensed', sans-serif;
}

.box-card {
    width: 60%;
}

.button {
    margin-left: 10px;
    font-family: 'Open Sans Condensed', sans-serif;
}

.button2 {
    font-family: 'Open Sans Condensed', sans-serif;
}


@media (max-width: 800px) {
    .box-card {
        width: 90%;
    }
}
</style>
  