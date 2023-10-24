<template>
    <div class="login">
        <div class="loginmain">
            <h1>EmoVerse</h1>
            <p style="font-size:20px;margin-left: 120px;">What's your emotion?</p>
            <div class="form-box">
                <div class="button-box">
                    <div v-color="color1" id="btn" ref="slidingbtn"></div>
                    <button type="button" class="toggle-btn" @click="leftClick()">Log in</button>
                    <button type="button" class="toggle-btn btnright" @click="rightClick()"> Sign Up</button>
                </div>
            </div>
            <div class="logininput" v-if="showlogin">
                <el-form ref="loginFormRef" :model="loginData" :rules="loginFormRules" label-width="60px">
                    <el-form-item prop="email" style="margin-top:20px;margin-bottom: 30px;">
                        <el-input v-model="loginData.email" placeholder="Username" :suffix-icon="User"
                            input-style="font-family: 'Raleway', sans-serif;"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" style="margin-bottom: 20px;">
                        <el-input v-model="loginData.password" type="password" placeholder="Password" :suffix-icon="Lock"
                            input-style="font-family: 'Raleway', sans-serif;"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="70">

                            <el-col :span="24">
                                <el-button class="long-button" type="primary" @click="login">Login </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="70">

                            <el-col :span="24">
                                <el-button class="long-button lwg" type="info" @click="loginwithgoogle">Login with Google
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="70">

                            <el-col :span="24">
                                <el-button class="long-button lww" type="info" @click="loginwithwechat">Login with Wechat
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item class="elpolicy">
                        <el-row>
                            <el-col style="text-align: center;">
                                <span>By logging in you agree to Jianbing's Terms of Service and
                                    Privacy Policy
                                </span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
            <div class="registerinput" v-else>
                <el-form ref="registerFormRef" :model="registerData" :rules="registerFormRules" label-width="60px">
                    <el-form-item prop="email" style="margin-top:20px;margin-bottom: 30px;">
                        <el-input v-model="registerData.email" placeholder="Username" :suffix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" style="margin-bottom: 20px;">
                        <el-input v-model="registerData.password" type="password" placeholder="password"
                            :suffix-icon="Lock"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmpassword" style="margin-bottom: 20px;">
                        <el-input v-model="registerData.confirmpassword" type="password" placeholder="Comfirm your password"
                            :suffix-icon="Lock"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="70">

                            <el-col :span="24">
                                <el-button class="long-button" type="primary" @click="handleregister">Sign Up </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="70">

                            <el-col :span="24">
                                <el-button class="long-button lwg" type="info" @click="signupwithgoogle">Sign Up with Google
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="70">

                            <el-col :span="24">
                                <el-button class="long-button lww" type="info" @click="signupwithwechat">Sign Up with Wechat
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="emopic">

        </div>
    </div>
</template>
<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Service from '@/utils/request';
const registerFormRef = ref('')
const registerData = reactive({
    email: '',
    password: '',
    confirmpassword: ''
})
const validateConfirmPassword = (rule, value, callback) => {
    if (value !== registerData.password) {
        callback(new Error('Passwords do not match'));
    } else {
        callback();
    }
};
const registerFormRules = reactive({
    email: [
        { required: true, message: 'Please input email', trigger: 'blur' },
        { min: 4, max: 100, message: 'Length should be 4 to 100', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please input password', trigger: 'blur' },
        { min: 6, max: 100, message: 'Length should be 6 to 100', trigger: 'blur' },
    ],
    confirmpassword: [
        { required: true, message: 'Please input confirmpassword', trigger: 'blur' },
        { min: 4, max: 100, message: 'Length should be 4 to 100', trigger: 'blur' },
        { validator: validateConfirmPassword, trigger: 'blur' }, // 添加自定义验证函数
    ],
});
const router = useRouter()
const reloadPage = async () => {
    ElMessage.success('注册成功！');

    // 等待一段时间，例如3秒
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 隐藏消息提示框
    ElMessage.closeAll();

    // 刷新页面
};
const handleregister = () => {
    registerFormRef.value.validate((valid) => {
        if (valid) {
            Service.post("/user/register", {
                username: registerData.email,
                password: registerData.password
            }).then(res => {
                console.log(res.data)
                if (res.data.data.msg === '注册成功!') {
                    location.reload();
                    reloadPage()
                    registerData.email = ''
                    registerData.password = ''
                    registerData.confirmpassword = ''
                }
                else {
                    registerData.email = ''
                    registerData.password = ''
                    registerData.confirmpassword = ''
                    ElMessage.error('Username already exists')
                }
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            return
        }
    })
}
</script >

<script>
import axios from 'axios';
import Service from '@/utils/request';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            loginData: {
                email: '',
                password: ''
            },
            loginFormRules: {
                email: [{
                    required: true, message: "input email", trigger: 'blur'
                },
                {
                    min: 4,
                    max: 100,
                    message: 'email name should be between 4 and 100',
                }
                ],
                password: [{
                    required: true, message: "input password", trigger: 'blur'
                },
                {
                    min: 6,
                    max: 100,
                    message: 'password name should be between 6 and 100',
                }
                ]
            },
            userToken: '',
            showlogin: true,
            registerFormRef: ref(''),
            registerData: reactive({
                email: '',
                password: '',
                confirmpassword: ''
            }),
            color1: 'linear-gradient(135deg, rgb(11, 72, 239), rgb(17, 197, 149))',
            color2: 'rgb(255, 167, 69)'
        };
    },
    methods: {
        ...mapMutations(['changeLogin']),
        leftClick() {
            const slidingbtn = this.$refs.slidingbtn;
            slidingbtn.style.left = '0'
            this.color1 = 'linear-gradient(135deg, rgb(11, 72, 239), rgb(17, 197, 149))'
            this.showlogin = true
        },
        rightClick() {
            const slidingbtn = this.$refs.slidingbtn;
            slidingbtn.style.left = '140px'
            this.color1 = 'linear-gradient(180deg, rgb(255, 107, 144), rgb(252, 217, 156))'
            this.showlogin = false
        },
        login() {
            let _this = this;
            this.$refs.loginFormRef.validate(valid => {
                if (!valid) {
                    return
                }
                else {
                    Service.post("/user/login", {
                        username: this.loginData.email,
                        password: this.loginData.password
                    }).then((response) => {
                        console.log(response.data)
                        if (response.data.code === 1) {
                            _this.userToken = 'Token ' + response.data.data.token
                            _this.changeLogin({ Authorization: _this.userToken });
                            _this.$router.push('/');
                            ElMessage.success('Successfully Login')
                        }
                        else {
                            ElMessage.error('Incorrect username or password')
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
            })
        }
    },
    directives: {
        color: {

            created(el, binding) {
                console.log(el, binding.value)
                el.style.background = binding.value
            },
            updated(el, binding) {
                el.style.background = binding.value

            },
        }
    }

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=PT+Serif:ital@1&family=Play:wght@700&family=Satisfy&family=Space+Grotesk&family=Ubuntu:ital@1&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Croissant+One&family=Fuggles&family=Open+Sans&family=PT+Serif:ital@1&family=Play:wght@700&family=Roboto+Mono:ital,wght@0,200;1,100&family=Satisfy&family=Space+Grotesk&family=Ubuntu:ital@1&display=swap');


@import url('https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300&display=swap');


@import url('https://fonts.googleapis.com/css2?family=Signika+Negative&display=swap');


@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,300&display=swap');

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600&display=swap');

.login {
    width: 100%;
    height: 100%;
    background-image: -moz-linear-gradient(45deg, rgb(206, 250, 117), rgb(97, 77, 249));

    background-image: -webkit-linear-gradient(45deg, rgb(206, 250, 117), rgb(97, 77, 249));

    background-image: linear-gradient(45deg, rgb(206, 250, 117), rgb(97, 77, 249));
}

.loginmain {
    position: absolute;
    left: 0;
    width: 40%;
    top: 60px;

}

.loginmain h1 {
    font-family: 'Open Sans', sans-serif;
    color: white;
    font-size: 55px;
    margin-left: 110px;
}

.loginmain p {
    font-family: 'Croissant One', cursive;
    background-image:
        linear-gradient(90deg,
            #673ab7,
            #e91e63);
    background-clip: text;
    -webkit-background-clip: text;
    /* background-clip: text;需要 */
    -webkit-text-fill-color: transparent;
    background-image:
        linear-gradient(90deg,
            rgb(255, 167, 69),
            rgb(254, 134, 159),
            rgb(239, 122, 200),
            rgb(160, 131, 237),
            rgb(67, 174, 255),
            rgb(160, 131, 237),
            rgb(239, 122, 200),
            rgb(254, 134, 159),
            rgb(255, 167, 69));
    background-size: 200%;
}

.loginmain p {
    animation: streamer 2s linear infinite;
}

@keyframes streamer {
    0% {
        background-position: 0%;
    }

    100% {
        background-position: 200%;
    }
}

.logininput {
    margin-top: 20px;
}

.emopic {
    position: absolute;
    right: 0;
    width: 60%;
    height: 100%;
    background-image: -moz-linear-gradient(0deg, rgb(238, 17, 72), rgb(15, 134, 189));

    background-image: -webkit-linear-gradient(0deg, rgb(238, 17, 72), rgb(15, 134, 189));

    background-image: linear-gradient(0deg, rgb(238, 17, 72), rgb(15, 134, 189));

}

.button-box {
    width: 280px;
    margin: 10px auto;
    margin-left: 90px;
    position: relative;
    border-radius: 30px;
    background: #715050;
    text-align: center;
}

.toggle-btn {
    cursor: pointer;
    background: transparent;
    border: 0;
    outline: none;
    position: relative;
    text-align: center;
    font-family: 'Martian Mono', monospace;
    font-weight: 800;
    color: white;
    width: 140px;
    height: 40px;
}


#btn {
    left: 0;
    top: 0;
    position: absolute;
    width: 140px;
    height: 100%;
    border-radius: 30px;
    transition: 0.5s;
}

.el-form {
    font-size: 30px !important;
}



.el-form .elres .el-form-item__content {
    margin-left: 0 !important;
}

.el-form-item {
    margin-left: 0 !important;
}

.logininput {
    width: 80%;

}

.long-button {
    width: 350px;

}

.lww {
    background-color: black;

}

.lwg {
    background-color: black;
}

.registerinput {
    width: 80%;
}
</style>