import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { 
          title: '首页', 
          icon: 'dashboard', 
          affix: true
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { 
          title: '个人中心', 
          icon: 'user',
          ache: true 
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 根据权限动态加载
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'Role Permission',
        meta: {
          title: '角色权限',
          roles: ['admin'],
          icon: 'user'
        }
      }
    ]
  },
  {
    path: '/companymember',
    component: Layout,
    redirect: '/companymember/list',
    alwaysShow: true, // will always show the root menu
    name: 'CompanyMember',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/companymember/list'),
        name: 'CompanyMember',
        meta: {
          title: '用户列表',
          roles: ['admin'],
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book/list',
    name: 'Book',
    hidden: true,
    meta: {
      title: '图书管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/book/list'),
        name: 'BookList',
        meta: { title: '图书列表', icon: 'list', noCache: true }
      },
      {
        path: 'create',
        component: () => import('@/views/book/create'),
        name: 'CreateBook',
        meta: { title: '添加图书', icon: 'edit', noCache: true }
      },
      {
        path: 'edit/:fileName(\\w+)',
        component: () => import('@/views/book/edit'),
        name: 'EditBook',
        meta: { title: '编辑图书', noCache: true, activeMenu: '/book/list' },
        hidden: true
      }
    ]
  },
  //工单系统
  {
    path: '/workorder',
    component: Layout,
    name: 'workorder',
    redirect: '/workorder/orderlist',
    meta: {
      title: '工单管理',
      roles: ['admin', 'editor'],
      icon: 'bug'
    },
    children: [
      {
        path: "orderlist",
        name: 'orderlist',
        component: () => import('@/views/workorder/orderlist'),
        meta: { title: '工单列表', icon: 'list', noCache: true }
      },
      {
        path: "myorder",
        name: 'myorder',
        component: () => import('@/views/workorder/myorder'),
        meta: { title: '我的工单', icon: 'list', noCache: true }
      },

      {
        path: 'addorder',
        component: () => import('@/views/workorder/addorder'),
        name: 'AddOrder',
        meta: { title: '添加工单', icon: 'edit', noCache: true }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    name: 'link1',
    hidden: true,
    children: [
      {
        path: 'https://coding.imooc.com/class/285.html',
        meta: { title: '小慕读书中后台', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/health',
    component: Layout,
    redirect: '/health/list',
    name: 'Health',
    meta: {
      title: "健康档案",
      icon: 'documentation',
      roles: ['admin']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/health/list'),
        name: 'HealthList',
        meta: { title: '会员列表', roles: ['admin'], icon: 'list', noCache: true }
      },
      {
        path: 'mylist',
        component: () => import('@/views/health/mylist'),
        name: 'MyHealthList',
        meta: { title: '我的会员',  icon: 'list', noCache: true }
      },
      {
        path: 'signedList',
        component: () => import('@/views/health/signedList'),
        name: 'SignedList',
        meta: { title: '已签列表', icon: 'list', noCache: true }
      },
      {
        path: 'create',
        component: () => import('@/views/health/create'),
        name: 'HealthCreate',
        meta: { title: '添加会员', icon: 'edit', noCache: true }
      }
    ]
  },
  {
    path: '/reports',
    component: Layout,
    redirect: '/reports/list',
    name: 'Reports',
    meta: {
      title: '销售报表',
      icon: 'excel',
      roles: ['admin']
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/reports/list'),
        name: 'HealthList',
        meta: { title: '销售报表', icon: 'list', noCache: true }
      },
      {
        path: 'mylist',
        component: () => import('@/views/reports/list'),
        name: 'HealthList',
        meta: { title: '销售报表', icon: 'list', noCache: true }
      },
      {
        path: 'reportsPerYear',
        component: () => import('@/views/reports/reportExcel'),
        name: 'ReportExcel',
        meta: { title: '销售年报', icon: 'list', noCache: true }
      },
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
