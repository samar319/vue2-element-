import router from '@/router'

import defaultMenus from '@/config/constants/menuConfig'

export const buildMenusData = (menus, routeMapping) => {
  const returnMenus = []
  const childrenMenus = []
  menus.forEach(function (element) {
    const menu = {
      id: element.menuId,
      keyId: element.menuId,
      title: element.menuName,
      component: element.component,
      path: element.path,
      params: null,
      query: {},
      parentId: element.parentKid,
      leaf: true,
      hidden: false,
      icon: element.icon,
      children: [],
      menuCode: element.menuCode,
      operationList: []
    }
    if (!element.component) {
      element.component = routeMapping[element.path]
    }
    if (element.params) {
      menu.params = JSON.parse(element.params)
    }
    if (element.query) {
      menu.query = JSON.parse(element.query)
    }
    if (element.hidden !== null && element.hidden !== undefined) {
      menu.hidden = element.hidden
    }
    if (element.menuCode !== null && element.menuCode !== undefined) {
      menu.menuCode = element.menuCode
    }
    if (
      element.opAuthorityDTOList !== null &&
      element.opAuthorityDTOList !== undefined
    ) {
      menu.operationList = element.opAuthorityDTOList
    }
    if (element.parentKid === '0') {
      returnMenus.push(menu)
    } else {
      childrenMenus.push(menu)
    }
  }, this)
  returnMenus.forEach(parentMenu => {
    getChildrenMenu(parentMenu, childrenMenus)
  })
  return [...defaultMenus, ...returnMenus]
}

function getChildrenMenu (menu, menus) {
  let flag = false
  menus.forEach(it => {
    if (it.parentId === menu.keyId) {
      menu.children.push(it)
      flag = true
      getChildrenMenu(it, menus)
    }
  })
  if (flag) {
    menu.leaf = false
  }
}

export const buildAuthMap = menus => {
  const map = Object.create(null)
  menus.forEach(it => {
    const { opAuthorityDTOList = [], path } = it
    const authCodes = opAuthorityDTOList.map(it => it.operationCode)
    map[path] = authCodes
  })
  return map
}

/**
 * 获取当前应用配置的所有菜单
 */
export const getSysMenuOptions = () => {
  const routes = []
  const options = router.options.routes

  const getPaths = arr => {
    arr.forEach(item => {
      if (item.children) {
        getPaths(item.children)
      } else {
        routes.push(item.path)
      }
    })
  }

  getPaths(options)

  return routes
}
