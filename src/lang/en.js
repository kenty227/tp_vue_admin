export default {
  route: {
    dashboard: 'Dashboard',
    password: 'Edit Password',
    SystemManage: 'System Manage',
    OperationLog: 'Operation Log',
    CacheManage: 'Cache Manage',
    IT: 'Permission Manage',
    PermissionManage: 'Permission Manage',
    PermissionUserManage: 'User Manage',
    PermissionUserManageAdd: 'User Add',
    PermissionUserManageEdit: 'User Edit',
    PermissionRoleManage: 'Role Manage',
    PermissionPermissionManage: 'Permission Manage',
    Demo: 'Demo',
    DemoList: 'Demo',
    DemoAdd: 'Demo add',
    DemoEdit: 'Demo edit'
  },
  navbar: {
    dashboard: 'Dashboard',
    editPassword: 'Edit password',
    refresh: 'Refresh user info',
    logOut: 'Logout'
  },
  login: {
    title: 'Login',
    username: 'Username',
    password: 'Password',
    logIn: 'Login',
    PwdCheckHint: 'The password must not be less than 6 digits'
  },
  logOut: {
    confirmTitle: 'Logout confirm',
    confirmContent: 'You have been logged out, you can click the "Cancel" button to stay on this page, or choose "Re Login"',
    confirmButtonText: 'Re Login',
    cancelButtonText: 'Cancel'
  },
  password: {
    old: 'Old Password',
    enterOld: 'Please enter the old password',
    new: 'New Password',
    enterNew: 'Please enter a new password',
    repeatNew: 'Repeat Password',
    enterNewAgain: 'Please enter the new password again',
    confirm: 'Confirm',
    different: 'Two passwords are different'
  },
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    hint: 'Hint',
    download: 'Download',
    date: 'Date',
    date_separator: 'to',
    start_date: 'Start date',
    end_date: 'End date',
    yes: 'Yes',
    no: 'No'
  },
  copy: {
    tip: 'Click to copy',
    success: 'Copy successfully'
  },
  table: {
    search: 'Search',
    clear: 'Clear',
    title: 'Title',
    index: 'Index',
    id: 'Id',
    sort: 'Sort',
    create_time: 'Create time',
    update_time: 'Update time',
    add: 'Add',
    detail: 'Detail',
    edit: 'Edit',
    actions: 'Actions',
    delete: 'Delete',
    batchDelete: 'Batch Delete',
    batchTip: 'Please select at least one row of data',
    deleteConfirm: 'Are you sure to delete it?',
    deleteSuccess: 'Delete Success',
    import: 'Import',
    export: 'Export'
  },
  form: {
    save: 'Save',
    back: 'Back',
    saveSuccess: 'Save Success',
    OperationProhibited: 'Operation Prohibited'
  },
  upload: {
    common: {
      dragSortTip: 'Long press the left mouse button to achieve drag sorting',
      uploadTip: 'Drag the file here, or click to upload',
      success: 'Upload successfully'
    },
    file: {
      uploadFile: 'Upload file',
      selectFile: 'Select file',
      formatError: 'Upload file format error!',
      tips: {
        exceedSingleFile: 'Only one file can be uploaded!'
      }
    },
    excel: {
      tip: 'Only upload xls / xlsx files, and no more than',
      templateDownload: 'Template download：',
      formatError: 'Upload file can only be an Excel file!',
      sizeError: 'Upload file size cannot exceed '
    },
    image: {
      tip: 'Only picture files can be uploaded, picture size limit: ',
      sizeLimit: 'Upload image size limit: ',
      recommendSize: 'The best size is',
      formatError: 'Upload image format error',
      sizeError: 'Upload image size cannot exceed '
    },
    video: {
      sizeLimit: 'Upload video size limit: ',
      recommendSize: 'The best size is',
      formatError: 'Upload video format error',
      sizeError: 'Upload video size cannot exceed '
    }
  },
  permission: {
    user: {
      account: 'Account',
      password: 'Password',
      name: 'Name',
      phone: 'Phone',
      role: 'Role',
      last_login: 'Last login time',
      status: 'Status',
      is_lock: 'Locked status',
      locked: 'Locked',
      unlocked: 'Unlocked',
      onJob: 'On job',
      offJob: 'Off job',
      statusName: {
        0: 'Off job',
        1: 'On job'
      },
      lockName: {
        0: 'Normal',
        1: 'Locked'
      }
    },
    role: {
      name: 'Name',
      desc: 'Description',
      type: 'Type',
      groups: 'Groups',
      rules: 'Extension rules',
      permission: 'Permission',
      options: {
        type: {
          1: 'Normal',
          10: 'Customer service'
        },
        rules: {
          10: 'Activity management restricts viewing data of the same role',
          20: 'Customer service message restricts viewing of personal data'
        }
      }
    },
    permission: {
      pid: 'Superior',
      title: 'Title',
      type: 'Type',
      path: 'Path',
      component: 'Component',
      name: 'Name',
      icon: 'Icon',
      hidden: 'Hidden',
      permission: 'Authority ID',
      selectable: 'Selectable',
      status: 'Status',
      expandAll: 'Expand all',
      takeBackAll: 'Take back all',
      options: {
        type: {
          10: 'Menu',
          20: 'Page',
          25: 'Page & Button',
          30: 'Button'
        },
        hidden: {
          0: 'No',
          1: 'Yes'
        },
        selectable: {
          0: 'Disable',
          1: 'Enable'
        },
        status: {
          0: 'Disable',
          1: 'Enable'
        }
      }
    }
  },
  '404': {
    copyrightHead: '@copyright',
    copyright: 'XingkeTechnology',
    errorMsg: 'Link error ......',
    errorDesc: 'Please check the URL you entered is correct, please click the button below to return to the home page',
    button: 'Back to home'
  },
  log: {
    operatorRole: 'Operator role',
    operatorAccount: 'Operator account',
    operatorName: 'Operator name',
    operateContent: 'Operation content',
    operateTime: 'Operate time'
  },
  demo: {
    type: 'Type',
    title: 'Title',
    content: 'Content',
    image: 'Image',
    options: {
      type: {
        1: '测试类型_1',
        2: '测试类型_2'
      }
    }
  }
}
