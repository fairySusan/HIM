<style lang="less">
@import '../../assets/less/var.less';
    .singer{
       .mint-cell{
           .mint-cell-title{
               flex:none;
           }
            .mint-cell-value{
                font-size:@baseFontSize;
                color:@grayFont;
                .singer-poto{
                    flex: 0 0 40px;
                    margin:0 0.6rem; 
                    img{
                        border-radius: 50%;
                    }
                }
            }
        }
    }
</style>

<template>
    <div class="singer">
        <mt-index-list>
            <mt-index-section v-for="itemList in singerList" :key="itemList.title" :index="itemList.title">
                <div v-for="item in itemList.items" :key="item.name" @click="clickSingerItem(item)">
                    <mt-cell>
                        <div class="singer-poto">
                            <img  :src="item.poto" alt="" width="100%" height="100%">
                        </div>
                        <p>{{item.name}}</p>
                    </mt-cell>
                </div>
            </mt-index-section>
        </mt-index-list>
        <!-- 渲染singer-detail组件 -->
        <router-view></router-view>
    </div>
</template>
<script>
import { getSingerList } from "api/singer";
// import {getSingerList} from 'api/index'
import {ERR_OK} from 'api/config';
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'
import { Indicator } from 'mint-ui';
export default {
    data(){
        return{
            singerList:[],
        }
    },
    created(){
        this._getSingerList();
    },
    methods:{
        _getSingerList(){
            getSingerList().then(res=>{
                if(res.code ===  ERR_OK){
                    this.singerList = this.sortSinger(res.data.list);
                }
            })
        },
        //将数据进行A~Z的分组
        sortSinger(singerList){
            const HOT_SINGER_LEN = 10;
            const HOT_NAME = '热门';
            let map = {
                hot:{
                    title:HOT_NAME,
                    items:[]
                }
            }
            singerList.forEach((item,index)=>{
                if(index<HOT_SINGER_LEN){
                    map.hot.items.push(new Singer({
                        mid:item.Fsinger_mid,
                        name:item.Fsinger_name,
                    }))
                }
                const key = item.Findex;
            // 如果没有key字母，创建一个以key字母为标识的对象
                if(!map[key]){
                    map[key] = {
                        title:key,
                        items:[]
                    }
                }
                map[key].items.push(new Singer({
                    mid:item.Fsinger_mid,
                    name:item.Fsinger_name
                }))
            });
            //把分好组的数组进行A~Z的顺序排序
            let hot = [];
            let ret = [];
            for(let key in map){
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val)
                }else if(val.title === HOT_NAME){
                    hot.push(val);
                }
                ret.sort((a,b) =>{
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
            }
            return hot.concat(ret);
        },
        //歌手详情页的跳转
        clickSingerItem(item){
            this.$router.push({
                path:`/singer/${item.mid}`
            })
            this.setSinger(item);
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        })
    }
}
</script>

