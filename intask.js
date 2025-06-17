const { createApp, ref } = Vue;

    createApp({
      data() {
        
        return {
          myData: [],
          currentTime: new Date().toLocaleTimeString(),
          currentDate: new Date(),
          todayDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          
          tasks: [],
          newtask: { desc: ''},
          showtaskbox: true,
          showTaskForm: false,
        }
      },
      mounted() {
        // Update time every second
        setInterval(() => {
          this.currentTime = new Date().toLocaleTimeString();
        }, 1000);
        
        const savedtasks = localStorage.getItem('tasks');
        if (savedtasks) {
            this.tasks = JSON.parse(savedtasks);
        }
      },

      // add date to the task
      computed: {
        dateaddtask() {
          return this.currentDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit'
          });
        }
      },

      methods: {
        
        addTask() {
          if (this.newtask.desc) {
            this.tasks.push({
              desc: this.newtask.desc,
              date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
            });
            this.newtask.desc = '';
            this.showtaskbox = true;
            this.showTaskForm = false;
          }
        },
        deleteTask(i) {
          this.tasks.splice(i, 1);
        }
      },
      
        created() {
          // Load from localStorage on start
          
          const savedtasks = localStorage.getItem('tasks');
          if (savedtasks) this.tasks = JSON.parse(savedtasks);

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
        tasks: {
          handler(newVal) {
            localStorage.setItem('tasks', JSON.stringify(newVal));
          },
          deep: true
        }
      }
    }).mount('#app')