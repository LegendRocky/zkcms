import Mock from 'mockjs'

const List = []
const myCount = 200
for (let i = 0; i < myCount; i++) {
  List.push(Mock.mock({
    "id": '@increment',
    "device|1":["打印机", "电脑", "电话", "医疗器械"],
    "des|1":["设备太卡了","兼容性问题","驱动设置有误","我也不知道为什么，反正今天系统特别卡，经常被强制退出来"],
    "sex|1":["男","女"],
    "block_num|1": ["1号楼", "2号楼", "3号楼"],
    "floor_num|1": ["1楼", "2楼", "3楼", "4楼", "5楼", "6楼", "7楼"],
    "room_addr|1": ["护士站", "医生办公室"],
    "report_member": "@cname",
    "state|1": ["已派单","未派单","未接单","已接单","已解决"],
    "date": +Mock.Random.date('T')
  }))
}


export default [
  {
    url: '/order/list',
    type: 'get',
    response: config => {
      const { importance, type, title, page = 1, limit = 10, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }
]

