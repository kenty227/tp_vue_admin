<template>
  <div class="app-container">
    <div class="head-container">
      <div class="filter-container">
        <number-string-select
          :model.sync="listQuery.filter.type"
          :options="typeOptions"
          :placeholder="$t('demo.type')"
          class="head-item"
        />
        <el-input
          v-model="listQuery.filter.keyword"
          :placeholder="$t('demo.title')"
          class="head-item head-item_input"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          class="head-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >
          {{ $t('table.search') }}
        </el-button>
        <el-button
          :disabled="clearBtnDisabled"
          class="head-item"
          @click="clearFilter"
        >
          {{ $t('table.clear') }}
        </el-button>
      </div>
      <div class="action-container">
        <el-button
          v-permission="'demo:add'"
          class="head-item"
          type="primary"
          icon="el-icon-edit"
          @click="handleAdd"
        >
          {{ $t('table.add') }}
        </el-button>
        <el-button
          v-permission="'demo:import'"
          class="head-item"
          type="success"
          @click="importVisible = true"
        >
          {{ $t('table.import') }}
        </el-button>
        <el-button
          :loading="exportLoading"
          class="head-item"
          type="info"
          @click="handleExport"
        >
          {{ $t('table.export') }}
        </el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      v-loading="tableLoading"
      class="body-container"
      element-loading-text="Loading"
      height="100%"
      :data="list"
      :row-key="row => row.id"
      fit
      border
      stripe
      highlight-current-row
      @sort-change="sortChange"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" reserve-selection width="40" />
      <!-- 列表数据 -->
      <el-table-column label="ID" align="center" width="75" sortable="custom" prop="id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('demo.type')" align="center">
        <template slot-scope="scope">
          {{ typeOptions[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('demo.title')" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.create_time')" align="center" width="155">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.update_time')" align="center" width="155">
        <template slot-scope="scope">
          {{ scope.row.update_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="155">
        <template slot-scope="scope">
          <el-button
            v-permission="'demo:edit'"
            type="primary"
            size="small"
            @click="handleEdit(scope.row.id)"
          >{{ $t('table.edit') }}
          </el-button>
          <delete-button
            :id="scope.row.id"
            v-permission="'demo:delete'"
            :method="del"
            @callback="fetchData"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="foot-container">
      <div class="action-container">
        <delete-button
          :id="selectIdList"
          v-permission="'demo:delete'"
          :method="del"
          @callback="fetchData"
        />
      </div>
      <pagination
        v-show="total > 0"
        class="pagination-container"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="fetchData"
      />
    </div>
    <!-- 导入 -->
    <upload-excel
      :visible.sync="importVisible"
      :method="importExcel"
      :template-download-method="importTemplate"
      @success="fetchData"
    />
  </div>
</template>

<script>
import { typeOptions } from './common/options'
import { getList, del, importExcel, exportExcel, importTemplate } from '@/api/demo'
import { deepClone } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import UploadExcel from '@/components/Upload/UploadExcel'
import DeleteButton from '@/components/Table/DeleteButton'
import NumberStringSelect from '@/components/Form/NumberStringSelect'
import permission from '@/directive/permission/index'// 权限判断指令
import { downExcel } from '@/utils/download'

const defaultListQuery = {
  page: 1,
  limit: 20,
  sortProp: 'id',
  sortOrder: 'desc',
  filter: {
    type: '',
    keyword: ''
  }
}

export default {
  name: 'Demo',
  components: {
    Pagination,
    UploadExcel,
    DeleteButton,
    NumberStringSelect
  },
  directives: {
    permission
  },
  data() {
    return {
      tableLoading: false,
      list: [],
      total: 0,
      // 筛选条件
      listQuery: {},
      clearBtnDisabled: true,
      selectIdList: [],
      // 导入、导出
      importVisible: false,
      exportLoading: false
    }
  },
  computed: {
    typeOptions() {
      return typeOptions()
    }
  },
  created() {
    // 初始化默认筛选条件
    this.listQuery = deepClone(defaultListQuery)
    // 请求列表数据
    this.fetchData()
  },
  methods: {
    del,
    importExcel,
    importTemplate,
    // 获取列表数据
    fetchData() {
      this.tableLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = parseInt(response.data.total)
      }).finally(() => {
        this.tableLoading = false
      })
    },
    handleAdd() {
      this.$router.push({ path: 'add' })
    },
    handleEdit(id) {
      this.$router.push({ path: 'edit/' + id })
    },
    // 筛选
    handleFilter() {
      this.clearBtnDisabled = false
      this.listQuery.page = 1
      this.fetchData()
    },
    // 清空筛选
    clearFilter() {
      this.clearBtnDisabled = true
      this.listQuery = deepClone(defaultListQuery)
      this.fetchData()
    },
    // 排序
    sortChange(data) {
      const { prop, order } = data
      this.listQuery.sortProp = prop
      this.listQuery.sortOrder = order === 'ascending' ? 'asc' : 'desc'
      // 筛选
      this.handleFilter()
    },
    // 勾选
    selectionChange(val) {
      this.selectIdList = []
      val.forEach(row => {
        this.selectIdList.push(row.id)
      })
      // console.log('selectIdList', this.selectIdList)
    },
    // 导出
    handleExport() {
      this.exportLoading = true
      exportExcel(this.listQuery).then(response => {
        downExcel(response.data, 'demo')
      }).finally(() => {
        this.exportLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/views/list.scss";

.app-container {
  .head-item_input {
    width: 200px;
  }
}
</style>
