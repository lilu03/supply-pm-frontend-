<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
  import {clearAll, getLocal} from "@/utils/persistent";
import store from '@/store'
  import {removeAccountName, removeToken, removeTokenId, removeTokenType} from "@/utils/auth";
  import {resetRouter} from "@/router";

export default {
  name: 'App',
  mounted() {
    const roles = getLocal('ROLES')

    if (roles) {
      store.dispatch('permission/generateRoutes', roles).then(accessRoutes => {
        this.$router.addRoutes(accessRoutes)
      })
    } else {
      removeTokenType('token_type')
      removeToken('token')
      removeTokenId()
      removeAccountName()
      clearAll()
      resetRouter()
      // removeToken('token_id')
      this.$router. push('/login')
    }
  }
};
</script>

<style lang="scss">
.el-button--inmobi {
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 4px;
}
.el-input--inmobi {
  font-size: 13px;
}
.el-input__inner {
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(216, 220, 230, 1);
}
.el-form-item__label {
  font-size: 14px;
  font-weight: 400;
  color: rgba(20, 1, 1, 0.85);
}
.el-table__row {
  height: 48px;
}
.el-table th,
.el-table td {
  padding: 8px 0;
}
.el-table__body tr.current-row > td {
  background: #f5f7fa;
}
.action-select-delete {
  font-size: 14px;
  font-weight: 400;
  color: rgba(31, 103, 243, 1);
}
</style>
