import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoggedIn: false
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleLogin = () => {
        const { username, password } = this.state;

        const userData = {
            email: username,
            password: password
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };

        fetch('http://localhost:8080/Activities_war_exploded/login', requestOptions)
            .then(response => {
                if (response.ok) {
                    this.setState({
                        isLoggedIn: true
                    });
                } else {
                    alert('Authentication error');
                }
            })
            .catch(error => console.error('Error when sending a request:', error));
    }

    handleUserPage = () => {
        fetch('http://localhost:8080/Activities_war_exploded/users')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
            .then(data => {
                // Обработка полученных данных
                console.log('User data:', data);
                // Пример: обновление состояния приложения с полученными данными
                // this.setState({ userData: data });
                // Другие действия в зависимости от полученных данных
            })
            .catch(error => console.error('Error fetching user data:', error));
    }

    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
            username: "",
            password: ""
        });
    }

    render() {
        const { isLoggedIn } = this.state;

        if (isLoggedIn) {
            return (
                <div>
                    <p>You are successfully logged in!</p>
                    <button onClick={this.handleUserPage}>Go to the User page</button>

                    <div>
                        <button onClick={this.handleLogout}>Logout</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Welcome to our website</h2>
                    <p>To continue, please login:</p>
                    <form>
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username" onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" onChange={this.handleInputChange} />
                        </div>
                        <button type="button" onClick={this.handleLogin}>Login</button>
                    </form>
                </div>
            );
        }
    }
}

export default App;