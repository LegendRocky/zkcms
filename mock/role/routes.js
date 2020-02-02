// Just a mock data

export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: 'layout/Layout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: '首页', affix: true }
      }
    ]
  },
  {
    path: '/permission',
    component: 'layout/Layout',
    redirect: '/permission/role',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'Role Permission',
        meta: {
          title: '角色权限'
        }
      }
    ]
  },
  //工单系统
  {
    path: '/workorder',
    component: 'layout/Layout',
    name: 'workorder',
    redirect: '/workorder/orderlist',
    meta: {
      title: '工单管理'
    },
    children: [
      {
        path: "orderlist",
        name: 'orderlist',
        component: 'views/workorder/orderlist',
        meta: { title: '工单列表', noCache: true }
      },
      {
        path: "myorder",
        name: 'myorder',
        component: 'views/workorder/myorder',
        meta: { title: '我的工单', noCache: true }
      },

      {
        path: 'addorder',
        component: 'views/workorder/addorder',
        name: 'AddOrder',
        meta: { title: '添加工单', noCache: true }
      }
    ]
  },
  {
    path: '/health',
    component: 'layout/Layout',
    redirect: 'noRedirect',
    name: 'Health',
    meta: {
      title: "健康档案",
      icon: 'documentation'
    },
    children: [
      {
        path: 'list',
        component: 'views/health/list',
        name: 'HealthList',
        meta: { title: '会员列表', noCache: true }
      },
      {
        path: 'mylist',
        component: 'views/health/mylist',
        name: 'MyHealthList',
        meta: { title: '我的会员', noCache: true }
      },
      {
        path: 'signedList',
        component: 'views/health/signedList',
        name: 'SignedList',
        meta: { title: '已签列表', noCache: true }
      },
      {
        path: 'create',
        component: 'views/health/create',
        name: 'HealthCreate',
        meta: { title: '添加会员', noCache: true }
      }
    ]
  },
  {
    path: '/reports',
    component: 'layout/Layout',
    redirect: 'noRedirect',
    name: 'Reports',
    meta: {
      title: '销售报表',
      icon: 'excel'
    },
    children: [
      {
        path: 'list',
        component: 'views/reports/list',
        name: 'HealthList',
        meta: { title: '销售报表', noCache: true }
      },
      {
        path: 'mylist',
        component: 'views/reports/list',
        name: 'HealthList',
        meta: { title: '销售月报', noCache: true }
      },
      {
        path: 'reportsPerYear',
        component: 'views/reports/reportExcel',
        name: 'ReportExcel',
        meta: { title: '销售年报', noCache: true }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
