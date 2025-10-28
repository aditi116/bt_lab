import axios from 'axios';

const API_URL = 'http://localhost:8081';

/**
 * OAuth2/SSO Authentication Service
 */
class OAuth2AuthService {
  /**
   * Process OAuth2 login with backend
   */
  async oauth2Login(provider, idToken, accessToken, userInfo) {
    const response = await axios.post(`${API_URL}/oauth2/login`, {
      provider,
      idToken,
      accessToken,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture
    });

    if (response.data.token) {
      // Store auth data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        userId: response.data.userId,
        username: response.data.username,
        email: response.data.email,
        mobileNumber: response.data.mobileNumber,
        roles: response.data.roles,
        preferredLanguage: response.data.preferredLanguage,
        preferredCurrency: response.data.preferredCurrency
      }));
    }

    return response.data;
  }

  /**
   * Initialize Google Sign-In
   */
  initializeGoogleSignIn(clientId, callback) {
    // Load Google Identity Services SDK
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: callback
      });
    };
    document.body.appendChild(script);
  }

  /**
   * Decode Google JWT token
   */
  decodeGoogleToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding Google token:', error);
      return null;
    }
  }
}

export default new OAuth2AuthService();
