<template>
  <div class="app-container">
    <el-tree
	    ref="tree"
	    :check-strictly="checkStrictly"
	    :data="routes"
	    :props="defaultProps"
	    show-checkbox
	    node-key="path"
	    class="permission-tree"
	    default-expand-all
	  />
  </div>
</template>

<script>
import { getRoutesByRole } from '@/api/role'

import { generateRoutes, generateTree } from '@/utils/route'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          realname: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  },
  data() {
  	return {
  		checkStrictly: false,
  		routes: [],
  		defaultProps: {
  			children: 'children',
  			label: 'title'
  		}
  	}
  },
  mounted() {
  
  },
  created() {
  	// Mock: get all routes and roles list from server
  	this.getRoutes()
  },
  methods: {
  	async getRoutes() {
  		console.log('getRoutes start.......')
  		const roles = this.$store.state.user.roles
  		console.log(this.$store.state.user.roles)
  	  	getRoutesByRole({roles}).then(res => {
  	  		this.routes = generateRoutes(res.data)
  	  	})
  	}
  }
}
</script>

<style>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
