<template>
  <div id="MyLogin">
    <el-container>
      <el-header></el-header>
    </el-container>
    <el-container>
      <el-container>
        <el-aside width="65%">
          <img :src="my_img">
        </el-aside>
        <el-main>
          <el-header><h1>登录</h1></el-header>
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="21">
                <div class="grid-content bg-purple-dark">
                  <el-form label="QQ">
                    <!--                    <el-input v-model="form.QQ" placeholder="请输入内容"></el-input>-->
                    <el-form ref="form" :model="form" class="demo-ruleForm" label-width="100px">
                      <el-form-item
                        :rules="[{ required: true, message: 'QQ不能为空'},{ type: 'number', message: 'QQ必须为数字值'}]"
                        label="QQ"
                        prop="userQQ">
                        <el-input v-model.number="form.userQQ" autocomplete="off" placeholder="请输入QQ号"
                                  type="userQQ"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-form>
                  <el-form label="密码">
                    <el-form ref="form" :model="form" class="demo-ruleForm" label-width="100px">
                      <el-form-item
                        :rules="[{ required: true, message: '密码不能为空'}]"
                        label="密码"
                        prop="userPassword">
                        <el-input v-model="form.userPassword" autocomplete="off" placeholder="请输入密码(并非QQ密码)"
                                  show-password type="userPassword"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-form>
                </div>
              </el-col>
            </el-row>
            <el-form-item>
              <template>
                <!--                <el-checkbox v-model="loginType">记住我,下次免登陆</el-checkbox>-->
              </template>
            </el-form-item>
            <el-form-item>
              <el-row>
                <!--                            <el-button type="primary" @click="onSubmit">登录</el-button>-->
                <el-row>
                  <el-button plain type="primary" @click="onSubmit">登录</el-button>
                </el-row>
                <div>
                  <el-header></el-header>
                  <el-link @click="toRegister">没有账号?点我注册</el-link>
                  <!--                  <router-link to="/register">没有账号?点我注册</router-link>-->
                </div>
              </el-row>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
      <el-aside width="10%"></el-aside>
    </el-container>
  </div>
</template>

<script>
import images from './Imags.js'

export default {
  name: 'MyLogin',
  props: {},
  data () {
    return {
      my_img: 'https://xianlin-xyz-1306418297.cos.ap-beijing.myqcloud.com/images/LoginMini.png',
      form: {
        userQQ: '',
        userPassword: ''
      },
      loginType: false,
    }
  },
  methods: {
    toRegister () {
      this.$router.push('/register')
    },
    onSubmit () {
      let _this = this
      this.$axios.post('/users', this.form).then(function (response) {
        if (response.data.code === 200) {
          _this.$message.success('登录成功, 正在跳转...')
          // console.log(response.data.data)
          // 将token写入本地储存
          localStorage.setItem('token', response.data.data)
          // 将用户信息写入本地储存
          _this.pushUserData()
          setTimeout(function () {
            location.href = '/' // 跳转到首页
          }, 800)
        } else {
          _this.$message.error('登录失败')
        }
      })
    },
    loginRemind () {
      const h = this.$createElement
      this.$notify({
        title: '您尚未登录, 请先登录',
        message: h('i', { style: 'color: teal' }, '登录后即可正常访问其他页面, 如果您还没有账号, 请先注册; 如忘记密码, 请联系管理员QQ2683971783'),
      })
    },
    pushUserData () {
      this.$axios.get('/users/' + this.form.userQQ).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('UserData', JSON.stringify(res.data.data))
        }
      })
    }
  },
  mounted () {
    document.title = 'XianLin | 登录'
    this.loginRemind()
    // 登录时, 将背景图片写入本地储存
    localStorage.setItem('UserHomeImages', JSON.stringify(images.UserHome))
    // localStorage.setItem('RegisterImages', JSON.stringify(images.Register))
  }
}
</script>

<style lang="less" scoped>
#MyLogin {
  // 设置背景图片
  //background: url("https://s2.loli.net/2022/05/25/eqgS3JWUHd8E7Yf.png");
  // 设置背景颜色
  background-color: #388885;
  width: 100%;
  height: 100%;
  // 设置背景图片的位置为固定
  position: fixed;
  // 根据原始比例进行裁切
  background-size: cover;
  min-width: 1800px;
  justify-content: center;
  //overflow: auto;

}

.el-header, .el-footer {
  text-align: center;
}

.el-aside {
  text-align: center;
  line-height: 200px;
}

.el-main {
  // 玻璃效果
  background-color: rgba(255, 255, 255, 0.5);
  // 从上往下渐变
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(76, 150, 186, 0.8));
  // 陶泥态效果
  box-shadow: 12px 12px 12px rgba(76, 134, 186, 0.5),
  inset 10px 10px 11px rgba(250, 252, 255, 0.48),
    inset -10px -10px 15px rgba(46, 129, 255, 0.22);
  // 设置为相对位置
  position: relative;
  height: 500px;
  //box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
  // 圆角
  border-radius: 50px;
  // 设置上宽
  top: 15%;
}

.el-button {
  box-shadow: 2px 3px 2px rgba(155, 196, 255, 0.42),
  inset 10px 10px 11px rgba(250, 252, 255, 0.48),
    inset -10px -10px 10px rgba(46, 129, 255, 0.22);
  // 左右圆角
  //border-radius: 50px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
