<template>
  <div class="app-container">
    <div class="head-container">
      <div class="filter-container" />
      <div class="action-container">
        <el-button
          v-permission="'cache:delete'"
          class="head-item"
          type="danger"
          @click="handleDelete('')"
        >
          {{ $t('table.clear') }}
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
    >
      <!--<el-table-column label="INDEX" align="center" width="75">-->
      <!--  <template slot-scope="scope">-->
      <!--    {{ scope.$index + 1 }}-->
      <!--  </template>-->
      <!--</el-table-column>-->
      <!-- 列表数据 -->
      <el-table-column label="KEY" align="center" width="200">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column label="VALUE" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column label="TTL" align="center" width="75">
        <template slot-scope="scope">
          {{ scope.row.ttl }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleCheck(scope)">{{ $t('table.detail') }}
          </el-button>
          <el-button
            v-permission="'cache:delete'"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.key)"
          >
            {{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogVisible" :title="form.key" @close="handleClose">
      <json-viewer
        v-cloak
        :value="form.value"
        :expand-depth="4"
        expanded
        boxed
      />
    </el-dialog>
  </div>
</template>

<script>
import { getList, del } from '@/api/cache'
import { deepClone } from '@/utils'
import permission from '@/directive/permission/index' // 权限判断指令
import JsonViewer from 'vue-json-viewer'

const defaultForm = {
  key: '',
  value: {}
}

export default {
  name: 'Cache',
  components: {
    JsonViewer
  },
  directives: {
    permission
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dialogVisible: false,
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleDelete(key) {
      this.$confirm(this.$i18n.t('table.deleteConfirm'), this.$i18n.t('common.hint'), {
        confirmButtonText: this.$i18n.t('common.confirm'),
        cancelButtonText: this.$i18n.t('common.cancel'),
        type: 'warning'
      }).then(() => {
        del({ key }).then(() => {
          this.$message({
            message: this.$i18n.t('table.deleteSuccess'),
            type: 'success'
          })
          this.fetchData()
        })
      })
    },
    handleCheck({ row }) {
      this.form = { key: row.key, value: row.value }
      this.dialogVisible = true
    },
    handleClose() {
      this.form = deepClone(defaultForm)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/views/list-without-foot.scss";
</style>
