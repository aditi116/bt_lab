import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import oauth2Service from '../../services/oauth2Service';

const GoogleSignInButton = ({ onError, onSuccess }) => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Google Client ID - REPLACE WITH YOUR ACTUAL CLIENT ID
  // Get this from: https://console.cloud.google.com/
  const GOOGLE_CLIENT_ID = '267999526702-lmldobad0s5ojs83pahrqma99k6asdje.apps.googleusercontent.com';

  // Check if Client ID is configured
  const isConfigured = GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE');

  useEffect(() => {
    // Don't load Google SDK if Client ID is not configured
    if (!isConfigured) {
      return;
    }

    // Load Google Identity Services SDK
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        // Render the button
        if (buttonRef.current) {
          window.google.accounts.id.renderButton(
            buttonRef.current,
            {
              theme: 'outline',
              size: 'large',
              width: buttonRef.current.offsetWidth,
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left'
            }
          );
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      console.log('Google Sign-In response received');
      
      // Decode the JWT token from Google
      const userInfo = oauth2Service.decodeGoogleToken(response.credential);
      console.log('Decoded user info:', userInfo);

      if (!userInfo || !userInfo.email) {
        throw new Error('Failed to decode Google user information');
      }

      // Send to backend for processing
      const loginResponse = await oauth2Service.oauth2Login(
        'google',
        response.credential,
        null,
        {
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture
        }
      );

      console.log('OAuth2 login successful:', loginResponse);

      // Update auth context
      login(loginResponse.token, {
        userId: loginResponse.userId,
        username: loginResponse.username,
        email: loginResponse.email,
        mobileNumber: loginResponse.mobileNumber,
        roles: loginResponse.roles,
        preferredLanguage: loginResponse.preferredLanguage,
        preferredCurrency: loginResponse.preferredCurrency
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(loginResponse);
      }

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Google Sign-In failed';
      
      // Call error callback if provided
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  return (
    <div className="google-signin-wrapper w-full">
      {!isConfigured ? (
        <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-blue-800 font-medium mb-2">
            🔐 Google SSO Ready - Setup Required
          </p>
          <p className="text-xs text-blue-600">
            To enable Google Sign-In, add your Client ID in:
          </p>
          <p className="text-xs text-blue-700 font-mono mt-1 mb-2">
            src/components/Auth/GoogleSignInButton.jsx
          </p>
          <a 
            href="https://console.cloud.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Get Client ID from Google Cloud Console →
          </a>
          <p className="text-xs text-gray-500 mt-2">
            See <strong>SSO-IMPLEMENTATION-GUIDE.md</strong> for detailed setup steps
          </p>
        </div>
      ) : (
        <>
          <div ref={buttonRef} className="w-full"></div>
          <p className="mt-3 text-xs text-center text-gray-500">
            Sign in securely with your Google account
          </p>
        </>
      )}
    </div>
  );
};

export default GoogleSignInButton;
