import request from '@/utils/request'

export function OrderList(params) {
	return request({
		url: '/mock/order/list',
		method: 'get',
		params: params
	})
}