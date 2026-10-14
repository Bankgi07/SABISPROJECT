import { Shield } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    user = null;
  }
  if (!user) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Sidebar user={user} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header style={{
          height: '64px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              backgroundColor: '#eff6ff',
              color: '#1d4ed8',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid #bfdbfe',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Shield size={13} /> Dynamics Motion · Training Management System
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* User Profile Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#f8fafc',
              padding: '5px 12px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: user.role === 'Trainee' ? '#2563eb' : user.role === 'Trainer' ? '#d97706' : '#059669',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {user.fullName?.charAt(0) || 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#1e293b', lineHeight: 1.2 }}>
                  {user.fullName}
                </span>
                <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                  {user.role} · {user.position || user.username}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="app-main" style={{ flex: 1, padding: '28px 36px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}