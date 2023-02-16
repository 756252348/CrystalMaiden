<!-- eslint-disable array-bracket-spacing -->
<!-- eslint-disable vue/html-indent -->

<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="名称" prop="title">
            <el-input
                v-model="queryParams.title"
                placeholder="名称"
              />
          </el-form-item>
          <el-form-item label="开始价格" prop="price">
            <el-input
                v-model="queryParams.startPrice"
                placeholder="开始价格"
              />
          </el-form-item>
          <el-form-item label="结束价格" prop="price">
            <el-input
                v-model="queryParams.endPrice"
                placeholder="结束价格"
              />
          </el-form-item>
          <el-form-item label="标签" prop="tagsId">
              <el-select
                v-model="selectId"
                multiple
                placeholder="标签"
                @change="getQuerySelectValue"
              >
              <el-option
      v-for="item in selectOptions"
      :key="item.id"
      :label="item.title"
      :value="item.id"
/>
              </el-select>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:giftInfo:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="giftInfoList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="名称" prop="title" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="标签" prop="type" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.tagsName.substring(0, scope.row.tagsName.lastIndexOf(',')) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="型号" prop="type" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参数" prop="parametric" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.parametric }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" prop="images" align="center">
            <template slot-scope="scope">
              <!-- <img :src="scope.row.images" class="el-upload el-upload--picture-card" style="float:left"> -->
              <el-image style="width: 100px; height: 100px" :src="scope.row.images" :preview-src-list="[scope.row.images]" />
            </template>
          </el-table-column>
          <el-table-column label="价格" prop="price" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="参考价格" prop="netPrice" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.netPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column label="装箱数" prop="boxNum" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.boxNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否彩盒" prop="ifBox" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ifBox == 1 ? '是': '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否含税" prop="ifTax" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.ifTax == 1 ? '是': '否' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发货地" prop="shippingPlace" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.shippingPlace }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要修改吗?"
                confirm-button-text="修改"
                @confirm="handleUpdate(scope.row)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="名称" prop="title">
              <el-input
                v-model="form.title"
                placeholder="名称"
              />
            </el-form-item>
            <el-form-item label="标签" prop="tagsId">
              <el-select
                v-model="form.tagId"
                multiple
                placeholder="标签"
                @change="getSelectValue"
              >
              <el-option
      v-for="item in selectOptions"
      :key="item.id"
      :label="item.title"
      :value="item.id"
/>
              </el-select>
            </el-form-item>
            <el-form-item label="型号" prop="type">
              <el-input
                v-model="form.type"
                placeholder="型号"
              />
            </el-form-item>
            <el-form-item label="参数" prop="parametric">
              <el-input
                v-model="form.parametric"
                placeholder="参数"
              />
            </el-form-item>
            <el-form-item label="图片" prop="images">
              <!-- <el-input
                v-model="form.images"
                placeholder="图片"
              /> -->
              <img v-if="form.images" :src="form.images" class="el-upload el-upload--picture-card" style="float:left">
                    <el-upload ref="sys_app_logo" :headers="headers" :file-list="pictureFileList" :action="pictureUploadAction" style="float:left" :before-upload="pictureUploadBefore" list-type="picture-card" :show-file-list="false" :on-success="uploadSuccess">
                      <i class="el-icon-plus" />
                    </el-upload>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input
                v-model="form.price"
                placeholder="价格"
              />
            </el-form-item>
            <el-form-item label="网上参考价格" prop="netPrice">
              <el-input
                v-model="form.netPrice"
                placeholder="网上参考价格"
              />
            </el-form-item>
            <el-form-item label="装箱数" prop="boxNum">
              <el-input
                v-model="form.boxNum"
                placeholder="装箱数"
              />
            </el-form-item>
            <el-form-item label="发货地" prop="shippingPlace">
              <el-input
                v-model="form.shippingPlace"
                placeholder="发货地"
              />
            </el-form-item>
            <el-form-item label="是否彩盒" prop="ifBox">
              <el-select
                v-model="form.ifBox"
                placeholder="是否彩盒"
              >
              <el-option
      v-for="item in ifBoxOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
/>
              </el-select>
            </el-form-item>
            <el-form-item label="是否税" prop="ifTax">
              <el-select
                v-model="form.ifTax"
                placeholder="是否税"
              >
              <el-option
      v-for="item in ifTaxOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
/>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="添加时间" prop="createTime">
              <el-date-picker
                v-model="form.createTime"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="修改时间" prop="updateTime">
              <el-date-picker
                v-model="form.updateTime"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { addGiftInfo, delGiftInfo, getGiftInfo, listGiftInfo, updateGiftInfo } from '@/api/business/gift-info'
import { GetListTags } from '@/api/business/sys-tags'
import { getToken } from '@/utils/auth'

export default {
  name: 'GiftInfo',
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      giftInfoList: [],
      selectOptions: [],
      selectId: undefined,
      headers: { 'Authorization': 'Bearer ' + getToken() },
      ifBoxOptions: [{
        value: '0',
        label: '否'
      },
      {
        value: '1',
        label: '是'
      }],
      ifTaxOptions: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }],
      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        title: undefined,
        startPrice: undefined,
        endPrice: undefined,
        tagsId: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {
        title: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      // action
      pictureUploadAction: process.env.VUE_APP_BASE_API + '/api/v1/public/uploadFile',
      pictureFileList: []
    }
  },
  created() {
    this.getList()
    this.getTagsList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listGiftInfo(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.giftInfoList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    /** 下拉多选 */
    getSelectValue(val) {
      var names = ''
      var ids = ''
      for (let i = 0; i <= val.length - 1; i++) {
        this.selectOptions.find((item) => {
          if (item.id === val[i]) {
            names += item.title + ','
            ids += item.id + ','
          }
        })
      }
      this.form.tagsName = names
      this.form.tagsId = ids
    },
    getQuerySelectValue(val) {
      var ids = ''
      for (let i = 0; i <= val.length - 1; i++) {
        this.selectOptions.find((item) => {
          if (item.id === val[i]) {
            ids += item.id + ','
          }
        })
      }
      this.queryParams.tagsId = ids
    },
    getTagsList() {
      GetListTags(null).then(response => {
        this.selectOptions = response.data
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        title: undefined,
        type: undefined,
        parametric: undefined,
        images: undefined,
        price: undefined,
        netPrice: undefined,
        boxNum: undefined,
        ifBox: undefined,
        ifTax: undefined,
        shippingPlace: undefined,
        tagsId: undefined,
        tagsName: undefined,
        tagId: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    // 关系
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.queryParams = {
        pageIndex: 1,
        pageSize: 10,
        title: undefined,
        startPrice: undefined,
        endPrice: undefined,
        tagsId: undefined

      }
      this.selectId = []
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.getTagsList()
      this.open = true
      this.title = '添加商品'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id =
                row.id || this.ids
      getGiftInfo(id).then(response => {
        const json = response.data
        this.open = true
        this.title = '修改商品'
        this.isEdit = true
        if (response.data.tagsId !== '') {
          var arrIntRoles = response.data.tagsId.substring(0, response.data.tagsId.lastIndexOf(',')).split(',')
          // eslint-disable-next-line no-array-constructor
          var arrStringRoles = new Array()
          for (var role in arrIntRoles) {
            arrStringRoles.push(parseInt(arrIntRoles[role]))
          }
          // response.data.put('ids', arrStringRoles)
          json['tagId'] = arrStringRoles
          console.log(json)
        }
        this.form = json
      })
      this.getTagsList()
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            this.form.updateTime = new Date()
            updateGiftInfo(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addGiftInfo(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delGiftInfo({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    },
    pictureUploadBefore(file) {
      const isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
    uploadSuccess(response, file, fileList) {
      console.log('sss')
      this.form.images = process.env.VUE_APP_BASE_API + response.data.full_path
      console.log(response.data.full_path)
    }
  }
}
</script>
