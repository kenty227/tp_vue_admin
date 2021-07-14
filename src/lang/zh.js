export default {
  route: {
    Dashboard: '首页',
    Password: '修改密码',
    SystemManage: '系统管理',
    OperationLog: '操作日志',
    CacheManage: '缓存管理',
    IT: '权限管理',
    PermissionManage: '权限管理',
    PermissionUserManage: '用户管理',
    PermissionUserManageAdd: '用户管理-添加',
    PermissionUserManageEdit: '用户管理-编辑',
    PermissionRoleManage: '角色管理',
    PermissionPermissionManage: '权限管理',
    Demo: 'Demo',
    DemoList: 'Demo',
    DemoAdd: 'Demo 添加',
    DemoEdit: 'Demo 编辑'
  },
  navbar: {
    dashboard: '首页',
    editPassword: '修改密码',
    refresh: '刷新用户信息',
    logOut: '退出登录'
  },
  login: {
    title: '后台登录',
    username: '账号',
    password: '密码',
    logIn: '登录',
    PwdCheckHint: '密码不能小于6位'
  },
  logOut: {
    confirmTitle: '确定登出',
    confirmContent: '您已被登出，妳可以点击“取消”按钮以停留在此页面，或者选择“重新登录”',
    confirmButtonText: '重新登录',
    cancelButtonText: '取消'
  },
  password: {
    old: '旧密码',
    enterOld: '输入旧密码',
    new: '新密码',
    enterNew: '输入新密码',
    repeatNew: '重复新密码',
    enterNewAgain: '再次输入新密码',
    confirm: '确认修改',
    different: '两次输入密码不壹致'
  },
  common: {
    confirm: '确定',
    cancel: '取消',
    close: '关闭',
    hint: '提示',
    download: '下载',
    date: '日期',
    date_separator: '至',
    start_date: '开始日期',
    end_date: '结束日期',
    yes: '是',
    no: '否'
  },
  copy: {
    tip: '点击複制',
    success: '複制成功'
  },
  table: {
    search: '搜索',
    clear: '清空',
    title: '标题',
    index: '序号',
    id: '序号',
    sort: '排序',
    create_time: '创建时间',
    update_time: '更新时间',
    actions: '操作',
    add: '新增',
    detail: '详情',
    edit: '编辑',
    delete: '删除',
    batchDelete: '批量删除',
    batchTip: '请至少选择一条数据',
    deleteConfirm: '确定删除吗？',
    deleteSuccess: '删除成功',
    import: '导入',
    export: '导出'
  },
  form: {
    save: '保存',
    back: '返回',
    saveSuccess: '保存成功',
    OperationProhibited: '禁止操作'
  },
  upload: {
    common: {
      dragSortTip: '长按鼠标左键可拖拽排序',
      uploadTip: '将文件拖到此处，或 点击上传',
      success: '上传成功'
    },
    file: {
      uploadFile: '上传文件',
      selectFile: '选择文件',
      formatError: '上传文件格式错误！',
      tips: {
        exceedSingleFile: '只能上传壹个文件！'
      }
    },
    excel: {
      tip: '只能上传 xls / xlsx 文件，且不超过 ',
      templateDownload: '模板下载：',
      formatError: '上传文件只能是 Excel 文件！',
      sizeError: '上传文件大小不能超过 '
    },
    image: {
      tip: '只能上传图片格式文件，图片大小限制：',
      sizeLimit: '上传图片大小限制：',
      recommendSize: '最佳尺寸爲',
      formatError: '上传图片格式错误',
      sizeError: '上传图片大小不能超过 '
    },
    video: {
      sizeLimit: '上传视频大小限制：',
      recommendSize: '最佳尺寸爲',
      formatError: '上传视频格式错误',
      sizeError: '上传视频大小不能超过 '
    }
  },
  permission: {
    user: {
      account: '账号',
      password: '密码',
      name: '姓名',
      phone: '手机号码',
      role: '角色',
      last_login: '最后登录时间',
      status: '在职状态',
      is_lock: '锁定状态',
      locked: '锁定',
      unlocked: '不锁定',
      onJob: '在职',
      offJob: '离职',
      statusName: {
        0: '离职',
        1: '在职'
      },
      lockName: {
        0: '正常',
        1: '锁定'
      }
    },
    role: {
      name: '名称',
      desc: '描述',
      type: '类型',
      groups: '群组',
      rules: '扩展规则',
      permission: '权限',
      options: {
        type: {
          1: '普通角色',
          10: '客服角色'
        },
        rules: {
          10: '活动管理限制查看同角色数据',
          20: '客服消息限制查看本人数据'
        }
      }
    },
    permission: {
      pid: '上级',
      title: '权限标题',
      type: '类型',
      path: '前端路由',
      component: '前端页面组件',
      name: '前端页面名称',
      icon: '前端菜单图标',
      hidden: '前端菜单/页面隐藏',
      permission: '权限标识',
      selectable: '是否可选',
      status: '状态',
      expandAll: '展开所有',
      takeBackAll: '收回所有',
      options: {
        type: {
          10: '菜单',
          20: '页面',
          25: '页面 & 按钮',
          30: '按钮'
        },
        hidden: {
          0: '否',
          1: '是'
        },
        selectable: {
          0: '不可选',
          1: '可选'
        },
        status: {
          0: '禁用',
          1: '启用'
        }
      }
    }
  },
  '404': {
    copyrightHead: '版权所有',
    copyright: '型科科技',
    errorMsg: '链接错误......',
    errorDesc: '请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告',
    button: '返回首页'
  },
  log: {
    operatorRole: '操作人角色',
    operatorAccount: '操作人账号',
    operatorName: '操作人名称',
    operateContent: '操作内容',
    operateTime: '操作时间'
  },
  demo: {
    type: '类型',
    title: '标题',
    content: '内容',
    image: '图片',
    options: {
      type: {
        1: '测试类型_1',
        2: '测试类型_2'
      }
    }
  }
}
