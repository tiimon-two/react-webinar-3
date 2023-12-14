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
        name: localStorage.getItem('name'),
        phone: localStorage.getItem('phone'),
        email: localStorage.getItem('email'),
      },
      authorized: localStorage.getItem('token')? true : false,
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
        localStorage.setItem('name', json.result.user.profile.name);
        localStorage.setItem('phone', json.result.user.profile.phone);
        localStorage.setItem('email', json.result.user.email);
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
        token: '',
        authorized: false,
        waiting: false,
      }, 'Удалён токен');
    }
  }
}

export default LoginState;