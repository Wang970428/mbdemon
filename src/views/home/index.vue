<template>
  <div class="container">
    <van-nav-bar title="首页" fixed />
    <!-- tab切换 -->
    <van-tabs v-model="active" class="my-channl">
      <van-tab :title="item.name" v-for="(item) in channelID" :key="item.id">
        <!-- 列表 -->
        <van-pull-refresh v-model="item.downPullLoading" @refresh="onRefresh">
          <van-list v-model="item.upPullLoading" :finished="item.upPullFinished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channels.js'
import { getArticles } from '@/api/article.js'
import store from '@/store.js'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      // 下拉刷新
      count: 0,
      isLoading: false,
      // 频道
      channelID: []
    }
  },
  computed: {
    activeChannelId () {
      return this.channelID[this.active]
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { user } = store.state
      const lsChannels = JSON.parse(window.localStorage.getItem('channels'))
      if (!user && lsChannels) {
        this.channelID = lsChannels
      }
      if ((!user && !lsChannels) || user) {
        const res = await getChannels()
        // 设计符合要求的channels数据结构
        res.channels.forEach(item => {
          item.articles = [] // 当前频道的文章列表数据
          item.downPullLoading = false // 当前频道下拉状态
          item.upPullLoading = false // 当前频道上拉加载更多
          item.upPullFinished = false // 当前频道加载完毕
        })
        this.channelID = res.channels
      }
      // if (!user) {
      //   const lsChannels = JSON.parse(window.localStorage.getItem('channels'))
      //   if (lsChannels) {
      //     this.channelID = lsChannels
      //   } else {
      //     const res = await getChannels()
      //     this.channelID = res.channels
      //   }
      // } else {
      //   const res = await getChannels()
      //   this.channelID = res.channels
      // }
    },
    async loadArticles () {
      const { id: channel_id } = this.activeChannelId
      const res = await getArticles({
        channel_id,
        timestamp: Date.now(),
        with_top: 1
      })
      return res
    },
    async onLoad () {
      const data = await this.loadArticles()
      console.log(data)

      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
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
.my-channl /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1000;
  width: 100%;
}

.my-channl /deep/ .van-tabs__content {
  margin-top: 180px;
}
.my-channl {
  margin-bottom: 100px;
}
</style>
