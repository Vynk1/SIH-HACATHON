import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthDebugger = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    setDebugInfo({
      timestamp: new Date().toISOString(),
      user: user,
      isAuthenticated: isAuthenticated,
      loading: loading,
      token: localStorage.getItem('token'),
      userRole: user?.role,
      userRoleType: typeof user?.role,
      userName: user?.full_name,
      userEmail: user?.email
    });
  }, [user, isAuthenticated, loading]);

  return (
    <div style={{ 
      display: 'none',
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '15px', 
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#4A9EE2' }}>Auth Debug Info</h4>
      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      
      <div style={{ marginTop: '10px', borderTop: '1px solid #333', paddingTop: '10px' }}>
        <strong>Expected Redirects:</strong><br/>
        • admin → /adminDash<br/>
        • alumni → /alumnidash<br/>
        • student → /studentdash<br/>
      </div>
    </div>
  );
};

export default AuthDebugger;
