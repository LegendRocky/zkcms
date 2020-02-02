<template>
  <div class="app-container">
    <div class="filter-container">
        <el-input
        v-model="listQuery.name"
        clearable
        placeholder="权限名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="listQuery.owner"
        clearable
        placeholder="所属分组"
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
        @click="handleAddRole"
      >
        新增
      </el-button>
    </div>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限名" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属分组" width="150">
        <template slot-scope="scope">
          {{ scope.row.owner }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限列表" width="800">
        <template slot-scope="scope">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="scope.row.routes"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
            default-expand-all
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑权限':'新增权限'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="权限名">
          <el-input v-model="role.name" placeholder="权限名" />
        </el-form-item>
        <el-form-item label="所属分组">
          <el-input
            v-model="role.owner"
            placeholder="所属分组"
          />
        </el-form-item>
        <el-form-item label="权限列表">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
import { generateRoutes } from '@/utils/route'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import waves from '@/directive/waves' // waves directive

import Pagination from '@/components/Pagination'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  name: 'role',
  components: {Pagination},
  directives: { waves },
  data() {
    return {
      listQuery: {},
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      total: 0
    }
  },
  computed: {
    routesData() {
      console.log('...所有路由...', this.routes)
      return this.routes
    }
  },
  mounted() {
    this.getData()
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    //this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = generateRoutes(res.data)

    },
    getData() {
      getRoles(this.listQuery).then(response => {
        this.rolesList = response.data
        response.data.forEach(item => {
          item["routes"] = generateRoutes(item.routes)
        })
        this.total = response.total
      })
    },
    handleFilter() {

    },
    handleSearch() {
      console.log(this.listQuery)
      this.getData()
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = false
      this.role = deepClone(scope.row)
      console.log(scope.row)
      this.$nextTick(() => {
        const routes = generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      console.log("this.role.key:::", this.role.key)
      console.log("this.role:::", this.role)
      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        console.log(data)
        this.role.key = data.key
        this.rolesList.push(this.role)
        console.log('...create roles...', this.rolesList)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    
    refresh() {
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
