<template>
  	<div class="app-container">
	    <div class="filter-container">
	      <el-input
        v-model="listQuery.realname"
        clearable
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
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
      <el-table-column label="账号" width="150" align="center" prop="username">
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center" prop="realname">
      </el-table-column>
      <el-table-column label="电话" width="150" align="center" prop="mobile">
      </el-table-column>
      <el-table-column label="权限" width="150" align="center" prop="roles">
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="{ row }">
          <PreviewDialog title="档案信息" :data="row">
            <el-button type="text" icon="el-icon-view" />
          </PreviewDialog>
          <PreviewDialog title="派发订单" :data="row">
            <svg-icon class="send-order" icon-class="send-order" @click="handleSendOrder(row)" />
          </PreviewDialog>
          <PreviewDialog title="完结订单" :data="row">
            <svg-icon class="done-order" icon-class="done" @click="handleDoneOrder(row)" />
          </PreviewDialog>
          <el-button type="text" icon="el-icon-edit" @click="handleUpdate(row)" />
          <el-button type="text" icon="el-icon-delete" style="color:#f56c6c" @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 10"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="refresh"
    />
    </pagination>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 250px; margin-left:20px;">
        <el-form-item label="账号" prop="username">
          <el-input v-model="temp.username" class="filter-item" type="text" placeholder="账号" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="temp.realname" type="text" placeholder="真实姓名" />
        </el-form-item>
        <el-form-item label="电话号码" prop="mobile">
          <el-input v-model="temp.mobile" required type="text" placeholder="电话号码" />
        </el-form-item>
        <el-form-item label="权限" prop="roles">
          <el-input v-model="temp.roles" type="text" placeholder="权限" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
	import { CompanyMemberList } from '@/api/companymember'
	import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import { createUser } from '@/api/user'

	export default{
		name: 'companymemberlist',
		components: {Pagination},
    directives: { waves },
		data() {
			return {
				listQuery:{
					page: 1,
					limit: 10
				},
				list: null,
				listLoading: true,
				total: 0,
        dialogFormVisible: false,
        temp: {
          username: '',
          realname: '',
          mobile: '',
          roles: ''
        },
        dialogStatus: 'create',
        rules: {
          username: [{ required: true, message: 'username is required', trigger: 'change' }],
          realname: [{ required: true, message: 'realname is required', trigger: 'change' }],
          mobile: [{ required: true, message: 'mobile is required', trigger: 'blur' }],
          roles: [{ required: true, message: 'roles is required', trigger: 'blur' }]
        },
			}
		},
		created() {
			this.parseQuery()
		},
		mounted() {
      console.log('...get state info...',  this.$store.state.user)
			this.getData()
		},
		methods: {
			handleFilter() {

			},
			getData() {
				const that = this
				const listQuery = this.listQuery
				CompanyMemberList(listQuery).then(response => {
					console.log(response)
					that.list = response.data
					that.listLoading = false
					that.total = response.total
				})
			},
			parseQuery() {
      // 收集查询条件
        const query = Object.assign({}, this.$route.query)
        let listQuery = {
          page: 1,
          limit: 10
        }
        if (query) {
          query.page && (query.page = Number(query.page))
          query.limit && (query.limit = Number(query.limit))
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
          username: '',
          realname: '',
          timestamp: new Date(),
          mobile: '',
          status: 'published',
        }
      },
			sortChange() {

			},
			handleSearch() {
        console.log(this.listQuery)
        this.getData()
			},
			handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
			handleUpdate(row) {
        console.log(row)
        this.temp = row
        Object.assign(this.temp, row)
        console.log(this.temp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
			},
			handleDelete() {

			},
      createData() {
        console.log(this.$refs['dataForm'])
        console.log(this.temp)
        this.dialogFormVisible = false
        this.$refs['dataForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.temp.createTime = new Date()
            createUser(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建用户成功',
                type: 'success',
                duration: 2000
              })
              this.refresh()
            })
          }
        })
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
          duration: 3000
        })
        this.refresh()
      },
      handleDoneOrder() {
        this.$notify({
          title: "成功",
          message: '完结订单成功',
          type: 'success',
          duration: 3000
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
.done-order{
  cursor: pointer;
}
</style>