/* 进度条组件 */
<style lang="less">
@import '../assets/less/var.less';
    .progress-bar{
        // position: fixed;
        // bottom: 30px;
        .color-bar{
            background-color:@themeColor;
            width:20px;
            height:4px;
            position: absolute;
            top:0px;
        }
        .total-bar{
             background-color:#666;
             height:4px;
             
        }
        .circle-btn{
           position: absolute;
           top:-3px;
           width:10px;
           height:10px;
           background:@themeColor;
           border-radius:50%;

        }
    }
</style>
<template>
  <div class="progress-bar" ref="progressBar">
      <div class="color-bar" ref="colorBar"></div>
      <div class="total-bar"></div>
      <div class="circle-btn"></div>
  </div>
</template>
<script>
const CIRCLR_BTN = 10
export default {
  props:{
      percent:{
          type:Number,
          default:0
      }
  },
  data(){
      return{

      }
  },
  watch:{
      percent(newPercent){
          if(newPercent>=0){
              const barWidth = this.$refs.progressBar.clientWidth - CIRCLR_BTN;
              const offsetWidth = newPercent*barWidth;
              this.$refs.colorBar.style.width = offsetWidth+'px';
          }
      }
  }
}
</script>


