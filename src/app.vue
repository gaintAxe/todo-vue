<template>
 <div id="app">
   <div id="cover">
     <main-header></main-header>
     <todo></todo>
     <main-footer></main-footer>

   </div>
 </div>
</template>

<script>
import MainHeader from './layout/header.vue'
import MainFooter from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
console.log(MainHeader.__docs, MainHeader)
export default {
  data () {
    return {
      test: '1232'
    }
  },
  components: { MainHeader, MainFooter, Todo }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity: .9;
  z-index 1
}
</style>
