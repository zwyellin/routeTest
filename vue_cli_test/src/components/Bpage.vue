<template>
  <div>
    this is bPage
      <input>
    <router-link to="/">Go to home</router-link>
     <router-link to="/c">Go to c</router-link>
  </div>
</template>

<script>
export default {
  name: 'Bpage',
     beforeRouteLeave:function(to, from, next){
     console.log("离开",to,from,)
     console.log(this.$vnode)
     if(this.$vnode.parent && this.$vnode.parent.tag.indexOf('keep-alive')!=-1 &&this.$vnode.parent.componentInstance.cache){
       let _entries =Object.entries(this.$vnode.parent.componentInstance.cache)
       console.log('xx',_entries)
    //    if(to.path === '/b'){
    //       _entries.forEach(item=>{
    //       if(item[1].tag=== this.$vnode.tag) delete this.$vnode.parent.componentInstance.cache[item[0]]
    //       })
    //    }
     }
     next()
   }
}
</script>
<style scoped>

</style>
