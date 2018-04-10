<template>
  <page>
    <page-content>
      <x-header @on-click-back="goBack" :left-options="{showBack: true, preventGoBack: true}">
        新建新闻
      </x-header>
      <div class="create-contaienr">
        <group>
          <x-input title="新闻标题" v-model="news.title" placeholder="News Title" :show-clear="false"></x-input>
        </group>
        <group>
          <x-input title="新闻作者" v-model="news.author" placeholder="News Author" :show-clear="false"></x-input>
        </group>
        <group>
          <selector v-model="news.channel" placeholder="请选择新闻频道" :options="category" title="频道分类"></selector>
        </group>
        </group>
        <group>
          <x-textarea :max="200" v-model="news.content" name="description" placeholder="新闻内容"></x-textarea>
        </group>
        <group>
          <x-button text="保存新闻" @click.native="submitNews"></x-button>
        </group>
      </div>
    </page-content>
  </page>
</template>

<script>
import { XInput, XTextarea, XButton, XHeader, Group, Cell, Toast, Selector } from 'vux'
import Solo from 'solojs'
import * as localstore from '../localstore'

export default {
  extends: Solo.Page,
  components: {
    Group,
    Cell,
    Toast,
    XInput,
    XHeader,
    XButton,
    XTextarea,
    Selector
  },
  data() {
    return {
      news: {
        title: '',
        author: '',
        channel: '',
        content: ''
      },
      category: [
        {
          key: 'index',
          value: '首页'
        },
        {
          key: 'entertainment',
          value: '娱乐'
        },
        {
          key: 'sports',
          value: '体育'
        },
        {
          key: 'internet',
          value: '互联网'
        }
      ],
      showToast: false
    }
  },
  methods: {
    goBack() {
      console.log('vback')
      this.$router.back()
    },

    submitNews() {
      console.log('submit news')
      const viewData = {
        data: this.news,
        from: 'create'
      }
      this.$router.back('home', { viewData })
    }
  }
}
</script>

<style lang="less">
  .create-contaienr {
    padding: 0 10px;
  }

  .create-submit {
    cursor: pointer;
  }
</style>
