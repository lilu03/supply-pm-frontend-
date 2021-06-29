<template>
  <div class="app-container">
    <!-- start: 工具栏 -->
    <div class="flex-middle finance-toolbar">
      <div class="finance-search flex-middle">
        <el-input
          v-model="search"
          class="search-input"
          placeholder="搜索账号名称/ID/邮箱"
          suffix-icon="el-icon-search"
          clearable
        />
        
        <el-button type="primary" class="search-btn ml-5" @click="handleSearch">搜索</el-button>
      </div>
      <div class="flex-middle">
        <el-upload
          :show-file-list="false"
          :action="uploadUrl"
          :headers="headers"
          :on-success="handleOnSuccess"
          accept=".xlsx"
        >
          <el-button class="finance-tools-btn">
            <img class="upload" src="@/assets/upload.svg">
            上传设置文件</el-button>
        </el-upload>
        <el-button class="finance-tools-btn ml-2" @click="handleDownloadDemo">
          <img class="upload" src="@/assets/download.svg">
          下载示例文件</el-button>
        <el-date-picker
          v-model="date"
          value-format="yyyy-MM"
          class="ml-5"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        />
        <el-button class="output-btn ml-2" type="text" @click="handleOutput">导出<i class="el-icon-download" /></el-button>
      </div>
    </div>
    <!-- end: 工具栏 -->
    <!-- start: 财务列表 -->
    <el-table v-loading="" :data="tableData" class="mt-5">
      <el-table-column prop="accountName" label="账号名称" />
      <el-table-column prop="pubId" label="账号ID" />
      <el-table-column prop="registEmail" label="注册邮箱" />
      <!-- <el-table-column prop="contactEmail" label="联系人邮箱" /> -->
      <el-table-column prop="companyName" label="公司名称" />
      <el-table-column prop="addressLine" label="注册地址" />
      <el-table-column prop="bankName" label="对公银行名称" />
      <el-table-column prop="" label="对公开户省市">
        <template slot-scope="scope"> {{ scope.row.state }} {{ scope.row.city }} </template>
      </el-table-column>
      <el-table-column prop="branchBankName" label="对公开户支行" />
      <el-table-column prop="accountNumber" label="对公银行账号" />
      <el-table-column prop="invoiceType" label="发票类型" />
      <el-table-column prop="invoiceTitle" label="发票内容" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="jumpToReconciliation(scope.row.pubId, scope.row.accountName)">账单详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- end: 财务列表 -->
    <el-pagination
      class="float-r mt-5 mb-5"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageConfig.size"
      :total="pageConfig.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getPubList, getPubListDetail } from '@/api/account'
import { downloadUploadDemo, downloadReport } from '@/api/finance'
import { fileDownloadBlob } from '@/utils/index'
import { getToken, getTokenType } from "@/utils/auth";
import _ from 'lodash'
export default {
  name: 'Finance',
  data() {
    return {
      search: '',
      date: [],
      pageConfig: {
        current: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      loading: false,
      uploadUrl: `${location.origin}/prod-api/venus/pm/pubFinance/uploadReport`,
      headers: {
        Authorization: getTokenType() + " " + getToken()
      }
    }
  },
  mounted() {
    this.requestGetPubList()
  },
  methods: {
    handleDownloadDemo: _.debounce(function() {
      downloadUploadDemo().then((res) => {
        fileDownloadBlob(res.res, res.fileName)
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '下载失败，请联系管理员'
        })
      })
    }, 1000),
    handleOnSuccess(response, file, fileList) {
      if (response.code === 200) {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: response.msg
        })
      }
    },
    handleOutput: _.debounce(function() {
      if (!this.date || !this.date.length) {
        this.$message({
          type: 'warning',
          message: '请选择需要导出的月份范围'
        })
        return
      }
      this.requestDownloadReport()
    }, 1000),
    handleSearch() {
      this.requestGetPubList()
    },
    handleSizeChange(size) {
      this.pageConfig.size = size
      this.requestGetPubList()
    },
    handleCurrentChange(current) {
      this.pageConfig.current = current
      this.requestGetPubList()
    },
    jumpToReconciliation(id, account) {
      this.$router.push({
        path: '/reconciliation',
        query: {
          id: id,
          account: account
        }
      })
    },
    requestGetPubList() {
      this.loading = true
      getPubListDetail({
        pageNo: this.pageConfig.current,
        pageSize: this.pageConfig.size,
        queryField: this.search
      }).then((res) => {
        this.loading = false
        const data = res.data
        this.tableData = data.list
        this.pageConfig.current = data.pageNo
        this.pageConfig.size = data.pageSize
        this.pageConfig.total = data.total
      }).catch(() => {
        this.loading = false
      })
    },
    requestDownloadReport() {
      downloadReport({
        start: this.date[0],
        end: this.date[1]
      }).then((res) => {
        fileDownloadBlob(res.res, res.fileName)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .finance-toolbar {
    justify-content: space-between;
  }
  .search-input {
    width: 272px;
  }
  .upload {
    vertical-align: middle;
  }
  .finance-tools-btn {
    padding: 10px 20px;
  }
  .output-btn {
    color: rgba(117, 131, 149, 1);
  }
</style>
