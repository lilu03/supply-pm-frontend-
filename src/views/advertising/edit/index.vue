<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="240px">
      <el-col :span="24" style="padding: 10px 10px">
        <h3>常规设置</h3>
      </el-col>

      <el-form-item label="静态广告：">
        <el-checkbox v-model="formData.isStaticWifi">Wi-Fi</el-checkbox>
        <el-checkbox v-model="formData.isStaticNonWifi">non-Wi-Fi</el-checkbox>
      </el-form-item>

      <el-form-item label="视频广告：">
        <el-checkbox v-model="formData.isVideoWifi" name="type"
          >Wi-Fi</el-checkbox
        >
        <el-checkbox v-model="formData.isVideoNonWifi" name="type"
          >non-Wi-Fi</el-checkbox
        >
      </el-form-item>

      <el-form-item label="ATS：">
        <el-radio-group v-model="formData.isSecure">
          <el-radio :label="0">All</el-radio>
          <el-radio :label="1">HTTPS</el-radio>
          <el-radio :label="2">HTTP</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="视频时长：">
        <el-select class="input-width" v-model="formData.duration" placeholder="请选择视频时长">
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in getDurations"
            :key="index"
          ></el-option>
        </el-select>
        <span class="text-f">s</span>
      </el-form-item>

      <el-form-item label="视频声音：">
        <el-switch
          v-model="formData.soundOn"
          active-text="on"
          inactive-text="off"
        ></el-switch>
      </el-form-item>

      <el-form-item label="可跳过时延：">
        <el-select class="input-width" v-model="formData.skipDelay" placeholder="请选择活动区域">
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in getSkipDelays"
            :key="index"
          ></el-option>
        </el-select>
        <span class="text-f">s</span>
      </el-form-item>

      <el-form-item label="广告返回时长：" prop="timeout">
        <el-input
          v-model="formData.timeout"
          class="input-width"
          placeholder="最小值为200"
          type="number"
        ></el-input>
        <span class="text-f">ms</span>
      </el-form-item>

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <el-col :span="24" style="padding: 10px 10px">
        <h3>价格设置</h3>
      </el-col>

      <el-form-item label="媒体分润模式：">
        <el-radio-group v-model="formData.autoType">
          <el-radio :label="1">Fix Pay Out</el-radio>
          <el-radio :label="2">Fix Revenue Share</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Publisher Ecpm：">
        <el-input
          v-model="formData.pubExpectation"
          class="pe"
          type="number"
          :min="0"
          oninput="if(value < 0 ){value = 0}"
        ></el-input>
        <span class="text-f">元（金额仅保留小数点后两位）</span>
      </el-form-item>

      <!-- 竞价模式 -->
      <el-form-item label="竞价模式：">
        <el-radio-group v-model="formData.isBidSharing">
          <el-radio :label="0">一价</el-radio>
          <el-radio :label="1">二价</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- Share Type类型 -->
      <!-- <el-form-item label="Share Type：">
        <el-radio-group @change="handleTypeChange" v-model="formData.types">
          <el-radio :label="1">Autopilot</el-radio>
          <el-radio :label="2">Max Rev Share</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <!-- Autopilot有才有出现以下选项 -->
      <!-- <el-form-item v-if="formData.types == 1">
        <el-radio-group v-model="formData.autoType">
          <el-radio :label="1">Fix Payout</el-radio>
          <el-radio :label="2">Fix Revenue Share</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <!--1 Fix Payout 选项出现以下 -->
      <!-- <el-row v-if="formData.autoType == 1 && formData.types == 1">
        <el-row v-for="(item, index) in getAutopilot" :key="index">
          <el-form-item :label="item.name">
            <el-input
              oninput="if(value > 94 || value < 1 ){value = ''}"
              onkeyup="value=value.replace(/[^\d]/g,'');"
              placeholder="请输入0-95的正整数"
              v-model="item.revShare"
              class="pe"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-row> -->
      <!--2 Fix Revenue Share 选项出现以下 -->
      <!-- <el-row v-if="formData.autoType == 2 && formData.types == 1">
        <el-row>
          <el-form-item
            :label="item.name"
            v-for="(item, index) in getFixRevShare"
            :key="index + 10"
          >
            <el-input
              oninput="if(value > 94 || value < 1 ){value = ''}"
              onkeyup="value=value.replace(/[^\d]/g,'');"
              placeholder="请输入0-95的正整数"
              v-model="item.revShare"
              class="pe"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-row> -->
      <!--3 Max Rev Share 选项出现以下 -->
      <!-- <el-row v-if="formData.types === 2">
        <el-form-item label="Max Rev Share：">
          <el-input-number
            type="number"
            placeholder="请输入95-300的正整数"
            v-model.number="formData.revShare"
            class="pe"
            :max="300"
            :min="95"
            onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          ></el-input-number>
          <span class="text-f">95&lt;=x&lt;=300</span>
        </el-form-item>
      </el-row> -->

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <el-col :span="24" style="padding: 10px 10px">
        <h3>
          分成设置
          <span style="font-size: 12px; font-weight: none;margin-left:10px;color:#999">{{formData.autoType==1?'0≤分成比例≤94':'0≤分成比例≤300'}}</span>
        </h3>
      </el-col>

        <el-form-item label="内部收入分成比例：" class="AdboldFont">
          <el-input
            v-show="formData.autoType==1"
            oninput="if(value > 94 || value < 0 ){value = ''}"
            onkeyup="value=value.replace(/[^\d]/g,'');"
            v-model="formData.insertData"
            class="input-width"
             placeholder="请输入0-94的正整数"
          ></el-input>
          <el-input
            v-show="formData.autoType==2"
            oninput="if(value > 300 || value < 0 ){value = ''}"
            onkeyup="value=value.replace(/[^\d]/g,'');"
            v-model="formData.insertData"
            class="input-width"
             placeholder="请输入0-300的正整数"
          ></el-input>
          <span class="showDetail" @click="openInsertDetail">展开详细设置<i :class="insertDetail?'el-icon-caret-bottom':'el-icon-caret-right'"></i></span>
        </el-form-item>
        <div class="internal" v-show="insertDetail">
          <div v-show="formData.autoType==1">
            <el-row v-for="(item, index) in getAutopilot" :key="index">
              <el-form-item :label="item.name">
                <el-input
                  oninput="if(value > 94 || value < 0 ){value = ''}"
                  onkeyup="value=value.replace(/[^\d]/g,'');"
                  placeholder="请输入0-94的正整数"
                  v-model="item.revShare"
                  class="pe"
                ></el-input>
              </el-form-item>
            </el-row>
          </div>
          <div v-show="formData.autoType==2">
            <el-row v-for="(item, index) in getAutopilot" :key="index">
              <el-form-item :label="item.name">
                <el-input
                  oninput="if(value > 300 || value < 0 ){value = ''}"
                  onkeyup="value=value.replace(/[^\d]/g,'');"
                  placeholder="请输入0-300的正整数"
                  v-model="item.revShare"
                  class="pe"
                ></el-input>
              </el-form-item>
            </el-row>
          </div>
        </div>
        <el-form-item label="外部收入分成比例：" v-show="formData.autoType==2" class="AdboldFont">
          <el-input
            oninput="if(value > 300 || value < 0 ){value = ''}"
            onkeyup="value=value.replace(/[^\d]/g,'');"
            v-model="formData.externalData"
            class="input-width"
            placeholder="请输入0-300的正整数"
          ></el-input>
          <span class="showDetail" @click="openExternalDetail">展开详细设置<i :class="externalDetail?'el-icon-caret-bottom':'el-icon-caret-right'"></i></span>
        </el-form-item>
        <div class="external" v-show="externalDetail&&formData.autoType==2">
          <el-row>
            <el-form-item
              :label="item.name"
              v-for="(item, index) in getFixRevShare"
              :key="index + 10"
            >
              <el-input
                oninput="if(value > 300 || value < 0 ){value = ''}"
                onkeyup="value=value.replace(/[^\d]/g,'');"
                placeholder="请输入0-300的正整数"
                v-model="item.revShare"
                class="pe"
              ></el-input>
            </el-form-item>
        </el-row>
        </div>
      <div>

      </div>

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <el-col :span="24" style="padding: 10px 10px">
        <h3>
          广告源与流量转发设置
          <span style="color: red; font-size: 13px; font-weight: none"
            >(设置选项不可为空)</span
          >
        </h3>
      </el-col>

      <el-form-item label="" style="margin-top: 80px">
        <el-checkbox
          :class="{ 'checkbox-block': true, isRTB: item.code > 4 }"
          v-for="(item, index) in dataSource"
          v-show="item.name == 'Brand' || item.code > 4 ? '' : item.name"
          :label="item.code"
          v-model="item.isChecked"
          :key="index"
        >
          <span style="width: 80px; display: inline-block"
            >{{ item.name }} &nbsp;&nbsp;&nbsp;</span
          >
          <span style="width: 200px"
            >转发比例：<el-input
              :disabled="!Boolean(item.isChecked)"
              v-model.number="item.scale"
            ></el-input
          ></span>
        </el-checkbox>
      </el-form-item>

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <el-col :span="24" style="padding: 10px 10px">
        <h3>广告主黑/白名单设置</h3>
      </el-col>

      <el-form-item label="广告主黑/白名单设置：">
        <el-radio-group v-model="black_white">
          <el-radio label="1">白名单设置</el-radio>
          <el-radio label="2">黑名单设置</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 白名单 -->
      <div v-show="black_white == 1">
        <el-form-item>
          <el-upload
            class="upload-demo"
            :action="upLoadUrl"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccessFront"
            multiple
            :limit="1"
            :on-exceed="handleExceedb"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-button
            type="primary"
            class="download"
            size="small"
            @click="downloadWhite"
            >下载示例文件</el-button
          >
        </el-form-item>

        <el-form-item>
          <el-input type="textarea" v-model="desc" class="textarea"></el-input>
          <el-button
            type="primary"
            size="small"
            class="search"
            @click="findAdvertiser"
            >搜索</el-button
          >
        </el-form-item>

        <el-form-item>
          <el-button
            v-show="multipleSelection_w.length > 1"
            type="primary"
            size="small"
            style="width: 100px"
            @click="createInclusions"
            >批量添加 <span>({{ multipleSelection_w.length }})</span></el-button
          >
        </el-form-item>

        <el-form-item v-show="wtb">
          <el-table
            ref="multipleTable"
            height="250"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 730px; overflow-y: auto"
            @selection-change="handleSelectionChange"
            class="tableList"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="账号ID" width="230" align="left">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="账号名称"
              width="200"
              align="center"
            >
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column
              prop="address"
              label="操作"
              width="200"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="createInclusions_bd(scope.row.id)"
                  >添加到白名单</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            v-show="multiple_w.length > 1"
            size="small"
            style="width: 100px"
            @click="toggleSelection"
            >批量移除<span>({{ multiple_w.length }})</span></el-button
          >
          <el-input
            v-show="wbb"
            type="text"
            v-model="search_valuew"
            placeholder="请输入账号ID或名称"
            suffix-icon="el-input__icon el-icon-search"
            class="searchInput"
            @keyup.enter.native="findInclusion"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="wbb">
          <!-- 移除table-白 -->
          <el-table
            ref="multipleTable"
            height="250"
            :data="accountData"
            tooltip-effect="dark"
            style="width: 730px; margin-top: 20px; overflow-y: auto"
            @selection-change="handleSelectionChanges"
            class="tableList"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="账号ID" width="300" align="left">
              <template slot-scope="scope">{{ scope.row.inclusion }}</template>
            </el-table-column>

            <el-table-column label="账号名称" width="170" align="left">
              <template slot-scope="scope">{{ scope.row.targetName }}</template>
            </el-table-column>

            <el-table-column
              prop="address"
              label="操作"
              width="160"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="toggleSelection_dan(scope.row.inclusion)"
                  >移除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>
      <!-- //黑名单  -->
      <div v-show="black_white == 2">
        <el-form-item>
          <el-upload
            class="upload-demo"
            :action="upLoadUrl1"
            :headers="headers"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleAvatarSuccessFront_b"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-button
            type="primary"
            class="download"
            size="small"
            @click="downloadBlack"
            >下载示例文件</el-button
          >
        </el-form-item>

        <el-form-item>
          <el-input type="textarea" v-model="descs" class="textarea"></el-input>
          <el-button
            type="primary"
            size="small"
            class="search"
            @click="findAdvertisers"
            >搜索</el-button
          >
        </el-form-item>

        <el-form-item>
          <el-button
            v-show="multipleSelection_b.length > 1"
            type="primary"
            size="small"
            style="width: 100px"
            @click="createExclusions"
            >批量添加 <span>({{ multipleSelection_b.length }})</span></el-button
          >
        </el-form-item>

        <el-form-item v-show="btb">
          <!-- 添加table-黑 -->
          <el-table
            ref="multipleTable"
            height="250"
            :data="tableDatas"
            tooltip-effect="dark"
            style="width: 730px; overflow-y: auto"
            @selection-change="handleSelectionChange1"
            class="tableList"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="账号ID" width="230" align="left">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="账号名称"
              width="200"
              align="center"
            >
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column
              prop="address"
              label="操作"
              width="200"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="createExclusions_bc(scope.row.id)"
                  >添加到黑名单</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            v-show="multiple_b.length > 1"
            size="small"
            style="width: 100px"
            @click="toggleSelections"
            >批量移除 <span>({{ multiple_b.length }})</span></el-button
          >
          <el-input
            v-show="bbb"
            type="text"
            v-model="search_valueb"
            placeholder="请输入账号ID或名称"
            suffix-icon="el-input__icon el-icon-search"
            class="searchInput"
            @keyup.enter.native="findInclusion_b"
          ></el-input>
        </el-form-item>

        <el-form-item v-show="bbb">
          <!-- 移除table-黑 -->
          <el-table
            ref="multipleTable"
            height="250"
            :data="accountDatas"
            tooltip-effect="dark"
            style="width: 730px; margin-top: 20px; overflow-y: auto"
            @selection-change="handleSelectionChanges1"
            class="tableList"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="账号ID" width="300" align="left">
              <template slot-scope="scope">{{ scope.row.exclusion }}</template>
            </el-table-column>

            <el-table-column label="账号名称" width="170" align="left">
              <template slot-scope="scope">{{ scope.row.targetName }}</template>
            </el-table-column>

            <el-table-column
              prop="address"
              label="操作"
              width="160"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="toggleSelections_dan(scope.row.exclusion)"
                  >移除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <el-col :span="24" style="padding: 10px 10px">
        <h3>创意审核设置</h3>
      </el-col>

       <el-form-item label="审核类型：" prop="auditStyle">
        <el-radio-group v-model="formData.auditStyle">
          <el-radio :label="2">前审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核方式：开发者API或自主平台</el-radio>
          <el-radio :label="1">后审&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核方式：自主平台</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-row>
        <el-col
          :span="24"
          style="border: 1px solid #d8dce6; margin: 50px 20px 20px 20px"
        ></el-col>
      </el-row>

      <el-col :span="24" style="padding: 10px 10px">
        <h3>自定义设置</h3>
      </el-col>

      <el-form-item label="自定义设置：">
        <el-input
          type="textarea"
          v-model="formData.extJson"
          class="textarea"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button size="small" class="btn" @click="cancelAdPools()"
          >取消</el-button
        >
        <el-button
          :loading="loading"
          type="primary"
          @click="updateAdPools"
          size="small"
          class="btn"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  Find,
  getAutopilotSource,
  getOutRevShare,
  getDataSource,
  getDuration,
  getSkipDelay,
  updateAdPool,
  // getDataSourceRTB,
} from "@/api/advertising";

import {
  downloadInclusionCsv,
  downloadExclusionFile,
  findInclusionByPlacementId,
  findExclusionByPlacementId,
  findAdvertiserByAccountIds,
  createInclusion,
  createExclusion,
  delInclusion,
  delExclusion,
} from "@/api/black_white";

import { getTokenType, getToken } from "@/utils/auth";
import router from "@/router";

export default {
  data() {
    var validatetimeout = (rule, value, callback) => {
      if (value && isNaN(value)) {
        callback(new Error('请输入数字'));
      } else if (value && Number(value) < 200) {
        callback(new Error('请输入大于200的数字'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      wtb: false,
      wbb: false,
      btb: false,
      bbb: false,
      upLoadUrl: `${location.origin}/dev-api/venus/pm/placement/uploadInclusionFile?placementId=${this.$route.query.id}`,
      upLoadUrl1: `${location.origin}/dev-api/venus/pm/placement/uploadExclusionFile?placementId=${this.$route.query.id}`,
      headers: {
        Authorization: getTokenType() + " " + getToken(),
      },
      fileList: [],

      getAutopilot: [
        { revShare: 57, type: 2 },
        { revShare: 57, type: 1 },
        { revShare: 57, type: 4 },
      ], // auto字典
      getFixRevShare: [], // fix字典
      dataSource: [], //广告源字典
      dataSourceRTB: [], // dataSourceRTB code map
      getDurations: "", //视频时长
      getSkipDelays: "", //时延

      formData: {
        isBidSharing: 0,
        isStaticWifi: "",
        isStaticNonWifi: "",
        isVideoWifi: "",
        isVideoNonWifi: "",
        isSecure: 2, //ATS
        duration: "", //视频时长
        soundOn: "", //视频声音
        skipDelay: "", //可跳过时延
        timeout: '', // 广告返回时长
        pubExpectation: "", //PE
        revShareType: "",
        types: 1, //份额类型(self)
        autoType: 2, //自动类型(self)
        poolRevShareList: [],
        //第三个框1个值
        revShare: "",
        adPoolList: [], //广告源
        extJson: "", //自定义设置
        auditStyle:1,//审核类型
        externalData:95,
        insertData:57,
      },
      rules: {
        timeout: [
          { validator: validatetimeout, trigger: 'blur' }
        ],
        auditStyle: [
          { required: true, message: '请选择审核类型', trigger: 'change' }
        ]
      },
      search_valuew: "", //白下面搜索
      search_valueb: "", //黑下面搜索
      black_white: "1",

      desc: "", //白名单上面搜索
      descs: "", //黑名单上面搜索
      multipleSelection_w: [], //白名单批量添加
      multipleSelection_b: [], //黑名单批量添加
      multiple_w: [], //白名单批量移除
      multiple_b: [], //黑名单批量移除

      tableData: [
        {
          id: "",
          name: "",
        },
      ],
      tableDatas: [
        {
          id: "",
          name: "",
        },
      ],

      accountData: [
        {
          inclusion: "",
          targetName: "",
        },
      ],
      accountDatas: [
        {
          exclusion: "",
          targetName: "",
        },
      ],
      insertDetail:false,
      externalDetail:false,
    };
  },
  watch: {
    // 'formData.insertData': {
    //   handler(newdata, old) {
    //     if(newdata!=old){
    //       this.getAutopilot.forEach((item,i)=>{
    //         item.revShare=newdata
    //       })
    //     }
    //   },
    //   immediate: true
    // },
    // 'formData.externalData': {
    //   handler(newdata, old) {
    //     if(newdata!=old){
    //       this.getFixRevShare.forEach((item,i)=>{
    //         item.revShare=newdata
    //       })
    //     }
    //   },
    //   immediate: true
    // }
  },
  created() {
    this.findInclusion();
    this.findInclusion_b();
    this.getDataSource();
    //视频时长字典
    getDuration().then((res) => {
      this.getDurations = res.data;
    });
    //时延
    getSkipDelay().then((res) => {
      this.getSkipDelays = res.data;
    });
  },
  methods: {
    openInsertDetail(){
      this.insertDetail=!this.insertDetail
    },
    openExternalDetail(){
      this.externalDetail=!this.externalDetail
    },
    insetDataOninput(value){
      console.log(value)
        if(this.formData.autoType==1){
          if(value > 94 || value < 0 ){value = ''}
        }else{
          if(value > 300 || value < 0 ){value = ''}
        }
    },
    handleTypeChange(val) {
      if (val == 1) {
        this.formData.autoType = 1;
      }
    },
    getDataSource() {
      Promise.all([
        getDataSource(),
        // getDataSourceRTB()
      ]).then((res) => {
        // this.dataSourceRTB = res[0].data.map(item => Number(item.code))
        // res = res[0].data.concat(res[1].data);
        this.dataSource = res[0].data.map((el) => {
          el.code = Number(el.code);
          el.isChecked = false;
          el.scale = 0;
          return el;
        });
        this.findDetail();
      });
    },
    //每条数据的展示
    findDetail() {
      Find({ id: this.$route.query.id }).then((res) => {
        let obj1 = {
          types: "", //份额类型
          autoType: "", //自动类型,
        };
        this.formData = Object.assign(this.formData, obj1, res.data);
        let statusObj = this.formData.adPoolStatusMap;
        let scaleObj = this.formData.adPoolScaleMap;
        console.log('before', this.dataSource)
        this.dataSource.map((item, index) => {
          // 判断当前是否存在key,没有则利用dataSource初始化，有则赋值给dataSource
          if (!statusObj.hasOwnProperty(item.code)) {
            statusObj[item.code] = item.isChecked
          } else {
            this.dataSource[index].isChecked = Boolean(statusObj[item.code])
          }

          if (!scaleObj.hasOwnProperty(item.code)) {
            scaleObj[item.code] = item.scale
          } else {
            this.dataSource[index].scale = scaleObj[item.code]
          }

          // if (item.code == 2 && item.name === 'Brand') {
          //   this.dataSource[index].scale = 20
          //   this.dataSource[index].isChecked = true
          // }
        })
        console.log('after', this.dataSource)
        // for (let i = 0; i < this.dataSource.length; i++) {
        //   for (const key in statusObj) {
        //     if (statusObj.hasOwnProperty(key)) {
        //       let ele = statusObj[key];
        //       if (this.dataSource[i].code == key) {
        //         this.dataSource[i].isChecked = Boolean(ele);
        //       }
        //     }
        //   }
        //   for (const key in scaleObj) {
        //     if (scaleObj.hasOwnProperty(key)) {
        //       let ele = scaleObj[key];
        //       if (this.dataSource[i].code == key) {
        //         this.dataSource[i].scale = ele;
        //       }
        //     }
        //   }
        // }
        if (this.formData.revShareType != 3) {
          this.formData["revShare"] = "120";
        }
        this.formData.pubExpectation = (
          this.formData.pubExpectation / 100
        ).toFixed(2);
        if (this.formData.revShareType == 1) {
          this.formData.types = 1;
          this.formData.autoType = 1;
        } else if (this.formData.revShareType == 2) {
          this.formData.types = 1;
          this.formData.autoType = 2;
        } else {
          this.formData.types = 2;
          this.formData.autoType = "";
        }
        //auto
        getAutopilotSource().then((res) => {
          let getAuto = res.data;
          for (var i = 0; i < getAuto.length; i++) {
            getAuto[i]["revShare"] = "57";
            if (this.formData.poolRevShareList) {
              for (var j = 0; j < this.formData.poolRevShareList.length; j++) {
                if (getAuto[i].code == this.formData.poolRevShareList[j].type) {
                  getAuto[i]["revShare"] =
                    this.formData.poolRevShareList[j].revShare
                }
                // getAuto.revShare = 120;
              }
            } else {
              getAuto[i]["revShare"] = "57";
            }
          }
          getAuto.forEach((item,i)=>{
            if(item.code==="0"){
              this.formData.insertData=item.revShare===''?57:item.revShare;
              getAuto.splice(i,1)
            }
          })
          this.getAutopilot = getAuto;
        });
        //fix
        getOutRevShare().then((res) => {
          let getFixRevShareArr =res.data;
          // order by code number
          const safeParseNumber = (str) => {
            let num = 0;
            try {
              num = parseInt(str);
            } catch (error) {
              console.log('not a valid number string!');
            }
            return num;
          };
          getFixRevShareArr = getFixRevShareArr.sort((a, b) => {
            const numA = safeParseNumber(a.code);
            const numB = safeParseNumber(b.code);
            return numA - numB;
          });
          for (var i = 0; i < getFixRevShareArr.length; i++) {
            getFixRevShareArr[i].revShare = "95";
            if (this.formData.poolRevShareList&&this.formData.poolRevShareList.length>4) {
              for (var j = 0; j < this.formData.poolRevShareList.length; j++) {
                if (getFixRevShareArr[i].code == this.formData.poolRevShareList[j].type) {
                  getFixRevShareArr[i].revShare =
                    this.formData.poolRevShareList[j].revShare;
                } else if (this.formData.poolRevShareList.length == 4) {
                  getFixRevShareArr = getFixRevShareArr.map(item => { return { ...item, revShare: 95 } });
                }
                // fix.revShare = 120;
              }
            } else {
              getFixRevShareArr[i].revShare = "95";
            }
          }
          for(let i = 0;i<getFixRevShareArr.length;i++){
            if(getFixRevShareArr[i].code==='3'){
              this.formData.externalData=getFixRevShareArr[i].revShare;
              getFixRevShareArr.splice(i,1);
            }
          }
          this.getFixRevShare = getFixRevShareArr;
        });
        if (this.formData.revShareType == 3) {
          this.getAutopilot.map((el) => {
            el["revShare"] = 57;
            return el;
          });
          this.getFixRevShare.map((el) => {
            el["revShare"] = 57;
            return el;
          });
        }
      });
    },

    //保存接口
    updateAdPools() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let title = this.formData;
          let statusObj = this.formData.adPoolStatusMap;
          let scaleObj = this.formData.adPoolScaleMap;
          let hasChecked = [];

          this.dataSource.map((item) => {
            statusObj[item.code] = Number(item.isChecked)
            scaleObj[item.code] = item.scale
            if (item.isChecked && item.name !== 'Brand' && item.code < 4) {
              hasChecked.push(item.isChecked)
            }
          })

          // for (let i = 0; i < this.dataSource.length; i++) {
          //   if (!this.dataSource[i].scale || this.dataSource[i].scale > 100 || this.dataSource[i].scale < 0) {
          //     this.$message({
          //       message: "转发比例的范围是1-100",
          //     });
          //     return;
          //   }
          //
          //   for (const key in statusObj) {
          //     if (statusObj.hasOwnProperty(key)) {
          //       if (this.dataSource[i].code == key) {
          //         statusObj[key] = Number(this.dataSource[i].isChecked);
          //         if (
          //           this.dataSource[i].isChecked &&
          //           this.dataSource[i].name != "Brand" &&
          //           this.dataSource[i].code < 4
          //         ) {
          //           hasChecked.push(this.dataSource[i].isChecked);
          //         }
          //       }
          //     }
          //   }
          //   for (const key in scaleObj) {
          //     if (scaleObj.hasOwnProperty(key)) {
          //       if (this.dataSource[i].code == key) {
          //         scaleObj[key] = this.dataSource[i].scale;
          //       }
          //     }
          //   }
          // }

          if (hasChecked.length == 0) {
            this.$message({
              message: "广告源设置不能为空",
            });
            return;
          }
          const inputScaleReg = /^[1-9]\d*|0$/

          const scaleIllegal = this.dataSource.filter(item => item.isChecked)
            .some(item => !inputScaleReg.test(item.scale) || !item.scale || item.scale > 100 || item.scale < 0)

          if (scaleIllegal) {
            this.$message({
              message: "转发比例的范围是1-100"
            })
            return
          }

          if (title.types == 1 && title.autoType == 1) {
            title.revShareType = 1;
            delete title.revShare;
            let poolRevShareArr = this.getAutopilot.map((res) => {
              res["type"] = res.code;
              return res;
            });
            poolRevShareArr.push({
              "code":"0",
              "name":"All Inner Rev Share",
              "revShare":this.formData.insertData,
              "type":"0"
            })
            title.poolRevShareList=poolRevShareArr;
          } else if (title.types == 1 && title.autoType == 2) {
            title.revShareType = 2;
            delete title.revShare;
            let ArrFixRevShare = this.getFixRevShare.map((res) => {
              res["type"] = res.code;
              return res;
            });
            let ArrgetAutopilot = this.getAutopilot.map(res=>{
              res["type"] = res.code;
              return res;
            })
            let ArrAll=[{
              "code":"3",
              "name":"All RTBD Rev Share",
              "revShare":this.formData.externalData,
              "type":"3"
            },{
              "code":"0",
              "name":"All Inner Rev Share",
              "revShare":this.formData.insertData,
              "type":"0"
            }]
            title.poolRevShareList = [...ArrFixRevShare,...ArrgetAutopilot,...ArrAll]
          } else {
            title.revShareType = 3;
            title.poolRevShareList = [];
            if (title.revShareType == 3 && !title.revShare) {
              title["revShare"] = 120;
            }
          }
          let form = Object.assign({}, title);
          form.pubExpectation = form.pubExpectation * 100;
          form.timeout = form.timeout ? Number(form.timeout) : null;
          form.auditStyle = Number(form.auditStyle);
          this.loading = true;
          updateAdPool(form)
            .then((res) => {
              this.loading = false;
              this.findDetail();
              this.$router.push({ path: "/advertising" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          // 校验 广告返回时长
          if (this.formData.timeout) {
            if (isNaN(this.formData.timeout)) {
              this.$message.error("广告返回时长必须是数字")
              return
            } else if (Number(this.formData.timeout) < 200) {
              this.$message.error("广告返回时长必须是大于200的数字")
              return
            }
          }
        }
      })
    },
    // 数组去重
    arrRemoveRepetition(maxArr, minArr) {
      let nArr = [];  //存储新数组
      nArr = maxArr.filter(function(item) {
      let temp = minArr.map(function(v) {
        return v.code
      })
      return !temp.includes(item.code)
      })
      return nArr
    },
    //取消
    cancelAdPools() {
      this.$router.push({ path: "/advertising" });
    },
    //bai名单上传-成功回调
    handleAvatarSuccessFront(res, file, fileList) {
      if (res.code == 200 && res.data.length == 0) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.findInclusion();
      }
      if (res.data.length != 0) {
        this.$message({
          message: `ID为${res.data}的项上传失败`,
          type: "error",
        });
      }
    },
    //hei名单上传-成功回调
    handleAvatarSuccessFront_b(res, file) {
      // console.log(res, file)
      if (res.code == 200 && res.data.length == 0) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.findInclusion_b();
      }
      if (res.data.length != 0) {
        this.$message({
          message: `ID为${res.data}的项上传失败`,
          type: "error",
        });
      }
    },
    //白名单下载
    downloadWhite() {
      downloadInclusionCsv({ placementId: this.$route.query.id }).then(
        (res) => {
          const url = this.genUrl(res, {});
          const a = document.createElement("a");
          a.href = url;
          a.download = "Inmobi-white文件.csv";
          a.click();
          window.URL.revokeObjectURL(url);
        }
      );
    },
    genUrl(encoded, options) {
      const dataBlob = new Blob([`\ufeff${encoded}`], {
        type: "text/plain;charset=utf-8",
      }); //返回的格式
      return window.URL.createObjectURL(dataBlob);
    },
    //黑名单下载
    downloadBlack() {
      downloadExclusionFile({ placementId: this.$route.query.id }).then(
        (res) => {
          const url = this.genUrls(res, {});
          const a = document.createElement("a");
          a.href = url;
          a.download = "Inmobi-black文件.csv";
          a.click();
          window.URL.revokeObjectURL(url);
        }
      );
    },
    genUrls(encoded, options) {
      const dataBlob = new Blob([`\ufeff${encoded}`], {
        type: "text/plain;charset=utf-8",
      }); //返回的格式
      return window.URL.createObjectURL(dataBlob);
    },
    //黑白名单上面的(搜索white)
    findAdvertiser() {
      let ss = this.desc.split("\n");
      findAdvertiserByAccountIds(ss).then((res) => {
        this.tableData = res.data;
        this.wtb = true;
        let whiteArr = [];
        this.tableData.forEach((el) => {
          whiteArr.push(el.id);
        });
        var titles = [];
        for (let i = 0; i < ss.length; i++) {
          if (!whiteArr.includes(ss[i])) {
            this.tableData = [];
            titles.push(ss[i]);
          }
        }
        if (titles.length != 0) {
          this.$message({
            message: `${titles}账号不存在`,
            duration: 5000,
          });
        }
      });
    },
    //黑白名单上面的(搜索black)
    findAdvertisers() {
      let ss = this.descs.split("\n");
      findAdvertiserByAccountIds(ss).then((res) => {
        this.tableDatas = res.data;
        this.btb = true;
        let whiteArr = [];
        this.tableDatas.forEach((el) => {
          whiteArr.push(el.id);
        });
        var titless = [];
        for (let i = 0; i < ss.length; i++) {
          if (!whiteArr.includes(ss[i])) {
            this.tableDatas = [];
            titless.push(ss[i]);
          }
        }
        if (titless.length != 0) {
          this.$message({
            message: `${titless}账号不存在`,
            duration: 5000,
          });
        }
      });
    },
    //白名单列表拉取(下面的)
    findInclusion() {
      findInclusionByPlacementId({
        placementId: this.$route.query.id,
        idOrName: this.search_valuew,
      }).then((res) => {
        this.accountData = res.data;
        if (res.data.length != 0) {
          this.wbb = true;
        }
        // else{
        //   this.wbb=false
        // }
      });
    },
    //黑名单列表拉取(下面的)
    findInclusion_b() {
      findExclusionByPlacementId({
        placementId: this.$route.query.id,
        idOrName: this.search_valueb,
      }).then((res) => {
        this.accountDatas = res.data;
        if (res.data.length != 0) {
          this.bbb = true;
        }
        // else{
        //   this.bbb=false
        // }
      });
    },
    //白名单批量添加select[](element自带数据)
    handleSelectionChange(val) {
      // console.log(val,'valb')
      let array = [];
      val.forEach((ele) => {
        array.push(ele.id);
      });
      this.multipleSelection_w = array;
    },
    //黑名单批量添加select[](element自带数据)
    handleSelectionChange1(val) {
      let array = [];
      val.forEach((ele) => {
        array.push(ele.id);
      });
      this.multipleSelection_b = array;
    },
    //白名单批量移除select[](element自带数据)
    handleSelectionChanges(val) {
      let array = [];
      val.forEach((ele) => {
        array.push(ele.inclusion);
      });
      this.multiple_w = array;
    },
    //黑名单批量移除select[](element自带数据)
    handleSelectionChanges1(val) {
      let array = [];
      val.forEach((ele) => {
        array.push(ele.exclusion);
      });
      this.multiple_b = array;
    },
    //白名单批量增加
    createInclusions() {
      createInclusion(
        { placementId: this.$route.query.id },
        this.multipleSelection_w
      ).then((res) => {
        this.findInclusion();
        // this.tableData=[]
      });
    },
    //白名单-单个增加
    createInclusions_bd(row) {
      // console.log(row,'dd')
      let arr = [];
      arr.push(row);
      createInclusion({ placementId: this.$route.query.id }, arr).then(
        (res) => {
          this.findInclusion();
        }
      );
    },
    //黑名单批量增加
    createExclusions() {
      createExclusion(
        { placementId: this.$route.query.id },
        this.multipleSelection_b
      ).then((res) => {
        this.findInclusion_b();
        // this.tableDatas=[]
      });
    },
    //黑名单-单个增加
    createExclusions_bc(row) {
      let arr = [];
      arr.push(row);
      createExclusion({ placementId: this.$route.query.id }, arr).then(
        (res) => {
          this.findInclusion_b();
        }
      );
    },
    //白名单批量移除
    toggleSelection() {
      delInclusion({ placementId: this.$route.query.id }, this.multiple_w).then(
        (res) => {
          this.findInclusion();
        }
      );
    },
    //白名单-单个移除
    toggleSelection_dan(rows) {
      // console.log(rows,'rows')
      let arr = [];
      arr.push(rows);
      delInclusion({ placementId: this.$route.query.id }, arr).then((res) => {
        this.findInclusion();
      });
    },
    //黑名单批量移除
    toggleSelections(rows) {
      delExclusion({ placementId: this.$route.query.id }, this.multiple_b).then(
        (res) => {
          this.findInclusion_b();
        }
      );
    },
    //黑名单-单个移除
    toggleSelections_dan(rows) {
      let arr = [];
      arr.push(rows);
      delExclusion({ placementId: this.$route.query.id }, arr).then((res) => {
        this.findInclusion_b();
      });
    },

    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceedb(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleExceed(files, fileList) {
      console.log(files, fileList);
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //白名单批量移除select
    // handleSelection(val) {
    //   this.multiple_w = val;
    //   // console.log(val)
    // },
  },
};
</script>
<style scoped lang="scss">
.el-select.input-width,
.el-input.input-width {
  width: 202px;
}
h3 {
  color: #111111;
  margin-left: 30px;
}

.el-form-item {
  margin-bottom: 20px;
}

.text-f {
  font-size: 16px;
  color: #333333;
}

.videoInput {
  width: 202px;
}

.pe {
  width: 202px;
}

.download {
  position: absolute;
  left: 100px;
  top: 4px;
}

.textarea {
  width: 480px;
}

.search {
  position: absolute;
  margin-left: 20px;
  width: 100px;
}

.el-table {
  width: 600px;
}

.searchInput {
  width: 200px;
  padding: 0;
  margin: 0;
  margin-left: 480px;
}

.btn {
  width: 100px;
}

.el-table::before {
  width: 600px;
}
.checkbox-block {
  display: block;
  width: 180px;
  margin: 10px 0;
}
.isRTB {
  margin-left: 20px;
}

</style>
<style>
.AdboldFont .el-form-item__label{
  font-weight: bolder !important;
  font-size: 15px;
}
.AdboldFont .el-input__inner{
  border: 1px solid #666;
}
.showDetail{
  font-size: 13px;
  color: #1F67F3;
  font-weight: 400;
  margin-left: 10px;
}
</style>
