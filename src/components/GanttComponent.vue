<template>
  <div ref="ganttContainer"></div>
</template>
   
<script>
import { gantt } from 'dhtmlx-gantt';
export default {
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] }
      }
    },
    taskApi: {
      type: String,
      defauit: ''
    },
    loadIssueInEpic: Function
  },

  mounted: function () {
    const self = this;
    // tooltip
    gantt.plugins({
      tooltip: true
    });
    gantt.attachEvent("onGanttReady", function(){
      var tooltips = gantt.ext.tooltips;
      tooltips.tooltip.setViewport(gantt.$task_data);
    });
    
    gantt.config.columns = [
      {name: "text", tree: true, width: "*", min_width: 120, resize: true},
      {name: "status", label: "Status", align:"center"},
    ];

  //   gantt.config.scales = [
  //     {unit: "month", step: 1, format: "%M"},
  //     {unit: "day", format: "%d %M"}
	// ];

    gantt.config.date_format = "%Y,%m,%d";

    gantt.attachEvent("onTaskClick",  function(id){
      let issue = self.$props.tasks.data.find(item => item.id === id);
      if (issue.type === 'epic') {
        self.loadIssueInEpic(id).then(() =>  gantt.parse(self.$props.tasks));
      }
      return true;
    });

    gantt.init(this.$refs.ganttContainer);
    gantt.parse(this.$props.tasks);
    // console.log('this.$props.taskApi', this.$props.taskApi)
    // gantt.load(this.$props.taskApi);

    // gantt.createDataProcessor({
    //   url: this.$props.taskApi,
    //   mode: "REST"
    // });

    gantt.templates.grid_folder = function(item) { 
      return "<div class='gantt_tree_icon icon_" + item.type + " gantt_folder_" + (item.$open ? "open" : "closed") + "'></div>"; 
    };
    gantt.templates.grid_file = function(item) { 
      return "<div class='gantt_tree_icon icon_" + item.type + " gantt_file'></div>"; 
    };
  }
}
</script>
   
<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>

<style>
  .gantt_tree_icon.icon_epic {
    background-image: url('https://teecomsys.atlassian.net/images/icons/issuetypes/epic.svg') !important;
  }
  
  .gantt_tree_icon.icon_story {
    background-image: url('https://teecomsys.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium') !important;
  }

  .gantt_tree_icon.icon_bug {
    background-image: url('https://teecomsys.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium') !important;
  }

  .gantt_tree_icon.icon_task {
    background-image: url('https://teecomsys.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium') !important;
  }
  
</style>