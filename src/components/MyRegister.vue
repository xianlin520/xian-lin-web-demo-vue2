<template>
  <div id="MyRegister">
    <el-container>
      <el-header></el-header>
    </el-container>
    <el-container>
      <el-container>
        <el-aside width="25%"></el-aside>
        <el-main>
          <el-header><h1>注册</h1></el-header>
          <el-form ref="userForm" :model="userForm" label-width="80px">
            <el-row>
              <el-col :span="21">
                <div class="grid-content bg-purple-dark">
                  <el-form label="userQQ">
                    <!--                    <el-input v-model="form.QQ" placeholder="请输入内容"></el-input>-->
                    <el-form ref="userForm" :model="userForm" class="demo-ruleForm" label-width="100px">
                      <el-form-item
                        :rules="[{ required: true, message: 'QQ不能为空'},{ type: 'number', message: 'QQ必须为数字值'}]"
                        label="QQ"
                        prop="userQQ">
                        <el-input v-model.number="userForm.userQQ" autocomplete="off" placeholder="请输入QQ号"
                                  type="userQQ" @blur="obtain"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-form>
                  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px"
                           status-icon>
                    <el-form-item label="密码" prop="pass">
                      <el-input v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码(并非QQ密码)"
                                type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"
                                type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
                      <div>
                        <el-header></el-header>
                        <el-link @click="toLogin">已有账号?点我登录</el-link>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </el-container>
      <el-aside width="60%"></el-aside>
    </el-container>
    <el-dialog
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      title="提示"
      width="30%"
    >
        <span>
            <el-col :span="21">
                <div class="grid-content bg-purple-dark">
                    <el-form label="name">
                        <el-form ref="userForm" :model="userForm" class="demo-ruleForm" label-width="100px">
                            <el-form-item
                              label="QQ:">
                                {{ userForm.userQQ }}
                            </el-form-item>
                        </el-form>
                      <!--                    <el-input v-model="form.QQ" placeholder="请输入内容"></el-input>-->
                        <el-form ref="userForm" :model="userForm" class="demo-ruleForm" label-width="100px">
                            <el-form-item
                              :rules="[{ required: true, message: '昵称不能为空'}]"
                              label="昵称"
                              prop="userName">
                                <el-input v-model.number="userForm.userName" autocomplete="off" placeholder="请输入昵称"
                                          type="userName"></el-input>
                            </el-form-item>

                        </el-form>
                        <el-form ref="userForm" :model="userForm" class="demo-ruleForm" label-width="100px">
                            <el-form-item
                              label="头像:">
                                <div class="demo-basic--circle">
                                    <div class="block"><el-avatar :size="100" :src="userForm.imgUrl"
                                                                  shape="square"></el-avatar></div>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </div>

            </el-col>
        </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="open">确 定</el-button>
        <p/>
         <el-alert
           :closable="false"
           center
           show-icon
           title="昵称要求:常用汉字,大小写字母,数字,下划线;不能有特殊字符"
           type="warning">
         </el-alert>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import images from '@/components/Imags'

export default {
  name: 'MyRegister',
  props: {},
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      checkUserName: false,
      userForm: {
        userQQ: '',
        userName: '佚名',
        userPassword: '',
        imgUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ],

      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    obtain () {
      const _this = this
      this.$axios.get('http://ovooa.com/API/qqxx/?QQ=' + this.userForm.userQQ).then(function (response) {
        if (response.data.code === 1) {
          _this.userForm.userName = response.data.data.name
          _this.userForm.imgUrl = response.data.data.imgurl
        } else {
          _this.$message.error('此QQ号不存在')
        }
      })
    },
    // 定义一个方法, 返回布尔值
    checkByUserInfo () {
      const _this = this
      // 检查UserInfo.name是否匹配中文,英文,数字,下划线,点,减号,空格,逗号
      const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9\.,\-\s]+$/
      // 检查UserInfo.name是否匹配正则表达式red
      _this.checkUserName = reg.test(_this.userForm.userName)
    },
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.check()
        } else {
          return false
        }
      })
    },
    check () {
      let _this = this
      this.$axios.get('/users/' + this.userForm.userQQ).then(function (response) {
        if (response.data.code === 200) {
          _this.$message.error({
            message: '此账号已被注册, 可直接登录; 如果忘记密码, 请联系管理员找回密码',
            duration: 5000,
            showClose: true,
          })
        } else {
          _this.dialogVisible = true
        }
      })
    },
    open () {
      // this.dialogVisible = true;
      let _this = this
      this.userForm.userPassword = this.ruleForm.checkPass
      this.checkByUserInfo()
      const loading = this.$loading({
        lock: true,
        text: '注册中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 500)
      if (_this.checkUserName) {
        setTimeout(() => {
          this.$axios.put('/users', this.userForm).then(function (response) {
            if (response.data.code === 200) {
              _this.$message({
                type: 'success',
                message: '注册成功, 会自动跳转登录页面',
              })
            } else {
              _this.$message.error('注册失败')
            }
            _this.dialogVisible = false
            setTimeout(() => {
              // 跳转到登录页面
              location.href = './login'
            }, 900)
          })
        }, 800)
      } else {
        setTimeout(() => {
          this.$message.error('昵称不能包含特殊字符')
        }, 800)
      }
    }
  },
  mounted () {
    document.title = 'XianLin | 注册'
    // 读取本地储存的images
    let image = images.Register
    // 修改MyRegister的背景图片
    let MyRegister = document.getElementById('MyRegister')
    MyRegister.style.backgroundImage = 'url(' + image + ')'
    // 登录时, 将背景图片写入本地储存
    localStorage.setItem('LoginImages', JSON.stringify(images.Login))
    localStorage.setItem('UserHomeImages', JSON.stringify(images.UserHome))
    // localStorage.setItem('RegisterImages', JSON.stringify(images.Register))
  }
}
</script>

<style lang="less" scoped>
#MyRegister {
  // 设置背景图片
  //background: url("https://s2.loli.net/2022/05/25/kxf2yOeJAwsWMz9.png");
  width: 100%;
  height: 100%;
  // 设置背景图片的位置为固定
  position: fixed;
  // 根据原始比例进行裁切
  background-size: cover;
  min-width: 1800px;
  justify-content: center;
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
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(48, 154, 152, 0.8));
  // 陶泥态效果
  box-shadow: 8px 8px 13px rgba(48, 154, 152, 0.5),
  inset 10px 10px 11px rgba(250, 252, 255, 0.48),
    inset -10px -10px 15px rgba(48, 154, 152, 0.22);
  // 设置为相对位置
  position: relative;
  height: 500px;
  //box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
  // 圆角
  border-radius: 50px;
  // 设置上宽
  top: 30%;
  /*background-color: rgba(255, 255, 255, 0.4);
  position: relative;
  width: 60%;
  height: 500px;
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
  border-radius: 50px;
  align-items: center;
  top: 30%;
  backdrop-filter: blur(50px);
  padding: 20px;*/
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
