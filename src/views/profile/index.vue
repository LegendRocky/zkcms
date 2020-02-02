<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="我的权限" name="rolelist">
                <role-list :user.async="user" />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="重置密码" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import RoleList from './components/RoleList'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, RoleList, Activity, Timeline, Account },
  data() {
    return {
      user: {
      },
      activeTab: 'rolelist'
    }
  },
  computed: {
    ...mapGetters([
      'realname',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      console.log(this.$store.state.user)
      const userState = this.$store.state.user
      this.userRoles = userState.roles
      this.user = {
        realname: userState.realname,
        roles: userState.roles,
        //avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        avatar: userState.avatar
      }
    }
  }
}
</script>
