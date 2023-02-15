/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-before-function-paren */
import request from '@/utils/request'

// 查询SysTags列表
export function listSysTags(query) {
  return request({
    url: '/api/v1/sys-tags',
    method: 'get',
    params: query
  })
}
export function GetListTags() {
  return request({
    url: '/api/v1/sys-tags/list',
    method: 'get'
  })
}
// 查询SysTags详细
export function getSysTags(id) {
  return request({
    url: '/api/v1/sys-tags/' + id,
    method: 'get'
  })
}


// 新增SysTags
export function addSysTags(data) {
  return request({
    url: '/api/v1/sys-tags',
    method: 'post',
    data: data
  })
}

// 修改SysTags
export function updateSysTags(data) {
  return request({
    url: '/api/v1/sys-tags/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除SysTags
export function delSysTags(data) {
  return request({
    url: '/api/v1/sys-tags',
    method: 'delete',
    data: data
  })
}

