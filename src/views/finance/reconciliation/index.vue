<template>
  <div class="app-container">
    <!-- start: 搜索 -->
    <div class="flex-middle">
      <el-input
        v-model="search"
        class="search-input"
        placeholder="请输入账号ID"
        suffix-icon="el-icon-search"
        clearable
      />
      <el-button class="search-btn ml-5" type="primary" @click="handleSearch">搜索</el-button>
    </div>
    <div>
      <div class="reconciliation-info">
        <span class="reconciliation-info-title">账号ID：</span>
        <span>{{ reconciliationInfo.id }}</span>
      </div>
      <div class="reconciliation-info">
        <span class="reconciliation-info-title">账号名称：</span>
        <span>{{ reconciliationInfo.account }}</span>
      </div>
    </div>
    <!-- end: 搜索 -->
    <el-divider />
    <!-- start: 对账表格 -->
    <h5>账单</h5>
    <el-date-picker
      v-model="date"
      value-format="yyyy-MM"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      @change="handleChangeMonth"
    />
    <el-table
      v-loading="loading"
      class="mt-5"
      :data="data"
      :header-row-style="{'text-align': 'center'}"
    >
      <el-table-column prop="month" label="时间" />
      <el-table-column prop="rev" label="金额（元）">
        <template slot-scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.rev" class="paid-width" oninput="value=value.replace(/[^0-9.]/g,'')" />
          <span v-else>{{ scope.row.rev.toLocaleString() }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="settleStatus" label="结算状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isEdit">
            <el-radio v-model="scope.row.settleStatus" label="0">待支付</el-radio>
            <el-radio v-model="scope.row.settleStatus" label="1">已支付</el-radio>
          </div>
          <div v-else :class="['pay-status', scope.row.settleStatus === '0' ? 'to-be-paid' : 'paid']">
            <span>{{ scope.row.settleStatus === '0' ? '待支付' : '已支付' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isEdit">
            <el-button type="text" @click="handleEdit(scope.row, scope.$index, 'cancel')">取消</el-button>
            <el-divider direction="vertical" />
            <el-button type="text" @click="handleEdit(scope.row, scope.$index, 'save')">保存</el-button>
          </div>
          <el-button v-else type="text" @click="handleEdit(scope.row, scope.$index)">修正</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- end: 对账表格 -->
  </div>
</template>

<script>
import { getReconciliationList, saveOrUpdate } from '@/api/finance'
import { getPubDetailInfo } from '@/api/account'
export default {
  name: 'Reconciliation',
  data() {
    return {
      search: '',
      date: [],
      reconciliationInfo: {
        id: '',
        account: ''
      },
      data: [],
      loading: false,
      backupItem: {}
    }
  },
  mounted() {
    this.reconciliationInfo.id = this.$route.query.id
    this.reconciliationInfo.account = this.$route.query.account
    this.requestGetReconciliationList()
  },
  methods: {
    handleInput() {

    },
    handleSearch () {
      this.requestGetPubDetailInfo()
    },
    handleChangeMonth() {
      this.requestGetReconciliationList()
    },
    handleEdit(currentItem, index, type) {
      if (!currentItem.isEdit) {
        this.data[index].isEdit = true
        this.backupItem = Object.assign({}, currentItem)
      } else {
        const typeText = type === 'save' ? '保存' : '取消'
        this.$confirm(`确认${typeText}当前操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (type === 'save') {
            this.data[index].isEdit = false
            this.requestSaveOrUpdate(currentItem)
          } else {
            // 取消
            this.$set(this.data, index, this.backupItem)
            this.data[index].isEdit = false
          }
          this.backupItem = {}

        })
      }
    },
    requestGetPubDetailInfo () {
      getPubDetailInfo({
        pubId: this.search
      }).then((res) => {
        const data = res.data
        this.reconciliationInfo.account = data.accountName
        this.$router.replace({
          query: {
            id: this.search,
            account: data.accountName
          }
        })
      })
    },
    // 获取账单数据
    requestGetReconciliationList () {
      const defaultParams = Object.assign({
        pubAccountId: this.$route.query.id
      })
      const params = this.date
        ? Object.assign(defaultParams, {
          start: this.date[0],
          end: this.date[1]})
        : defaultParams
      this.loading = true
      getReconciliationList(params).then((res) => {
        const data = res.data
        this.data = data.map(item => {
          const { id, pubAccountId, month, rev, settleStatus } = item
          return {
            id,
            pubAccountId,
            month,
            settleStatus: settleStatus.toString(),
            rev: rev.toFixed(2),
            isEdit: false
          }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 修正结算金额与状态
    requestSaveOrUpdate(item) {
      const { id, month, pubAccountId, rev, settleStatus } = item
      saveOrUpdate({
        id,
        month,
        pubAccountId,
        rev,
        settleStatus: Number(settleStatus)
      }).then((res) => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.requestGetReconciliationList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-input {
    width: 272px;
  }
  .reconciliation-info {
    margin: 32px 0;
    color: rgb(51, 51,51);
    font-size: 14px;
    &-title {
      display: inline-block;
      width: 100px;
      letter-spacing: 0.5px;
      text-align: right;
    }
  }
  .pay-status {
    display: inline-block;
    width: 56px;
    height: 22px;
    border-radius: 2px;
    text-align: center;
    cursor: default;
    span {
      display: block;
      font-size: 12px;
      transform: scale(0.8);
    }
  }
  .paid {
    background: #DBECDB;
    color: rgb(42, 148, 91);
  }
  .to-be-paid {
    background: #FEBDBD;
    color: rgb(210, 75, 75);
  }
  .paid-width {
    width: 144px;
  }
</style>
