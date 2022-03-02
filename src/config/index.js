/**
 * 生产环境
 */
export const isProd = process.env.NODE_ENV === 'production'
/**
 * 开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'

/**
 *是否是单点登录
 */
export const isSingleSignOn = true

/**
 * 本地静态界面开发模式
 * 当前模式下 去掉权限限制
 */
export const localhostDev = false
