/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-before-function-paren */
import request from '@/utils/request'

// 查询GiftInfo列表
export function listGiftInfo(query) {
  return request({
    url: '/api/v1/gift-info',
    method: 'get',
    params: query
  })
}

// 查询GiftInfo详细
export function getGiftInfo (id) {
  return request({
    url: '/api/v1/gift-info/' + id,
    method: 'get'
  })
}


// 新增GiftInfo
export function addGiftInfo(data) {
  return request({
    url: '/api/v1/gift-info',
    method: 'post',
    data: data
  })
}

// 修改GiftInfo
export function updateGiftInfo(data) {
  return request({
    url: '/api/v1/gift-info/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除GiftInfo
export function delGiftInfo(data) {
  return request({
    url: '/api/v1/gift-info',
    method: 'delete',
    data: data
  })
}

