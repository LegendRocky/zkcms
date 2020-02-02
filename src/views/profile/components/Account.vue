<template>
  <el-form :model="password">
    <el-form-item label="输入密码">
      <el-input v-model="password.password" />
    </el-form-item>
    <el-form-item label="再次输入">
      <el-input v-model="password.repeatPassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      password: {
        password: '',
        repeatPassword: ''
      }
    }
  },
  created() {
    this.user = this.$store.state.user
    console.log(123)
    console.log(this.user)
  },
  methods: {
    submit() {
      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
