<template>
	<div class="app-container">
    <div class="filter-container">
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
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >
        导入
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
      <el-table-column label="姓名" width="150" align="center" prop="name">
      </el-table-column>
      <el-table-column label="年龄" width="150" align="center" prop="age">
      </el-table-column>
      <el-table-column label="性别" prop="sex" width="150" align="center" />
      <el-table-column label="身份证号码" prop="IDnum" width="200" align="center" />
      <el-table-column label="电话号码" prop="mobile" width="150" align="center" />
      <el-table-column label="家庭地址" prop="address" width="200" align="center" />
      <el-table-column label="问诊科室" prop="inquiryDepartment" width="150" align="center" />
      <el-table-column label="问诊项目" prop="inquiryItems" width="150" align="center" />
      <el-table-column label="问诊医生" prop="inquiryDoctor" width="150" align="center" />
      <el-table-column label="来院渠道" prop="channel" width="150" align="center" />
      <el-table-column label="签约状态" prop="deal" :formatter="isDeal" width="150" align="center" />
      <el-table-column label="操作" align="center" width="120" fixed="right">
        <template slot-scope="{ row }">
          <PreviewDialog title="档案信息" :data="row">
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
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
  </div>
</template>

<script>
	import Pagination from '@/components/Pagination'
  	import { SignedList, deleteHealth } from '@/api/health'
  	import waves from '@/directive/waves'

	export default {
		name: 'SignedList',
		components: { Pagination },
		data() {
	      	return {
		      	listQuery: {
		            page: 1,
		            pageSize: 10
          		},
	      		list: null,
          		listLoading: true,
          		total: 0
	      	}
	    },
	    created() {
	    	this.parseQuery()
	    },
	    mounted() {
	    	this.getList()
	    },
	    methods: {
	    	getList() {
          		const that = this
          		const listQuery = this.listQuery
          		SignedList(listQuery).then(response => {
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
	    	refresh() {
	    		console.log(8888)
	    		console.log(this.listQuery)
        		this.getList()
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
	    		console.log(this.listQuery.username)
	    	},
	        handleCreate() {
	          	this.$router.push('/health/create')
	        },
	        handleSearch() {
	        	console.log(this.listQuery)
	        },
	        isDeal(data) {
	        	return data.deal ? '已签约' : '未签约'
	        }
	    }
	}
</script>