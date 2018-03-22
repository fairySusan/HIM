<style lang="less">
/* 把父级路由的内容给盖住 */
    .singer-detail{
        position:fixed;
        z-index:1000;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background: white;
    }
    .slide-enter-active,.slide-leave-active{
        transition:all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform:translate3d(100%,0,0);
    }
</style>
<template>
    <transition name="slide">
        <div class="singer-detail">
        惺惺惜惺惺想寻寻
        </div>
    </transition>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{

        }
    },
    created(){
        console.log(this.singer);
    },
    computed:{
        ...mapGetters([
            'singer'
        ])
    }

}
</script>


