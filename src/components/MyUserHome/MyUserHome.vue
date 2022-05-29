<template>
  <div id="MyUserHome">
    <el-container>

      <el-header>
        <el-col :span="19">
          <div class="grid-content bg-purple-light">
            <el-button icon="el-icon-search" type="primary" @click="toMusic">前往搜索页</el-button>
          </div>
        </el-col>
        <!--个人信息展示-->
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <!--使用编辑图标, 不使用下划线, 点击文字触发click事件-->
            <el-link :underline="false" icon="el-icon-edit" title="修改个人信息" @click="edit">{{ UserData.userName }}
              ({{ UserData.userQQ }})
            </el-link>
          </div>
        </el-col>
      </el-header>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="height: 50px"></div>
      </el-col>
      <el-container>
        <el-aside width="500px">
          <el-table
            :data="MusicDataList"
            style="width: 500px">
            <el-table-column
              label="歌名"
              prop="Music"
              width="200">
            </el-table-column>
            <el-table-column
              label="歌手"
              prop="Singer"
              width="100">
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
                <el-button circle icon="el-icon-star-off" title="取消收藏" type="warning"
                           @click="cancelFavorites(scope.$index)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="musicPlayer">
            <audio :src="playerMusicUrl" autoplay="autoplay" class="SongPlayer" controls="controls"></audio>
          </div>
        </el-aside>
        <el-col :span="1">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
        <el-main>


        </el-main>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark"></div>
        </el-col>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MyUserHome',
  props: {},
  data () {
    return {
      UserData: {
        userName: '',
        userQQ: '2683971783',
      },
      playerMusicUrl: '',
      // 歌曲ID列表
      MusicIdList: [],
      // 歌曲列表
      MusicDataList: [],
    }
  },
  methods: {
    toMusic () {
      this.$router.push('/music')
    },
    cancelFavorites (index) {
      let musicId = this.MusicDataList[index].musicId
      // console.log(musicId)
      this.$axios.delete('/musics/' + musicId).then(res => {
        if (res.data.code === 200) {
          console.log('取消收藏成功')
        } else {
          console.log('取消收藏失败')
        }
      })

    },
    player (index) {
      // 播放歌曲
      // console.log(this.MusicDataList[index], '播放歌曲')
      // 将歌曲播放地址赋值给播放器
      this.playerMusicUrl = this.MusicDataList[index].Url

    },
    obtainMusic (musicId) {
      let _this = this
      // 获取歌曲信息
      this.$axios.get('http://ovooa.com/API/wydg/api.php?' + musicId)
        .then(response => {
          let SongData = response.data.data
          SongData.musicId = musicId
          // 将每个歌曲信息添加到歌曲列表中
          _this.MusicDataList.push(SongData)
        })
    },
    pullMusic () {
      let _this = this
      // 获取用户收藏歌曲列表ID
      this.$axios.get('/musics/' + _this.UserData.userQQ).then(function (response) {
        _this.MusicIdListS = response.data.data
        _this.MusicIdListS.forEach(function (item) {
          // 遍历歌曲ID数组, 传入方法内
          _this.obtainMusic(item.musicId)
          // 将歌曲ID存入MusicIdList
          _this.MusicIdList.push(item)
        })
      })

    },
    // 用户编辑
    edit () {

    },
  },
  mounted () {
    this.UserData = JSON.parse(localStorage.getItem('UserData'))
    document.title = this.UserData.userName + ' 的用户主页 | XianLin'
    // 拉取歌曲列表
    this.pullMusic()
    // 将播放器默认音量设为0.1
    document.querySelector('.SongPlayer').volume = 0.1
    const image = localStorage.getItem('UserHomeImages')
    let MyUserHome = document.getElementById('MyUserHome')
    MyUserHome.style.backgroundImage = 'url(' + image + ')'
  }
}
</script>

<style lang="less" scoped>
#MyUserHome {
  // 设置背景图片
  //background: url("https://s2.loli.net/2022/05/25/8tA7zTI3K9cCMWo.png");
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

.el-header, .el-footer {
  // 设置此组件相对于父组件的上边距
  padding: 10px;
  text-align: center;
  line-height: 60px;
}

.el-table {
  height: 540px;
  // 生成滚动条
  overflow-y: scroll;
}

.el-aside {
  // 设置此组件相对于父组件的左边距
  left: 50px;
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  // 设置最大高度
  height: 600px;
  box-shadow: 1px 1px 15px rgba(20, 20, 20, 0.1);
}

.SongPlayer {
  width: 500px;
}

.musicPlayer {
  // 设置容器颜色
  background-color: rgba(241, 243, 244, 1);

}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
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

.bg-purple {
  box-shadow: 12px 12px 12px rgba(76, 134, 186, 0.5),
  inset 10px 10px 11px rgba(250, 252, 255, 0.48),
    inset -10px -10px 15px rgba(46, 129, 255, 0.22);
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  //box-shadow: 1px 1px 15px rgba(20, 20, 20, 0.1);
  /*左对齐*/
}


.bg-purple-light {
  // 容器内元素向左对齐
  text-align: left;
  // 容器左边距
  margin-left: 50px;

}

.grid-content {
  border-radius: 15px;
  min-height: 30px;
}

.row-bg {
  padding: 10px 0;
}

.last-child {
  //margin-bottom: 0;
}


.bg-purple-dark {
}

</style>
