<template>
  <page>
    <page-header class="page-head-wrap" title="我的联保关系" :showBack="true" @on-click-back="toBack" slot="header"></page-header>
    <page-content class="page-content">
      <div class="wrapper-account" v-show="!isEmpty">
        <group class="account-group">
          <cell class="account-title" title="我的联保人"></cell>
          <cell
            :title="item.fdPerName + '('+item.fdPerNo+')'"
            :value="item.fdPerOrg"
            :key="n"
            v-for="(item, n) in guarantorData"
            v-if="beGuarantorData.length > 0"
            class="cell-group-item"
          ></cell>
        </group>
        <group class="account-group">
          <cell class="account-title" title="我的被联保人"></cell>
          <cell
            :title="item.fdPerName + '('+item.fdPerNo+')'"
            :value="item.fdPerOrg"
            :key="n"
            v-for="(item, n) in beGuarantorData"
            v-if="beGuarantorData.length > 0"
            class="cell-group-item"
          ></cell>
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
        isEmpty: true,
        guarantorData: [],
        beGuarantorData: []
      }
    },
    methods: {
      getGuarantor () {
        let params = {
          "fdLoginName": kk.app.getUserInfo().loginName
        };
        const apiURL = '/kkYhUnproforMain.do?method=getGuarantor';
        this.$http.post(apiURL, params).then((response) => {
          var sourceData = response.body.data,
              guarantor = sourceData["guarantor"].length ? sourceData["guarantor"] : "",
              beGuarantor = sourceData["beGuarantor"].length ? sourceData["beGuarantor"] : "";
          if(guarantor || beGuarantor){
            this.guarantorData = guarantor;
            this.beGuarantorData = beGuarantor;
            this.isEmpty = false;
          }else{
            this.isEmpty = true;
          }
        }).catch((response) => {
            console.log(response)
        })
      },
      toBack() {
        this.$router.back();
      }
    },
    created () {
      this.getGuarantor();
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

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
  .page-content{
    padding-top: 44px;
  }
  .wrapper-account{
    position: relative;
    .account-group{
      .weui-cells{
        margin-top:10px;
      }
      .weui-cell{
        padding:0 15px;
        line-height: 50px;
        font-size: 14px;
      }
      .account-title{
        font-weight: bold;
        color: #666;
        &+ .weui-cell{
            &:before{
               left:0;
             }
           }
      }
      .cell-group-item{
        .vux-cell-primary{
          overflow: hidden;
        .vux-label{
            color: #222;
            font-size: 15px;
            padding-right:15px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
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
