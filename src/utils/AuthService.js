export default class AuthService {
    //Inicializar variables importantes
    constructor(domain) {
        this.domain = domain || `http://localhost:8080`; // API server domain
    }

    login(username, password) {
        // Obtiene un token del servidor api usando el fetch api
        return (`${this.domain}/`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }).then(res => {
                this.setToken(res.token); // Configuración del token en el localStorage
                return Promise.resolve(res);
            })
        });
    }

    fetch(url, options) {
        // Realiza llamadas api enviando las cabeceras de autentificación requeridas
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        // Parametrización de la cabecera de autorización
        // Autorización: Bearer xxxxxxxxx.xxxxxxxx.xxxxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = `Bearer ${this.getToken()}`;
        }
        return fetch(url, {
            header,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    getToken(){
        return localStorage.getItem('id_token');
    }

    setToken(idToken){
        localStorage.setItem('id_token', idToken);
    }

    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(idToken){
        
    }
}