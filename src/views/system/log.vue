<template>
  <div class="app-container">
    <div class="head-container">
      <div class="filter-container">
        <remote-select
          :model.sync="listQuery.filter.user_id"
          :method="getUserList"
          :placeholder="$t('log.operatorName')"
          class="head-item"
        />
        <el-input
          v-model="listQuery.filter.keyword"
          :placeholder="$t('log.operateContent')"
          class="head-item head-item_input"
          @keyup.enter.native="handleFilter"
        />
        <el-date-picker
          v-model="listQuery.filter.date"
          style="width: 270px;"
          class="head-item"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="~"
          :start-placeholder="$t('log.operateTime')"
          end-placeholder=""
        />
        <el-button
          class="head-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >{{ $t('table.search') }}
        </el-button>
        <el-button
          :disabled="clearBtnDisabled"
          class="head-item"
          @click="clearFilter"
        >{{ $t('table.clear') }}
        </el-button>
      </div>
      <div class="action-container" />
    </div>
    <el-table
      v-loading="listLoading"
      class="body-container"
      element-loading-text="Loading"
      height="100%"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
    >
      <!-- ID -->
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="75">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <!-- 列表数据 -->
      <el-table-column :label="$t('log.operatorRole')" align="center">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.operatorAccount')" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.operatorName')" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center">
        <template slot-scope="scope">
          {{ scope.row.detail }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('log.operateTime')" align="center">
        <template slot-scope="scope">
          {{ scope.row.create_time | parseTime }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="foot-container">
      <div class="action-container" />
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        class="foot-container"
        @pagination="fetchData"
      />
    </div>
  </div>
</template>

<script>
import { getList, getUserList } from '@/api/log'
import { parseTime, deepClone } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import RemoteSelect from '@/components/Form/RemoteSelect'

const defaultListQuery = {
  page: 1,
  limit: 20,
  sortProp: 'id',
  sortOrder: 'desc',
  filter: {
    user_id: 0,
    keyword: '',
    date: ''
  }
}

export default {
  name: 'Log',
  filters: {
    parseTime
  },
  components: {
    RemoteSelect,
    Pagination
  },
  data() {
    return {
      listLoading: true,
      list: null,
      total: 0,
      // 筛选条件
      listQuery: {},
      // 清空按钮状态
      clearBtnDisabled: true
    }
  },
  created() {
    // 初始化默认筛选条件
    this.listQuery = deepClone(defaultListQuery)
    // 请求列表数据
    this.fetchData()
  },
  methods: {
    getUserList,
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = parseInt(response.data.total)
      }).finally(() => {
        this.listLoading = false
      })
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
