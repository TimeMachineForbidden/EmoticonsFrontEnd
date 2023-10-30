<template>
    <div class="set">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>UserData</span>
                    <el-button class="button" @click="isEditing ? saveChanges() : toggleEditMode()">
                        {{ isEditing ? "Save" : "Edit" }}
                    </el-button>
                </div>
            </template>
            <div class="text item" v-if="!isEditing">username: {{ this.userdata.username }}</div>
            <div class="text item" v-if="!isEditing">signature: {{ this.userdata.signature }}</div>
            <div class="text item" v-if="!isEditing">gender: {{ this.userdata.gender }}</div>
            <div class="text item" v-if="!isEditing">email: {{ this.userdata.email }}</div>

            <div class="text item" v-if="isEditing">
                <label for="username">Username: </label>
                <input type="text" id="username" v-model="editedData.username" style="width:60%">
            </div>
            <div class="text item" v-if="isEditing">
                <label for="signature">Signature: </label>
                <input type="text" id="signature" v-model="editedData.signature" style="width:60%">
            </div>
            <div class="text item" v-if="isEditing">
                <label for="gender">Gender: </label>
                <input type="text" id="gender" v-model="editedData.gender" style="width:60%">
            </div>
            <div class="text item" v-if="isEditing">
                <label for="email">Email: </label>
                <input type="text" id="email" v-model="editedData.email" style="width:60%">
            </div>

        </el-card>
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
            },
            isEditing: false,
            editedData: {
                email: '',
                username: '',
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
        toggleEditMode() {
            this.isEditing = !this.isEditing;
            if (this.isEditing) {
                this.editedData = { ...this.userdata };
            }
        },
        saveChanges() {
            console.log(this.editedData)
            axios.put('http://123.249.110.185:8080/user', this.editedData)
                .then(response => {
                    console.log(response)
                    if (response.code === 1) {
                        this.userdata = { ...this.editedData };
                        this.toggleEditMode();
                    }
                })
                .catch(error => {
                    console.log(error);
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
.set {
    display: flex;
    flex-wrap: wrap;
    margin-left: 8%;
}
</style>
  
<style>
.box-card {
    margin-top: 20px;
    font-family: 'Oswald';
}

.card-header {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 20px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 55%;
}

.button {
    font-family: 'Oswald';
}
</style>
  