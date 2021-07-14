<template>
  <div class="app-container">
    <div class="head-container">
      <div class="filter-container">
        <el-input
          v-model="listQuery.filter.keyword"
          :placeholder="$t('permission.user.account') + ' / ' + $t('permission.user.name') + ' / ' + $t('permission.user.phone')"
          class="head-item head-item_input"
          @keyup.enter.native="handleFilter"
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
      <div class="action-container">
        <el-button
          v-permission="'user:add'"
          class="head-item"
          type="primary"
          icon="el-icon-edit"
          @click="handleAdd"
        >
          {{ $t('table.add') }}
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      class="body-container"
      element-loading-text="Loading"
      height="100%"
      :data="list"
      fit
      border
      stripe
      highlight-current-row
    >
      <el-table-column label="ID" prop="id" align="center" width="75">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <!-- 列表数据 -->
      <el-table-column :label="$t('permission.user.account')" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.user.name')" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.user.phone')" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.user.role')" align="center">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.user.last_login')" width="155" align="center">
        <template slot-scope="scope">
          {{ scope.row.last_login | parseTime }}
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column :label="$t('permission.user.status')" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusType">{{ statusName(scope.row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.user.is_lock')" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_lock | lockType">{{ lockName(scope.row.is_lock) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('table.actions')" width="180" align="center">
        <template v-if="row.id > 1" slot-scope="{row}">
          <el-button v-permission="'user:edit'" type="primary" size="small" @click="handleEdit(row.id)">
            {{ $t('table.edit') }}
          </el-button>
          <delete-button :id="row.id" v-permission="'user:delete'" :method="userDelete" @callback="fetchData" />
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
import { getUserList, userDelete } from '@/api/permission'
import { parseTime, deepClone } from '@/utils'
import DeleteButton from '@/components/Table/DeleteButton'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index' // 权限判断指令

const defaultListQuery = {
  page: 1,
  limit: 20,
  filter: {
    keyword: ''
  }
}

export default {
  name: 'User',
  filters: {
    parseTime,
    statusType(status) {
      return status === 1 ? 'success' : 'danger'
    },
    lockType(isLock) {
      return isLock === 1 ? 'danger' : 'success'
    }
  },
  components: {
    DeleteButton,
    Pagination
  },
  directives: {
    permission
  },
  data() {
    return {
      listLoading: false,
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
    userDelete,
    statusName(status) {
      return parseInt(status) === 1 ? this.$i18n.t('permission.user.statusName.1') : this.$i18n.t('permission.user.statusName.0')
    },
    lockName(isLock) {
      return isLock === 1 ? this.$i18n.t('permission.user.lockName.1') : this.$i18n.t('permission.user.lockName.0')
    },
    fetchData() {
      this.listLoading = true
      getUserList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = parseInt(response.data.total)
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleAdd() {
      this.$router.push({ path: 'user/add' })
    },
    handleEdit(id) {
      this.$router.push({ path: 'user/edit/' + id })
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/views/list.scss";

.app-container {
  .head-item_input {
    width: 200px;
  }
}
</style>
