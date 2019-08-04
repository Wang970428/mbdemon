<template>
  <div class="container">
    <van-nav-bar title="登录" />
    <form action="/">
      <van-cell-group>
        <van-field
        v-validate="'required|phone'" name="phone"
        v-model="formData.mobile"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errors.first('phone')" />
        <van-field v-model="formData.code" label="验证码" placeholder="请输入验证码" type="password" />
        <van-button type="info" block @click.prevent="lg" :loading="loginloading">登陆</van-button>
      </van-cell-group>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',
  data () {
    return {
      formData: {
        mobile: '18801185985',
        code: '246810'
      },
      loginloading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    lg () {
      this.loginloading = true
      this.$validator.validate().then(async valid => {
        if (!valid) {
          this.loginloading = false
          return
        }
        try {
          const res = await login(this.formData)
          this.setUser(res)
          this.$router.push({ path: '/' })
          this.loginloading = false
        } catch (error) {
          this.loginloading = false
          console.log(error)
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  background-color: skyblue;
  .van-nav-bar__title {
    color: #ffffff;
  }
}
</style>
