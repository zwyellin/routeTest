import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Bpage from '@/components/Bpage'
import Cpage from '@/components/Cpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        keepAlive: true
      },
      beforeEnter: (to, from, next)=>{
        // 这里可以从跳转源方向，来决定【进来】需不需缓存
        // 可以配置includes来使用
        // if(from.path === '/b'){
        //   to.meta.keepAlive=true
        // }
        next()
      }
    },{
      path:'/b',
      component:Bpage
    },
    {
      path:'/c',
      component:Cpage
    }
  ]
})
