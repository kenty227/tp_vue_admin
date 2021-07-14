<template>
  <div class="app-container">
    <div class="head-container">
      <div class="filter-container" />
      <div class="action-container">
        <el-button
          v-permission="'role:add'"
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
      element-loading-text="Loading"
      :data="rolesList"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="75">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.role.name')" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('permission.role.desc')">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="155">
        <template v-if="scope.row.id > 1" slot-scope="scope">
          <el-button v-permission="'role:edit'" type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('table.edit') }}
          </el-button>
          <delete-button
            :id="scope.row.id"
            v-permission="'role:delete'"
            :method="roleDelete"
            @callback="fetchData"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      destroy-on-close
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? $t('table.edit') : $t('table.add')"
      :close-on-click-modal="false"
    >
      <el-form :model="role" label-width="120px" label-position="left">
        <el-form-item :label="$t('permission.role.name')">
          <el-input v-model="role.name" />
        </el-form-item>
        <el-form-item :label="$t('permission.role.desc')">
          <el-input
            v-model="role.desc"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
        <el-form-item :label="$t('permission.role.permission')">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="permission"
            :props="defaultProps"
            default-expand-all
            show-checkbox
            node-key="id"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirmRole">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, getRoleList, roleAdd, roleEdit, roleDelete } from '@/api/permission'
import { deepClone } from '@/utils'
import DeleteButton from '@/components/Table/DeleteButton'
import permission from '@/directive/permission/index' // 权限判断指令

const defaultRole = {
  id: 0,
  name: '',
  desc: '',
  permission: []
}

export default {
  name: 'Role',
  directives: {
    permission
  },
  components: {
    DeleteButton
  },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      permission: [],
      rolesList: [],
      listLoading: false,
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.fetchData()
    // 获取权限列表
    this.fetchPermissionList()
  },
  methods: {
    roleDelete,
    // 权限列表
    fetchPermissionList() {
      getPermissionList({ filter: { selectable: 1 }}).then(response => {
        this.permission = response.data
      })
    },
    // 角色列表
    fetchData() {
      this.listLoading = true
      getRoleList().then(response => {
        this.rolesList = response.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    handleAdd() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit({ row }) {
      this.role = deepClone(row)
      this.checkStrictly = true
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.role.permission)
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    async confirmRole() {
      const tree = this.$refs.tree
      this.role.permission = tree.getCheckedKeys().concat(tree.getHalfCheckedKeys())

      if (this.dialogType === 'edit') {
        await roleEdit(this.role)
      } else {
        await roleAdd(this.role)
      }

      this.dialogVisible = false
      this.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/views/list-without-foot.scss";

.app-container {
  .permission-tree {
    /*margin-bottom: 30px;*/
  }
}
</style>
