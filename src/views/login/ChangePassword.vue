<template>
    <div class="login-container">
        <div class="bodypassword">
            <div style="padding-bottom:30px;font-size:17px;font-weight:bold;">修改密码</div>
            <el-form
                :rules="rules"
                ref="form"
                :model="reset"
                class="login-form"
                auto-complete="on"
                label-position="left"
                >
                <el-form-item prop="oldPassword">
                    <el-input v-model="reset.oldPassword" type="password" placeholder="旧密码" />
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input ref="password" type="password" v-model="reset.newPassword" placeholder="新密码" />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input type="password" v-model="reset.confirmPassword" placeholder="确认密码" />
                </el-form-item>
                <br />
                <el-button
                    type="primary"
                    style="width:100%;margin-bottom:30px;"
                    @click.native.prevent="resetPassword"
                >确认</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { validPassword } from "@/utils/validate";
    import { clearAll } from '@/utils/persistent'
    import {resetUserPassword} from "@/api/user";
    import { logOut } from "@/api/account";
    import { Message } from "element-ui";
    import { removeToken,removeTokenType, getAccountName, removeTokenId, removeAccountName, getTokenId } from '@/utils/auth'
    import { resetRouter } from "@/router";
    export default {
        data() {
            const validatePassword = (rule, value, callback) => {
                if (!validPassword(value)) {
                    callback(new Error("密码不能少于八位且必须包含字母和数字"));
                } else {
                    callback();
                }
            };
            const validateConfirmPassword = (rule, value, callback) => {
                if (value != this.reset.newPassword) {
                    callback(new Error("请输入相同的密码"));
                } else {
                    callback();
                }
            };
            return {
                reset: {
                    id:'',
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                },
                rules: {
                    newPassword: [
                        { required: true, message: "请输入密码" },
                        { trigger: "blur", validator: validatePassword },
                    ],
                    confirmPassword: [
                        { required: true, message: "请输入密码" },
                        { trigger: "blur", validator: validateConfirmPassword },
                    ],
                },
            }
        },
        methods:{
            resetPassword() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.reset.id = getTokenId()
                        resetUserPassword(this.reset)
                        .then((res) => {
                        if (res.code == 200) {
                            Message.success("密码修改成功，请重新登录");
                            this.logouts();
                        }
                        })
                        .catch((error) => {
                            if (error.code == 400) {
                                Message.error("密码错误");
                            }
                            if (error.code == 100003) {
                                Message.error("新旧密码不能相同");
                            }
                        });
                    }
                });
            },
            logouts(){
                logOut().then(res=>{
                    if(res.code===200){
                        removeTokenType('token_type')
                        removeToken('token')
                        removeTokenId()
                        removeAccountName()
                        clearAll()
                        resetRouter()
                        this.$router.push('/login')
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color:#f8fafc;
    // overflow: hidden;
    position: relative;
  }

.bodypassword{
    position: absolute;
    width:25%;
    height:400px;
    top: 150px;
    left: 50%;
    margin-left: -12.5%;
    border:1px solid #ccc;
    padding:30px;
}
</style>
