<template>
	<div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        clearable
        placeholder="用户名"
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
      <el-table-column label="用户名" width="150" align="center" prop="name">
      </el-table-column>
      <el-table-column label="年龄" width="150" align="center" prop="age">
      </el-table-column>
      <el-table-column label="性别" width="150" align="center" prop="sex">
      </el-table-column>
      <el-table-column label="电话" prop="mobile" width="150" align="center" />
      <el-table-column label="身份证号码" prop="IDnum" width="150" align="center" />
      <el-table-column label="地址" prop="address" width="150" align="center" />
      <el-table-column label="问诊科室" prop="inquiryDepartment" width="150" align="center" />
      <el-table-column label="问诊项目" prop="inquiryItems" width="150" align="center" />
      <el-table-column label="问诊项目" prop="inquiryItems" width="150" align="center" />
      <el-table-column label="问诊医生" prop="inquiryDoctor" align="center" width="150" />
      <el-table-column label="来院渠道" prop="channel" align="center" width="150" />
      <el-table-column label="操作" prop="channel" align="center" width="150" fixed="right">
        <template slot-scope="{ row }">
          <PreviewDialog title="电子书信息" :data="row">
            <el-button type="text" icon="el-icon-view" />
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
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
	import Pagination from '@/components/Pagination'
  import { listHealth, deleteHealth, searchHealth } from '@/api/health'
  import waves from '@/directive/waves'

	export default {
		name: 'HealthList',
		components: { Pagination },
		data() {
	      return {
	      	listQuery: {
            page: 5,
            limit: 10
          },
	      	list: null,
          listLoading: true,
          total: 0
	      }
	    },
	    created() {
	    },
	    mounted() {
	    	this.getList()
	    },
	    methods: {
	    	getList() {
          const that = this
          listHealth().then(response => {
            that.list = response.data
            that.listLoading = false
            that.total = response.data.length
          })
	    	},
        handleUpdate(row) {
          this.$router.push(`/book/edit/${row.fileName}`)
        },
        handleDelete(row) {
          this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteHealth(row.username).then(response => {
              this.$notify({
                title: '成功',
                message: response.msg || '删除成功',
                type: 'success',
                duration: 2000
              })
              this.handleFilter()
            })
          })
        },
	    	handleFilter() {
	    		console.log(this.listQuery.mobile)
	    	},
        handleCreate() {
          this.$router.push('/health/create')
        },
        handleSearch() {
          
          //delete this.listQuery.page
          console.log(this.listQuery)
          delete this.listQuery.page
          delete this.listQuery.limit
          searchHealth(this.listQuery).then(response => {
            console.log(response.data)
            if (response.data) {
              this.list = response.data
              this.total = response.data.length
            }else{
              this.list = []
              this.total = 0
            }
          })

        }
	    }
	}
</script>