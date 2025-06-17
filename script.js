const { createApp, ref } = Vue;

    createApp({
      data() {
        
        return {
          myData: [],
          currentTime: new Date().toLocaleTimeString(),
          currentDate: new Date(),
          todayDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          
          projects: [],
          newProject: { title: '', startDate: '', client: '' },
          showprojectbox: false,
          showProjectForm: false,
        
        };
      },
      mounted() {
        // Update time every second
        setInterval(() => {
          this.currentTime = new Date().toLocaleTimeString();
        }, 1000);
        
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            this.projects = JSON.parse(savedProjects);
        }
      },

      // add date to the projects
      computed: {
        dateaddprojects() {
          return this.currentDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit'
          });
        }
      },

      methods: {
        
        addProject() {
          if (this.newProject.title) {
            this.projects.push({ ...this.newProject });
            this.newProject = { title: '', startDate: '', client: ''};
            this.newProject.title = '',
            this.showprojectbox = true;
            this.showProjectForm = false;
          }
        },
        deleteProject(i) {
          this.projects.splice(i, 1);
        },
        
        
      },
      created() {
        // Load from localStorage on start
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) this.projects = JSON.parse(savedProjects);

        const saved = localStorage.getItem('myData');
        if (saved) this.myData = JSON.parse(saved);
      },
      watch: {
        // for changes and save
        myData: {
          handler(newVal) {
            localStorage.setItem('myData', JSON.stringify(newVal));
          },
          deep: true
        },
        projects: {
          handler(newVal) {
            localStorage.setItem('projects', JSON.stringify(newVal));
          },
          deep: true
        },
        tasks: {
          handler(newVal) {
            localStorage.setItem('tasks', JSON.stringify(newVal));
          },
          deep: true
        }
      }
    }).mount('#app')