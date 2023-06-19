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
    }
  },

  mounted: function () {
    const zoomConfig = {
      levels: [
          {
              name: "hour",
              scale_height: 27,
              min_column_width: 15,
              scales: [
                  { unit: "day", format: "%d" },
                  { unit: "hour", format: "%H" },
              ]
          },
          {
              name: "day",
              scale_height: 27,
              min_column_width: 80,
              scales: [
                  { unit: "day", step: 1, format: "%d %M" }
              ]
          },
          {
              name: "week",
              scale_height: 50,
              min_column_width: 50,
              scales: [
                  {
                      unit: "week", step: 1, format: function (date) {
                          var dateToStr = gantt.date.date_to_str("%d %M");
                          var endDate = gantt.date.add(date, -6, "day");
                          var weekNum = gantt.date.date_to_str("%W")(date);
                          return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
                      }
                  },
                  { unit: "day", step: 1, format: "%j %D" }
              ]
          },
          {
              name: "month",
              scale_height: 50,
              min_column_width: 120,
              scales: [
                  { unit: "month", format: "%F, %Y" },
                  { unit: "week", format: "Week #%W" }
              ]
          },
          {
              name: "quarter",
              height: 50,
              min_column_width: 90,
              scales: [
                  {
                      unit: "quarter", step: 1, format: function (date) {
                          const dateToStr = gantt.date.date_to_str("%M");
                          const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                          return dateToStr(date) + " - " + dateToStr(endDate);
                      }
                  },
                  { unit: "month", step: 1, format: "%M" },
              ]
          },
          {
              name: "year",
              scale_height: 50,
              min_column_width: 30,
              scales: [
                  { unit: "year", step: 1, format: "%Y" }
              ]
          }
      ],
      useKey: "ctrlKey",
      trigger: "wheel",
      element: function () {
          return gantt.$root.querySelector(".gantt_task");
      }
    };

    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel("week");
    gantt.config.date_format = "%Y-%m-%d";

    gantt.plugins({
      fullscreen: true,
      tooltip: true,
      marker: true,
      overlay: true
    });
    
    gantt.attachEvent("onGanttReady", function(){
      const tooltips = gantt.ext.tooltips;
      tooltips.tooltip.setViewport(gantt.$task_data);
    });

    gantt.attachEvent("onTemplatesReady", function () {
      const toggle = document.createElement("i");
      toggle.className = "fa fa-expand gantt-fullscreen";
      gantt.toggleIcon = toggle;
      gantt.$container.appendChild(toggle);
      toggle.onclick = function() {
        gantt.ext.fullscreen.toggle();
      };
    });
    gantt.attachEvent("onExpand", function () {
      const icon = gantt.toggleIcon;
      if (icon) {
        icon.className = icon.className.replace("fa-expand", "fa-compress");
      }

    });
    gantt.attachEvent("onCollapse", function () {
      const icon = gantt.toggleIcon;
      if (icon) {
        icon.className = icon.className.replace("fa-compress", "fa-expand");
      }
    });

    const dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    const today = new Date(2023, 3, 5);
    gantt.addMarker({
      start_date: today,
      css: "today",
      text: "Today",
      title: "Today: " + dateToStr(today)
    });

    gantt.config.scales = [
      {unit: "month", step: 1, format: "%M"},
      {unit: "year", step: 1, format: "%Y"},
      {unit: "day", format: "%d %M"}
    ];
    gantt.config.scale_height = 50;
    gantt.config.columns = [
      {name: "text", tree: true, width: "*", min_width: 120, resize: true},
      {name: "end_date", align: "center", width:150, resize: true},
      {name: "start_date", align: "center", width:150, resize: true},
      {name: "duration", align: "center", width: 70, resize: true},
    ];
    // keeps or not the width of the grid area when column is resized
    gantt.config.keep_grid_width = false;
    gantt.config.grid_resize = true;

    gantt.init(this.$refs.ganttContainer);
    gantt.parse(this.$props.tasks);
    
  }
}
</script>
   
<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>

<style>
  .gantt-fullscreen {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    padding: 2px;
    font-size: 32px;
    background: transparent;
    cursor: pointer;
    opacity: 0.5;
    text-align: center;
    -webkit-transition: background-color 0.5s, opacity 0.5s;
    transition: background-color 0.5s, opacity 0.5s;
  }

  .gantt-fullscreen:hover {
    background: rgba(150, 150, 150, 0.5);
    opacity: 1;
  }

  .gantt_marker{
    background-color: rgba(255, 0, 0, 0.8);
  }

  .gantt_task_line, .gantt_task_link{
    transition: opacity 200ms;
  }
  .overlay_visible .gantt_task_line,
  .overlay_visible .gantt_task_link{
    opacity: 0.6;
  }

  .gantt_marker.today{
    background: #ffb121;
  }
</style>