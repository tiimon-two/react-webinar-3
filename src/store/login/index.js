import StoreModule from "../module";

class LoginState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      waiting: false,
      token: localStorage.getItem('token'),
      error: '',
      user: {
        name: null,
        phone: null,
        email: null,
      },
      authorized: localStorage.getItem('token')? true : false,
      login: false,
    }
  }

  async authorization(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const response = await fetch('api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'login': login,
        'password': password,
        'remember': true
      })
    });
      const json = await response.json();
      try {
        localStorage.setItem('token', json.result.token);
        this.setState({
          ...this.getState(),
          token: json.result.token,
          user: {
            name: json.result.user.profile.name,
            phone: json.result.user.profile.phone,
            email: json.result.user.email,
          },
          authorized: true,
          waiting: false,
        }, 'Получен токен')
      } catch (error) {
          this.setState({
            ...this.getState(),
            waiting: false,
            error: json.error.message
          })
        }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const response = await fetch('api/v1/users/sign',{
      method: 'DELETE',
      headers: {
        'X-Token': this.getState().token,
      }
    });
    const json = await response.json();
    if(!json.error) {
      localStorage.clear();
      this.setState({
        ...this.getState(),
        token: null,
        authorized: false,
        waiting: false,
      }, 'Удалён токен');
    } else {
      this.setState({
        ...this.getState(),
        waiting: false
      })
    }
  }

  async findUser() {
    if(this.getState().authorized) {
      this.setState({
        ...this.getState(),
        waiting: true,
      })
      const response = await fetch('api/v1/users/self?fields=*',{
        method: 'GET',
        headers: {
          'X-Token': this.getState().token,
        }
      });
        const json = await response.json();
        if(!json.error && !this.getState().login) {
          this.setState({
            ...this.getState(),
            user: {
              name: json?.result?.profile?.name,
              phone: json?.result?.profile?.phone,
              email: json?.result?.email,
            },
            waiting: false,
            login: true,
          }, 'Загружены данные из токена');
      } else {
        console.log(json.error);
        this.setState({
          ...this.getState(),
          waiting: false,
        });
      }
    }
  }
}

export default LoginState;