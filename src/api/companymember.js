import request from '@/utils/request'

export function CompanyMemberList(params) {
	return request({
		url: '/user/list',
		method: 'get',
		params: params
	})
}