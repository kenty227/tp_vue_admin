<template>
  <div class="app-container">
    <div class="head-container">
      <div class="filter-container">
        <el-button type="success" icon="el-icon-arrow-down" @click="toggleRowExpansion(true)">
          {{ $t('permission.permission.expandAll') }}
        </el-button>
        <el-button type="success" icon="el-icon-arrow-up" @click="toggleRowExpansion(false)">
          {{ $t('permission.permission.takeBackAll') }}
        </el-button>
      </div>
      <div class="action-container">
        <el-button
          v-permission="'permission:add'"
          class="head-item"
          type="primary"
          icon="el-icon-edit"
          @click="handleAdd"
        >
          {{ $t('table.add') }}
        </el-button>
      </div>
    </div>
    <!-- 列表 -->
    <el-table
      ref="tree"
      v-loading="listLoading"
      element-loading-text="Loading"
      :data="list"
      row-key="id"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column :label="$t('permission.permission.title')">
        <template slot-scope="scope">
          <el-tag :type="typeShowOption[scope.row.type].type" :effect="typeShowOption[scope.row.type].effect">
            {{ scope.row.title }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.type')" align="center" width="100">
        <template slot-scope="scope">
          {{ typeOption[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.path')">
        <template slot-scope="scope">
          {{ scope.row.path }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.component')">
        <template slot-scope="scope">
          {{ scope.row.component }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.name')">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.hidden')" align="center" width="60">
        <template slot-scope="scope">
          {{ hiddenOption[scope.row.hidden] }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.permission')">
        <template slot-scope="scope">
          {{ scope.row.permission }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.icon')" align="center" width="60">
        <template slot-scope="scope">
          <i v-if="scope.row.icon.indexOf('el-icon-') !== -1" :class="scope.row.icon" />
          <svg-icon v-else :icon-class="scope.row.icon" class-name="disabled" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.sort')" align="center" width="60">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('permission.permission.status')" align="center" width="60">
        <template slot-scope="scope">
          {{ statusOption[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="160">
        <template slot-scope="scope">
          <el-button v-permission="'permission:edit'" type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('table.edit') }}
          </el-button>
          <delete-button
            :id="scope.row.id"
            v-permission="'permission:delete'"
            :method="permissionDelete"
            @callback="fetchData"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑弹窗 -->
    <el-dialog
      :title="dialogType === 'edit' ? $t('table.edit') : $t('table.add')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form :model="form" label-width="150px" label-position="left">
        <el-form-item :label="$t('permission.permission.type')" prop="type">
          <number-string-radio :model.sync="form.type" :options="typeOption" />
        </el-form-item>
        <el-form-item :label="$t('permission.permission.pid')" prop="pid">
          <el-cascader
            ref="pid-cascader"
            v-model="form.pid"
            class="form-item"
            :show-all-levels="false"
            :options="parentList"
            :props="{ multiple: false, checkStrictly: true, emitPath: false, value: 'id', label: 'title' }"
            clearable
            filterable
            @change="handleChangePid"
          />
        </el-form-item>
        <el-form-item :label="$t('permission.permission.title')" prop="title">
          <el-input v-model="form.title" class="form-item" />
        </el-form-item>
        <el-form-item v-show="form.type !== 30" :label="$t('permission.permission.path')" prop="path">
          <el-input v-model="form.path" class="form-item" />
        </el-form-item>
        <el-form-item v-show="form.type !== 30" :label="$t('permission.permission.component')" prop="component">
          <el-input v-model="form.component" class="form-item" />
        </el-form-item>
        <el-form-item v-show="form.type !== 30" :label="$t('permission.permission.name')" prop="name">
          <el-input v-model="form.name" class="form-item" />
        </el-form-item>
        <el-form-item v-show="form.type === 10" :label="$t('permission.permission.icon')" prop="icon">
          <el-input v-model="form.icon" class="form-item" />
          <el-button icon="el-icon-search" circle style="margin-left: 1em" @click="iconDialogVisible = true" />
        </el-form-item>
        <el-form-item v-show="form.type !== 30" :label="$t('permission.permission.hidden')" prop="hidden">
          <number-string-radio :model.sync="form.hidden" :options="hiddenOption" />
        </el-form-item>
        <el-form-item :label="$t('permission.permission.permission')" prop="permission">
          <el-input v-model="form.permission" class="form-item" />
        </el-form-item>
        <el-form-item :label="$t('table.sort')" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right" :min="0" :max="250" class="form-item" />
        </el-form-item>
        <el-form-item :label="$t('permission.permission.selectable')" prop="selectable">
          <number-string-radio :model.sync="form.selectable" :options="selectableOption" />
        </el-form-item>
        <el-form-item :label="$t('permission.permission.status')" prop="status">
          <number-string-radio :model.sync="form.status" :options="statusOption" />
        </el-form-item>
      </el-form>
      <div v-loading="formLoading" style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirmForm">{{ $t('common.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 图标选择弹窗 -->
    <el-dialog :visible.sync="iconDialogVisible" :title="$t('permission.permission.icon')">
      <icons @selectIcon="selectIcon" />
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import {
  getPermissionList,
  getParentList,
  permissionAdd,
  permissionEdit,
  permissionDelete
} from '@/api/permission'
import NumberStringRadio from '@/components/Form/NumberStringRadio'
import DeleteButton from '@/components/Table/DeleteButton'
import Icons from './icons/index'
import permission from '@/directive/permission/index' // 权限判断指令

const defaultForm = {
  id: 0,
  pid: 0,
  type: 0,
  title: '',
  path: '',
  component: '',
  name: '',
  icon: '',
  hidden: 0,
  permission: '',
  sort: 0,
  selectable: 1,
  status: 1
}

export default {
  name: 'Permission',
  components: {
    NumberStringRadio,
    DeleteButton,
    Icons
  },
  directives: {
    permission
  },
  data() {
    return {
      typeShowOption: {
        '10': { type: 'primary', effect: 'dark' },
        '20': { type: 'success', effect: 'light' },
        '25': { type: 'warning', effect: 'light' },
        '30': { type: 'info', effect: 'plain' }
      },
      list: [],
      listLoading: false,
      form: {},
      formLoading: false,
      dialogType: 'new',
      dialogVisible: false,
      parentList: [],
      refreshFormPidList: false,
      iconDialogVisible: false
    }
  },
  computed: {
    typeOption() {
      return {
        10: this.$i18n.t('permission.permission.options.type.10'),
        20: this.$i18n.t('permission.permission.options.type.20'),
        25: this.$i18n.t('permission.permission.options.type.25'),
        30: this.$i18n.t('permission.permission.options.type.30')
      }
    },
    hiddenOption() {
      return {
        0: this.$i18n.t('permission.permission.options.hidden.0'),
        1: this.$i18n.t('permission.permission.options.hidden.1')
      }
    },
    selectableOption() {
      return {
        0: this.$i18n.t('permission.permission.options.selectable.0'),
        1: this.$i18n.t('permission.permission.options.selectable.1')
      }
    },
    statusOption() {
      return {
        0: this.$i18n.t('permission.permission.options.status.0'),
        1: this.$i18n.t('permission.permission.options.status.1')
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    permissionDelete,
    // 上级列表
    fetchParentList() {
      if (this.parentList.length === 0 || this.refreshFormPidList) {
        getParentList().then(response => {
          this.parentList = response.data
        })
      }
    },
    // 权限列表
    fetchData() {
      this.listLoading = true
      getPermissionList().then(response => {
        this.list = response.data
      }).finally(() => {
        this.listLoading = false
      })
    },
    // 选择图标
    selectIcon(icon) {
      this.form.icon = icon
      this.iconDialogVisible = false
    },
    toggleRowExpansion(isExpansion) {
      this.toggleRowExpansionAll(this.list, isExpansion)
    },
    toggleRowExpansionAll(data, isExpansion) {
      data.forEach(item => {
        this.$refs.tree.toggleRowExpansion(item, isExpansion)
        if (item.children) {
          this.toggleRowExpansionAll(item.children, isExpansion)
        }
      })
    },
    handleChangePid() {
      if (this.form.pid === null && this.form.component === '') {
        this.form.component = 'Layout'
      } else if (this.form.pid > 0 && this.form.component === 'Layout') {
        this.form.component = ''
      }
    },
    handleAdd() {
      this.fetchParentList()
      this.form = deepClone(defaultForm)

      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit({ row }) {
      this.fetchParentList()
      this.form = deepClone(row)

      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    confirmForm() {
      this.formLoading = true
      this.confirmSave(this.form).then(response => {
        this.list = response.data

        // 刷新表单上级菜单列表
        this.refreshFormPidList = !this.refreshFormPidList

        this.$message({
          message: this.$i18n.t('form.saveSuccess'),
          type: 'success'
        })
        this.dialogVisible = false
        this.fetchData()
      }).finally(() => {
        this.formLoading = false
      })
    },
    confirmSave(data) {
      if (this.dialogType === 'edit') {
        return permissionEdit(data)
      } else {
        return permissionAdd(data)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/views/list-without-foot.scss";

.app-container {
  .el-dialog {
    .form-item {
      width: 300px;
    }
  }
}
</style>
