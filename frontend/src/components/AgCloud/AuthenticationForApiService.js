import axios from 'axios'
import { API_URL } from '../../Constants'

export const AUTHENTICATED_USER_SESSION = 'authenticatedUser'

class AuthenticationForApiService {

    

    authenticate(email, password, role) {
        return axios.post(`${API_URL}/login`, {
            email,
            password,
            role
        })
    }

    registerSuccessfulLogin(email, jwt,role,name) {
        sessionStorage.setItem(AUTHENTICATED_USER_SESSION, email)
        sessionStorage.setItem("jwt", jwt)
        sessionStorage.setItem("role", role)
        sessionStorage.setItem("name", name)
        
        
    }

    
    logout() {
        sessionStorage.removeItem(AUTHENTICATED_USER_SESSION);
        sessionStorage.removeItem("jwt");
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(AUTHENTICATED_USER_SESSION)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(AUTHENTICATED_USER_SESSION)
        if (user === null) return ''
        return user
    }

  
}

export default new AuthenticationForApiService()