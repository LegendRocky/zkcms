import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/roles/routes',
    method: 'get'
  })
}

export function getRoutesByRole(params) {
  return request({
    url: '/roles/routesByRole',
    method: 'get',
    params: params
  })
}

export function getRoles(params) {
  return request({
    url: '/roles/list',
    method: 'get',
    params: params
  })
}

export function addRole(data) {
  return request({
    url: '/roles/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  console.log('update::::::')
  console.log(data)
  return request({
    url: `/mock/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/mock/role/${id}`,
    method: 'delete'
  })
}
