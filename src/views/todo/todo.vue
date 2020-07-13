<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么？"
      @keyup.enter="addTodo()"
      ref="input"
    />
    <item v-for="(todo,index) in  computedTodoList" :key="index" :todo="todo" @del="del($event)"></item>
    <tabs
      :len="computedTodoList.length"
      @filterTodoList="filterTodoList($event)"
      :filte="state"
      @delAll="delAll"
    ></tabs>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
export default {
  methods: {
    addTodo () {
      this.todoList.push({
        id: ++this.index,
        content: this.$refs.input.value,
        completed: false
      })
    },
    mounted () {
      this.list = this.todoList
    },
    del (id) {
      this.todoList = this.todoList.filter(item => {
        return item.id !== id
      })
      console.log(this.todoList)
    },
    filterTodoList (state) {
      console.log(state)
      this.state = state
    },
    delAll () {
      this.todoList = this.todoList.filter(item => {
        return item.completed === false
      })
    }
  },
  computed: {
    computedTodoList () {
      console.log(1)
      if (this.todoList) {}
      if (this.state === 'all') {
        return this.todoList
      }
      const flag = this.state === 'completed'
      return this.todoList.filter(item => {
        return item.completed === flag
      })
    }
  },
  data () {
    return {
      index: 0,
      state: 'all',
      todoList: [{ id: 0, content: '1234', completed: false }]
    }
  },
  components: {
    Item,
    Tabs
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4rem;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: insert 0 -2px 1px rgba(0, 0, 0, 0.4);
}
</style>
