<template>
  <div :span="22" id="check" class="btn-div">
    <el-button type="primary" size="small" @click="accountCheck" class="check-account">账号审核</el-button>
    <el-button type="primary" size="small" @click="advertisingCheck" class="check-advertising">广告位审核</el-button>
  </div>
</template>
<script>
  // var h = document.documentElement.clientHeight;
  // document.getElementById("check").style.height=h-50+"px";

  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      accountCheck(){
        this.$router.push({
          path: '/check/accountLIst'
        })
      },
      advertisingCheck(){
        this.$router.push({
          path: '/check/advertisingList'
        })
      }
    },
    computed: {}
  }
</script>
<style scoped lang="scss">
  .btn-div {
    overflow: hidden;
    height: 500px;
  }

  .check-account {
    margin-left: 260px;
    margin-top: 260px;
    float: left;
  }

  .check-advertising{
    margin-right: 260px;
    margin-top: 260px;
    float: right;
  }
</style>

