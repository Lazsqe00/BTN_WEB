Vue.createApp({
      data() {
        return {
          isRegistering: true,
          loginUsername: '',
          loginPassword: '',
          loginError: false,
          registerUsername: '',
          registerEmail: '',
          registerPassword: '',
          emailError: '',
          users: []
        };
      },
      mounted() {
        try {
          this.users = JSON.parse(localStorage.getItem('user')) || [];
        } catch {
          localStorage.removeItem('user');
          this.users = [];
        }
      },
      methods: {
        validateEmail(email) {
          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(String(email).toLowerCase());
        },
        handleRegister() {
          if (!this.validateEmail(this.registerEmail)) {
            this.emailError = 'Email không đúng định dạng';
            return;
          }
          this.emailError = '';

          const newUser = {
            userId: Math.ceil(Math.random() * 1000000),
            userName: this.registerUsername,
            email: this.registerEmail,
            password: this.registerPassword
          };

          this.users.push(newUser);
          localStorage.setItem('user', JSON.stringify(this.users));
          this.isRegistering = false;
          this.registerUsername = '';
          this.registerEmail = '';
          this.registerPassword = '';
        },
        handleLogin() {
          const user = this.users.find(
            u => u.userName === this.loginUsername && u.password === this.loginPassword
          );
          if (!user) {
            this.loginError = true;
          } else {
            this.loginError = false;
            localStorage.setItem('loginUsername', user.userName);
            window.location.href = './main.html';
          }
        }
      }
    }).mount('#app');