<template>
  <page>
    <page-header class="page-head-wrap" title="测评详情" :showBack="true" @on-click-back="toBack" slot="header" :left-options="{backText: ''}"></page-header>
    <page-content>
      <div class="wrapper-detail" v-show="!isEmpty">
        <div class="wrap-head">
          <div class="wrap-head-left">{{detailData.fdRatedName}} ({{detailData.fdNo}})</div>
          <div class="wrap-head-right">{{detailData.fdTeam}}</div>
        </div>
        <group class="wrap-content">
          <cell class="wrap-content-title" :title="detailData.fdName" :value="currentSta(detailData.fdStatus)"></cell>
          <div class="cell-preview-wrap">
            <ul class="cell-preview-group">
              <li>
                <div class="cell-preview-left">季度</div>
                <div class="cell-preview-right">第{{detailData.fdQuarter}}季度</div>
              </li>
              <li>
                <div class="cell-preview-left">截止测评时间</div>
                <div class="cell-preview-right">{{detailData.fdEndTime | formatDate}}</div>
              </li>
              <li>
                <div class="cell-preview-left">测评时间</div>
                <div class="cell-preview-right">{{detailData.fdFillTime | formatDate}}</div>
              </li>
            </ul>
          </div>
        </group>
        <group class="wrap-detail">
          <cell class="wrap-detail-title" title="测评明细" value=""></cell>
          <ul class="wrap-detail-group">
            <li>
              <div class="cell-detail-left">在我眼中他/她是具有主人翁精神的合伙人
                <span class="cell-detail-num">({{detailData.fdQuestion1 ? detailData.fdQuestion1:0}}分)</span>
              </div>
            </li>
            <li>
              <div class="cell-detail-left">在我眼中他/她是崇尚平等的合伙人
                <span class="cell-detail-num">({{detailData.fdQuestion2 ? detailData.fdQuestion2:0}}分)</span>
              </div>
              <div class="cell-detail-right"></div>
            </li>
            <li>
              <div class="cell-detail-left">在我眼中他/她是乐于融合共享的合伙人
                <span class="cell-detail-num">({{detailData.fdQuestion3 ? detailData.fdQuestion3:0}}分)</span>
              </div>
              <div class="cell-detail-right"></div>
            </li>
            <li>
              <div class="cell-detail-left">在我眼中他/她是廉洁自律的合伙人
                <span class="cell-detail-num">({{detailData.fdQuestion4 ? detailData.fdQuestion4:0}}分)</span>
              </div>
            </li>
            <li>
              <div class="cell-detail-left">在我眼中他/她是坦荡无私的合伙人
                <span class="cell-detail-num">({{detailData.fdQuestion5 ? detailData.fdQuestion5:0}}分)</span>
              </div>
              <div class="cell-detail-right"></div>
            </li>
            <li>
              <div class="cell-detail-left">在我眼中他/她是遵纪守法的合伙人
                <span class="cell-detail-num">({{detailData.fdQuestion6 ? detailData.fdQuestion6:0}}分)</span>
              </div>
              <div class="cell-detail-right"></div>
            </li>
            <li>
              <div class="cell-detail-left">是否愿意继续为他/她担保
                <span class="cell-detail-num">({{detailData.fdQuestion8 ? "是":"否"}})</span>
              </div>
              <div class="cell-detail-right"></div>
            </li>

            <li>
              <div class="cell-detail-left">如果你还有其他想要告诉我们的...</div>
              <div class="cell-detail-right">{{detailData.fdQuestion7 ? detailData.fdQuestion7:'无'}}</div>
            </li>
          </ul>
        </group>
      </div>
      <div class="wrapper-empty" v-show="isEmpty">
        <div class="wrapper-empty-cell">
          <img src="../assets/pic_default@2x.png" alt="">
          <div class="wrapper-empty-info">您还没有相关的信息呢</div>
        </div>
      </div>
    </page-content>
  </page>
</template>

<script>
  import Solo from 'solojs'
  import { Group, Cell, CellFormPreview} from 'vux'

  export default {
    extends: Solo.Page,
    components: {
      Group,
      Cell,
      CellFormPreview
    },
    data() {
      return {
        isEmpty: true,
        detailData: {}
      }
    },
    filters: {
      formatDate (value) {
        if (!value) return ''
        value = value.toString()
        return value.substr(0, 10);
      }
    },
    computed: {
      userNum () {
        return this.viewData ? this.viewData : '';
      }
    },
    created () {
      this.getRecordDetail();
    },
    methods: {
      getRecordDetail () {
        console.log(this.userNum);
        let params={};
        if(kk.isKK()){
        	params= {
	          "evaluationId": this.viewData,
	          "fdNo":kk.app.getUserInfo().loginName,
	        };
        }else{
        	params= {
	          "evaluationId": this.viewData,
	          "fdNo" : "80080218",
	        };
        }
        
        const apiURL = '/kkYhUnproforMain.do?method=getEvaluationRecordDetail';
        this.$http.post(apiURL, params).then((response) => {
          if(response.body.data){
            this.detailData = response.body.data;
            console.log(this.detailData);
            this.isEmpty = false;
          }else{
            this.isEmpty = true;
          }
        }).catch((response) => {
            console.log(response)
        })
        if(this.userNum){

        }
      },
      currentSta (code) {
        if(code == 0){
          return "马上测评"
        }else if(code == 1){
          return "已评分"
        }else if(code == 2){
          return "已过期"
        }else if(code == 3){
          return "已撤销"
        }else if(code == 4){
          return "进行中"
        }else if(code == 5){
          return "已结束"
        }else if(code == 6){
          return "未开始"
        }else{
          return ""
        }
      },
      toBack() {
        console.log('back')
        this.$router.back();
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
.wrap-head:after{
    	content: " ";
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    height: 1px;
	    border-bottom: 1px solid #D9D9D9;
	    color: #D9D9D9;
	    -webkit-transform-origin: 0 100%;
	    transform-origin: 0 100%;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
    }
  .page-head-wrap{
    background-color: #25a7e8;
    color: #FFFFFF;
    .solo-page-header-back{
      &:before{
         border: 1px solid #FFFFFF;
         border-width: 1px 0 0 1px;
      }
    }
  }
  .wrapper-detail{
    position: relative;
    
    .wrap-head{
    	position: relative;
      font-size: 15px;
      width:100%;
      height:50px;
      padding:0 15px;
      line-height: 50px;
      position: fixed;
      z-index:5;
      background-color:#ffffff;
      /*border-bottom: 1px solid #D9D9D9;*/
    div{
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      float: left;
    }
    .wrap-head-left{
      width:60%;
      color: #222;
      font-weight:bold;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .wrap-head-right{
      width:40%;
      color: #979797;
      text-align: right;
    }
    &:after{
       content: '';
       display: table;
       clear: both;
     }
    }
    .wrap-content{
      padding-top:50px;
      margin-bottom: 10px;
      .vux-label {
        font-weight: bold;
      }
      .weui-cells {
        margin-top: 10px;
      }
      .wrap-content-title{
        padding:0 15px;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        .vux-cell-bd{
          color: #222;
        }
        .weui-cell__ft{
          color: #25a7e8;
        }
      }
      .cell-preview-wrap{
        overflow: hidden;
        padding:10px 15px;
        position: relative;
        &:before{
           content: " ";
           position: absolute;
           left: 15px;
           top: 0;
           right: 0;
           height: 1px;
           border-top: 1px solid #D9D9D9;
           color: #D9D9D9;
           -webkit-transform-origin: 0 0;
           transform-origin: 0 0;
           -webkit-transform: scaleY(0.5);
           transform: scaleY(0.5);
         }
      }
      .cell-preview-group{
        list-style: none;
        max-height:135px;
        font-size:14px;
        overflow: auto;
        li{
          width:100%;
          margin:5px 0;
          overflow: hidden;
          .cell-preview-left{
            float: left;
            color: #666;
            margin-right:5px;
            text-align: justify;
            text-align-last: justify;
            &:after{
               content: ':';
               display: inline;
               padding: 0 3px;
             }
          }
          .cell-preview-right{
            color: #222;
            display: block;
            overflow: hidden;
            word-break: normal;
            word-wrap: break-word;
          }
        }
      }
    }
    .wrap-detail{
    	.weui-cells{
    		margin-top: 10px;
    	}
      .wrap-detail-title{
        padding:0 15px;
        line-height: 50px;
        font-weight: bold;
        color: #222;
      }
      .wrap-detail-group{
        padding:10px 15px;
        font-size:14px;
        list-style-type: decimal;
        position: relative;
        &:before{
           content: " ";
           position: absolute;
           left: 15px;
           top: 0;
           right: 0;
           height: 1px;
           border-top: 1px solid #D9D9D9;
           color: #D9D9D9;
           -webkit-transform-origin: 0 0;
           transform-origin: 0 0;
           -webkit-transform: scaleY(0.5);
           transform: scaleY(0.5);
         }
         li{
           margin: 5px 0 5px 20px;
            .cell-detail-left{
              display: block;
              color: #666;
              .cell-detail-num{
                padding-left:10px;
                color: #93be2d;
                font-weight:bold;
              }
            }
            .cell-detail-right{
              color: #666;
            }
         }
      }
    }
  }
  .wrapper-empty{
    width:100%;
    height:100%;
    margin-top:-46px;
    display: table;
  }
  .wrapper-empty-cell{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .wrapper-empty-cell img{
    display: inline-block;
    width:62px;
    height:auto;
  }
  .wrapper-empty-info{
    color: #666;
  }


</style>
