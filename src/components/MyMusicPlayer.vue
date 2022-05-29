<template>
  <div id="MusicPlayer">
    <el-row>
      <div class="my-header">
        <el-button class="my-button" type="primary" @click="toHome">前往个人主页</el-button>
      </div>
      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple-light">
          <el-container>
            <!--音乐搜索框, 上部头部区域-->
            <el-header>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <el-col :span="12">
                    <div class="grid-content bg-purple-dark">
                    </div>
                  </el-col>
                  <!--数据输入框, 音乐名-->
                  <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                      <el-input v-model="InputName" placeholder="请输入歌名或歌手"></el-input>
                    </div>
                  </el-col>
                  <!--搜索按钮-->
                  <el-col :span="2">
                    <div class="grid-content bg-purple-dark">
                      <el-button circle icon="el-icon-search" @click="SearchSong"></el-button>
                    </div>
                  </el-col>
                </div>
              </el-col>
            </el-header>
            <el-container>
              <!--歌曲展示区域-->
              <el-aside width="350px">
                <el-row>
                  <el-col :span="24">
                    <el-card :body-style="{ padding: '0px' }">
                      <img :src=SongData.Cover class="image">
                      <div style="padding: 20px;">
                        <span>{{ SongData.Music }}</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ SongData.Singer }}</time>
                          <!--                                                <el-button type="text" class="button">网易云链接</el-button>-->
                          <el-link :href="SongData.Music_Url" class="button" type="success">
                            网易云链接
                          </el-link>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
                / {{ showText }} /
              </el-aside>
              <!--歌曲选择列表-->
              <el-main>
                <template>
                  <el-table
                    :data="SongDataList"
                    style="width: 100%">
                    <el-table-column
                      label="歌名"
                      prop="song"
                      width="280">
                    </el-table-column>
                    <el-table-column
                      label="歌手"
                      prop="singers"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      align="right">
                      <template slot-scope="scope">
                        <el-button
                          icon="el-icon-video-play"
                          size="mini"
                          type="primary"
                          @click="player(scope.$index)">播放
                        </el-button>
                        <el-button circle icon="el-icon-star-off" type="warning"
                                   @click="collectSong(scope.$index)"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-main>
            </el-container>
            <el-footer>
              <audio :src="SongData.Url" autoplay="autoplay" class="SongPlayer" controls="controls"
                     style="width: 100%; height: 100%;"></audio>
            </el-footer>
          </el-container>
        </div>
      </el-col>

      <el-col :span="5">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  mounted () {
    document.title = '歌曲播放器 | XianLin'
    this.getVideo()
    this.obtainText()
  },
  methods: {
    toHome () {
      this.$router.push('/userhome')
    },
    getVideo () {
      document.querySelector('.SongPlayer').volume = 0.1
    },
    SearchSong () {
      const _this = this
      this.$axios.get('http://ovooa.com/API/wydg/api.php?sc=10&msg=' + this.InputName)
        .then(response => {
          const Songs = response.data.data
          _this.SongDataList = Songs
          this.$message({
            message: '搜索成功',
            type: 'success'
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    collectSong (songIndex) {
      let _this = this
      let id = 'msg=' + this.InputName + '&n=' + (songIndex + 1)
      let UserData = localStorage.getItem('UserData')
      UserData = JSON.parse(UserData)
      // console.log(userQQ);
      let userQQ = UserData.userQQ
      this.$axios.put('/musics', {
        'userQQ': userQQ,
        'musicId': id
      }).then(response => {
        // console.log(response.data);
        if (response.data.code === 200) {
          _this.$message({
            message: '收藏成功',
            type: 'success'
          })
        } else {
          _this.$message({
            message: '已经收藏过了',
            type: 'warning'
          })
        }
      })
    },
    player (song) {
      const _this = this
      this.$axios.get('http://ovooa.com/API/wydg/api.php?msg=' + this.InputName + '&n=' + (song + 1))
        .then(response => {
          _this.SongData = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    obtainText () {
      const _this = this
      this.$axios.get('http://ovooa.com/API/wryl/api.php')
        .then(response => {
          // console.log(response.data);
          _this.showText = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  data () {
    return {
      InputName: '',
      SongData: {
        'Id': 167882,
        'Music': '清明雨上',
        'Cover': 'http://p3.music.126.net/KyBR4ZDYFlzQJE_uyvfjpA==/109951166118671647.jpg',
        'Singer_Array': [
          '许嵩'
        ],
        'Singer': '许嵩',
        // 'Url': 'http://music.163.com/song/media/outer/url?id=167882',
        'Music_Url': 'https://music.163.com/#/song?id=167882'

      },
      SongDataList: [],
      showText: '',
    }
  }
}
</script>

<style lang="less" scoped>
#MusicPlayer {
  // 设置背景图片
  //background: url("https://s2.loli.net/2022/05/25/TR5PyM9BuqkrdiV.png");
  // 设置背景颜色 上下渐变
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(76, 150, 186, 0.8));

  width: 100%;
  height: 100%;
  // 设置背景图片的位置为固定
  position: fixed;
  // 根据原始比例进行裁切
  background-size: cover;
  // 最小宽度
  min-width: 1800px;
  justify-content: center;
}

.my-header {
  height: 150px;
  // 右对齐
  text-align: right;

  .my-button {
    // 上方空出
    margin-top: 30px;
    // 右空出
    margin-right: 200px;
  }
}

.el-header {
  background-color: rgba(255, 192, 203, 1);
  color: #333;
  text-align: center;
  line-height: 60px;

}

.el-aside {
  background-color: rgba(255, 255, 255, 1);
  /*background-color: #D3DCE6;*/
  color: #333;
  text-align: left;
  height: 500px;
  /*line-height: 200px;*/
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: left;
  height: 500px;
}

.el-footer {
  background-color: #F1F3F4;
  /*color: #333;*/
  text-align: center;
  line-height: 60px;
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


.el-col {
  justify-content: center;
  border-radius: 4px;
}

.bg-purple-dark {
  height: 200px;
}

.bg-purple-light {
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
  display: flex;
  border-radius: 50px;
  align-items: center;
  top: 30%;
  backdrop-filter: blur(45px);

}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}


</style>
