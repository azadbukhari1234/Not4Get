const { createApp, ref } = Vue;

    createApp({
      data() {
        
        return {
          myData: [],
          todayDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          projects: [],
          newProject: { id: '', title: '', startDate: '', client: '', task: [] },
          
          showprojectbox: false,
          showProjectForm: false,
          showTaskForm: false,
          
          todayTasks: [],
          newTaskdesc: '', 
          
          
          completeshow: [],

        };
      },
      methods: {
        alertMenu() {
          alert("Menu button clicked!");
        },
        
        addProject() {
          if (this.newProject.title) {
            this.projects.push({ ...this.newProject });
            this.newProject = { title: '', startDate: '', client: '', task: [] };
            this.newProject.title = '',
            this.showprojectbox = true;
            this.showProjectForm = false;
          }
        },
        deleteProject(i) {
          this.projects.splice(i, 1);
        },
        editProject(i) {
          alert("Edit project: " + this.projects[i].title);
        },

        addTask() {
          if (this.newTaskdesc.trim() !== '') {
            this.todayTasks.push(this.newTaskdesc.trim());
            this.newTaskdesc = '';
            this.showTaskForm = false;
          }
        },
        submitTask(i) {
          alert("Submit: " + this.todayTasks[i].desc);
        },
        
        moveToComplete(i) {
          const task = this.todayTasks[i];
          this.completeshow.push(task);
          this.todayTasks.splice(i, 1);
        },
        removeComplete(i) {
          this.completeshow.splice(i, 1);
        },
      
      },
      
      created() {
        // Load from localStorage on start
        const saved = localStorage.getItem('myData')
        if (saved) this.myData = JSON.parse(saved)
      },
      watch: {
        // Watch for changes and save
        myData: {
          handler(newVal) {
            localStorage.setItem('myData', JSON.stringify(newVal))
          },
          deep: true
        }
      }
    }).mount('#app')