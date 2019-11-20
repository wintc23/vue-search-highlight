<template>
  <div id="app">
    <search-highlight content="一条大河你呀A你呀你A呀你呀A你呀你呀你呀你呀你呀as你呀AS" keyword="你呀">
    </search-highlight>
  </div>
</template>

<script>
import SearchHighlight from './components/SearchHighlight.vue'

export default {
  name: 'app',
  components: {
    SearchHighlight
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 60px;
}
</style>
