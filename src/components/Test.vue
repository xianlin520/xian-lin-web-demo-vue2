<template>
  <div id="sendChannelNews">

  </div>
</template>

<script>
export default {
  name: 'sendChannelNews',
  data () {
    return {}
  },
  methods: {
    pullChannelList () {
      this.$axios.get('/api/v3/guild/list').then(res => {
        console.log(res.data)
      })
    }
  },
  mounted () {
    this.pullChannelList()
    document.title = 'sendChannelNews'
  }
}
</script>

<style lang="less" scoped>
#sendChannelNews {

}

</style>
