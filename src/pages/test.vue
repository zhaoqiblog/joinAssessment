<template>
  <page>
    <page-header class="wrap-head" title="测试" :showBack="true" slot="header" @click.native="toBack">

    </page-header>
    <page-footer></page-footer>
      <page-content>
      <h2 class="title">i am title</h2>
      <p>{{ content }}</p>
    </page-content>
  </page>
</template>

<script>
  import Solo from 'solojs'

  export default {
    extends: Solo.Page,
    data() {
      return {
        content: 'i am content'
      }
    },
    created () {
    	this.getEvaluationDetail()
    },
    methods: {
    	getEvaluationDetail () {
    		let params = {
	          "evaluationId": '15cf722c674cf01096e49574a189a391'
	        };
    		this.$http.post('/kkYhUnproforMain.do?method=getEvaluationRecordDetail',params).then(res => {
    			console.log(res);
    		});
    	},
    	toBack () {
    		this.$router.load('home')
    	}
    }
  }
</script>

<!-- 页面 css, 必选 -->
<style lang="less">
  .title {
    color: red;
  }
</style>