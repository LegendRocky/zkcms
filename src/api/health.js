import request from '@/utils/request'

export function listHealth() {
  	return request({
    	url: '/health/list',
    	method: 'get'
  	})
}

export function searchHealth(params) {
  	return request({
	    url: '/health/search',
	    method: 'get',
	    params: params
  	})
}

export function MylistHealth(params) {
	return request({
		url: '/mock/health/mylist',
		method: 'get',
		params: params
	})
}

export function SignedList(params) {
	return request({
		url: '/mock/health/signedlist',
		method: 'get',
		params: params
	})
}

export function createHealthFile(data) {
	return request({
		url: '/health/create',
		method: 'post',
		data
	})
}