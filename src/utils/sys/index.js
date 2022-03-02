/**
 * 字典配置项按照sortNo 进行排序后进行分组
 */
export const buildDictMaps = (data = []) => {
  const res = Object.create(null)
  data.sort(sortBySortNo).forEach(it => {
    const { dictTypeCode } = it
    if (!res[dictTypeCode]) {
      res[dictTypeCode] = [it]
    } else {
      res[dictTypeCode].push(it)
    }
  })
  return res
}

const sortBySortNo = (a, b) => {
  return a.sortNo - b.sortNo
}

export { buildMenusData, buildAuthMap } from './menus'
