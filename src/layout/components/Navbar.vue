<template>
  <div class="navbar">
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="breadcrumb-container">
      <a href="/">
        <img
          class="breadcrumb-container-img"
          src="data:image/png;base64,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"
          alt
        />
      </a>
    </div>
    <div class="right-menu">
      <div class="avatar-container">
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <img
              width="35px"
              height="35px;"
              style="display: inline-block; margin-top: 8px;"
              src="../../icons/avatar.png"
              alt
            />
            <div class="user-name">{{names}}</div>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <!-- <router-link to="/">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link> -->
            <el-dropdown-item divided @click.native="change_password">
              <span style="display:block;">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logouts">
              <span style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { logOut } from "@/api/account";
import { clearAll } from '@/utils/persistent'
import { removeToken,removeTokenType, getAccountName, removeTokenId, removeAccountName } from '@/utils/auth'
import {resetRouter} from "@/router";

export default {
  data() {
    return {
      names:''
    };
  },
  created(){
    // console.log(getAccountName(),'8888888')
    this.names=getAccountName()
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // async logout() {
    //   await this.$store.dispatch("user/logout");
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    //   window.location.reload();
    // }
    logouts(){
      logOut().then(res=>{
        if(res.code===200){
          removeTokenType('token_type')
          removeToken('token')
          removeTokenId()
          removeAccountName()
          clearAll()
          resetRouter()
          // removeToken('token_id')
          this.$router. push('/login')
          // window.location.reload();
        }
      })
    },
    change_password(){
      this.$router.push({
        path:'/login/ChangePassword'
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #1f242e;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    .breadcrumb-container-img {
      width: 160px;
      margin-top: 10px;
      margin-left: 15px;
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        .avatar-wrapper-img {
          width: 40px;
          height: 40px;
          line-height: 40px;
          display: inline-block;
        }
        .user-name {
          display: inline-block;
          margin-left: 10px;
          height: 50px;
          line-height: 50px;
          font-size: 14px;
          color: #fff;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
