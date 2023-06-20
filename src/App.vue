<template>
  <div class="container">
    <GanttComponent v-if="isLoadGantt" class="left-container" :tasks="tasks" :loadIssueInEpic="loadIssueInEpic"></GanttComponent>
  </div>
</template>

<script>
import GanttComponent from './components/GanttComponent.vue';
import { getEpics, getIssueInEpic } from './services/Epic';
 
export default {
  name: 'app',
  components: {GanttComponent},
  data () {
    return {
      tasks: {
        data: [],
        links: []
      },
      isLoadGantt: false
    }
  },
  mounted: async function() {
    const epics = await getEpics();
    this.tasks.data = epics.data;
    this.isLoadGantt = true
  },
  methods: {
    loadIssueInEpic: async function(epic) {
      let issues = await getIssueInEpic(epic);
      this.tasks.data = [...this.tasks.data, ...issues.data];
    }
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .container {
    height: 100vh;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
</style>