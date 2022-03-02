
import { Loading } from 'element-ui'
import { getRequestKey } from './helper'

// loading 的接口
const loadingQueue = []
let loadingInstance = null

/**
 * 全局loading效果
 * @param {*} config
 */
function showLoading (config) {
  if (config.showLoading) {
    const key = getRequestKey(config)
    loadingQueue.push(key)
    config.loadingKey = key
  }

  if (loadingQueue.length > 0) {
    loadingInstance = Loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.1)'
    })
  }
}

/**
 * 清除loading 队列数据
 * @param {*} key
 * @returns
 */
const removeByKey = key => {
  if (!key) return

  const index = loadingQueue.findIndex(it => it === key)

  if (index > -1) {
    loadingQueue.splice(index, 1)
    // 清除loading效果
    if (loadingQueue.length === 0) {
      loadingInstance && loadingInstance.close()
    }
  } else {
    console.info(`未能找到对应需要loading的接口${key}`)
  }
}

function hideLoading (config) {
  if (config.loadingKey) {
    removeByKey(config.loadingKey)
  }
}

/**
 * 对于重复的请求 清楚一次loading 队列
 */
export const clearLoadingQueue = config => {
  if (config.showLoading) {
    const key = getRequestKey(config)
    removeByKey(key)
  }
}
export { showLoading, hideLoading }
