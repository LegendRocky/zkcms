<template>
  	<div class="app-container">
	    <div class="filter-container">
        <el-date-picker v-model="sendTemp.timestamp" type="datetime" placeholder="Please pick a date" />
	      <el-input
        v-model="listQuery.username"
        clearable
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-date-picker v-model="sendTemp.timestamp" type="datetime" placeholder="Please pick a date" />
      <el-input
        v-model="listQuery.mobile"
        clearable
        placeholder="电话号码"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="handleSearch"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >
        新增
      </el-button>
	    </div>
		<el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="120"
      />
      <el-table-column label="故障设备" width="150" align="center" prop="device">
      </el-table-column>
	    <el-table-column label="故障描述" width="150" align="center" prop="des">
      </el-table-column>
      <el-table-column label="楼号" width="150" align="center" prop="block_num">
      </el-table-column>
      <el-table-column label="楼层" prop="floor_num" width="150" align="center" />
      <el-table-column label="房间位置" prop="room_addr" width="200" align="center" />
      <el-table-column label="报修人员" prop="report_member" width="150" align="center" />
      <el-table-column label="报修时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" width="150" align="center" />
      <el-table-column label="操作" align="center" width="120" fixed="right">
        <template slot-scope="{ row }">
          <PreviewDialog title="档案信息" :data="row">
            <el-button type="text" icon="el-icon-view" />
          </PreviewDialog>
          <PreviewDialog title="派发订单" :data="row">
            <svg-icon class="send-order" icon-class="send-order" @click="handleSendOrder(row)" />
          </PreviewDialog>
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="text" icon="el-icon-delete" style="color:#f56c6c" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
    
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 600px; margin-left:50px;">
        <el-form-item label="故障设备" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择">
            <el-option v-for="item in deviceTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="设备位置" prop="type">
          <el-select style="width: 100px;float:left;margin-right:4px;" label-width="50px" v-model="temp.blockType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in blockNumOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
          <el-select style="width: 100px;float:left;margin-right:4px;" v-model="temp.floorType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in floorNumOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
          <el-select style="width: 100px;float:left;margin-right:4px;" v-model="temp.roomType" class="filter-item" placeholder="请选择">
            <el-option v-for="item in roomAddrOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="紧急性">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="故障描述">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="派发工单">
      <el-form ref="sendOrderForm" :rules="rules" :model="sendTemp" label-position="left" label-width="100px" style="width: 600px; margin-left:50px;">
        <el-form-item label="设备">
          <el-input v-model="sendTemp.device" :autosize="{ minRows: 2, maxRows: 4}" type="text" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="故障描述">
          <el-input v-model="sendTemp.des" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="派单时间" prop="timestamp">
          <el-date-picker v-model="sendTemp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="受理人" prop="type">
          <el-select style="width: 100px;float:left;margin-right:4px;" label-width="50px" v-model="sendTemp.receiver" class="filter-item" placeholder="请选择">
            <el-option v-for="item in receiverOptions" :key="item.key" :label="item.username" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPvVisible = false">取消</el-button>
        <el-button type="primary" @click="sendOrder()">确定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
	import { OrderList } from '@/api/order'
	import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'

  const deviceTypeOptions = [
    { key: 'computer', display_name: '电脑' },
    { key: 'internet', display_name: '网络' },
    { key: 'his', display_name: 'HIS系统' },
    { key: 'printer', display_name: '打印机' },
    { key: 'mobile', display_name: '电话' },
    { key: 'others', display_name: '其他' },
  ]
  const blockNumOptions = [
    { key: 'block1', display_name: '一号楼' },
    { key: 'block2', display_name: '二号楼' }
  ]

  const floorNumOptions = [
    { key: 'floor1', display_name: '一楼' },
    { key: 'floor2', display_name: '二楼' },
    { key: 'floor3', display_name: '三楼' },
    { key: 'floor4', display_name: '四楼' },
    { key: 'floor5', display_name: '五楼' },
    { key: 'floor6', display_name: '六楼' },
    { key: 'floor7', display_name: '七楼' },
  ]

  const roomAddrOptions = [
    { key: 'addr1', display_name: '办公室' },
    { key: 'addr2', display_name: '护士站' },
    { key: 'addr3', display_name: '门诊' },
    { key: 'addr4', display_name: '病房' }
  ]

  const receiverOptions = [
    { key: 'user1', username: '张三' },
    { key: 'user2', username: '李四' },
    { key: 'user3', username: '王麻子' }
  ]

  // arr to obj, such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = deviceTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})


	export default{
		name: 'orderlist',
		components: {Pagination},
    directives: { waves },
		data() {
			return {
				listQuery:{
					page: 1,
					pageSize: 10
				},
				list: null,
				listLoading: true,
				total: 0,
        deviceTypeOptions,
        blockNumOptions,
        floorNumOptions,
        roomAddrOptions,
        receiverOptions,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          blockType: '',
          floorType: '',
          roomType: '',
          status: 'published'
        },
        sendTemp: {
          id: undefined,
          device: '',
          des: '',
          timestamp: new Date(),
          receiver: ''
        },
        textMap: {
          update: '编辑工单',
          create: '添加工单'
        },
        statusOptions: ['published', 'draft', 'deleted'],
        dialogFormVisible: false,
        dialogStatus: '',
        dialogPvVisible: false,
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        dialogPvVisible: false,
			}
		},
		created() {
			this.parseQuery()
		},
		mounted() {
			this.getData()
		},
		methods: {
			handleFilter() {

			},
			getData() {
				const that = this
				const listQuery = this.listQuery
				OrderList(listQuery).then(response => {
					console.log(response)
					that.list = response.data.items
					that.listLoading = false
					that.total = response.data.total
				})
			},
			parseQuery() {
      // 收集查询条件
        const query = Object.assign({}, this.$route.query)
        let listQuery = {
          page: 1,
          pageSize: 10,
          sort: 'id'
        }
        if (query) {
          query.page && (query.page = Number(query.page))
          query.pageSize && (query.pageSize = Number(query.pageSize))
          listQuery = {
            ...listQuery,
            ...query
          }
        }
        this.listQuery = listQuery
    	},
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
			sortChange() {

			},
			handleSearch() {

			},
			handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
			handleUpdate() {

			},
			handleDelete() {

			},
      createData() {
        console.log(this.$refs['dataForm'])
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建工单成功',
          type: 'success',
          duration: 2000
        })
        /*this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建工单成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })*/
      },
      handleSendOrder(row) {
        console.log(row)
        this.dialogPvVisible = true
        this.sendTemp.device = row.device
        this.sendTemp.des = row.des
      },
      sendOrder() {
        console.log(this.$refs['sendOrderForm'])
        this.dialogPvVisible = false
        this.$notify({
          title: '成功',
          message: '工单派发成功',
          type: 'success',
          duration: 2000
        })
      },
			refresh() {
        this.getData()
			}
		}
	}
</script>

<style scoped>
.guid-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.send-order{
  cursor: pointer;
}
</style>