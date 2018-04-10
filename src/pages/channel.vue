<template>
  <page>
    <page-content>
      <div>
        <x-header :left-options="{showBack: false}">Channel</x-header>
        <ul class="channel-list">
          <template v-if="channels && channels.length">
            <template v-for="item in channels">
              <li @click="toHome(item)">{{ item.name }}</li>
            </template>
          </template>
          <template v-else>
            <p align="center">No channels yet</p>
          </template>
        </ul>
      </div>
    </page-content>
    </page>
</template>

<script>
  import { XButton, XHeader, Group, Cell } from 'vux'
  import Solo from 'solojs'

  export default {
    extends: Solo.Page,
    components: {
      Group,
      Cell,
      XHeader,
      XButton
    },
    data() {
      return {
        channels: [
          {
            name: 'index'
          },
          {
            name: 'entertainment'
          },
          {
            name: 'sports'
          },
          {
            name: 'internet'
          }
        ]
      }
    },
    methods: {
      toHome(item) {
        this.$router.load('home', { viewData: item })
      }
    }
  }
</script>

<style lang="less">
  .channel-list {
    li {
      display: block;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      font-size: 20px;
    }
  }
</style>
