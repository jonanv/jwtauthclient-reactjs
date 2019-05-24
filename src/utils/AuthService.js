import decode from 'jwt-decode';

export default class AuthService {
    //Inicializar variables importantes
    constructor(domain) {
        this.domain = domain || `http://localhost:8080`; // API server domain
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(username, password) {
        // Obtiene un token del servidor api usando el fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.token); // Configuración del token en el localStorage
            return Promise.resolve(res);
        })
    }

    fetch(url, options) {
        // Realiza llamadas api enviando las cabeceras de autentificación requeridas
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        // Parametrización de la cabecera de autorización
        // Autorización: Bearer xxxxxxxxx.xxxxxxxx.xxxxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    getToken() {
        // Recupera el token del usuario del localStorage
        return localStorage.getItem('id_token');
    }

    setToken(idToken) {
        // Guarda el token del usuario en el localStorage
        localStorage.setItem('id_token', idToken);
    }

    loggedIn() {
        // Comprueba si hay un token guardado y sigue siendo valido
        const token = this.getToken(); // Obtiene el token desde el localStorage
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Comprueba si el token esta caducado
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    logout() {
        // Limpia los datos de perfil y token del localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        // Uso del paquete jwt-decode npm para decodificar el token
        return decode(this.getToken());
    }

    _checkStatus(response) {
        // Plantea un error en caso de que el estado de la respuesta no sea un éxito
        if (response.status >= 200 && response.status < 300) { // El estado de éxito se encuentra entre 200 y 300
            return response;
        }
        else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}