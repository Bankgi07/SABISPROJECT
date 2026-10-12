import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const doLogin = async (u, p) => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      const role = data.user.role;
      if (role === 'Trainee') navigate('/trainee/dashboard');
      else if (role === 'Trainer') navigate('/trainer/dashboard');
      else if (role === 'HR') navigate('/hr/dashboard');
      else navigate('/login');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    doLogin(username, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f5f9',
      padding: '20px',
      fontFamily: "'Sarabun', sans-serif"
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '460px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header Banner */}
        <div style={{
          backgroundColor: '#0f172a',
          padding: '28px 24px',
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            borderRadius: '14px',
            backgroundColor: '#f97316',
            marginBottom: '12px',
            fontWeight: '900',
            fontSize: '28px'
          }}>
            T
          </div>
          <h1 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            TRAIN TMS
          </h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
            ระบบบริหารจัดการการฝึกอบรม · บริษัท ไดนามิกส์ โมชั่น จำกัด
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px' }}>
          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#b91c1c',
              border: '1px solid #fecaca',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '18px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Standard Login Form */}
          <form onSubmit={handleFormSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                รหัสพนักงาน / Username
              </label>
              <input
                type="text"
                placeholder="เช่น TN001, TR001, HR001"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  boxSizing: 'border-box',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                รหัสผ่าน (Password)
              </label>
              <input
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  boxSizing: 'border-box',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#f97316',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.15s'
              }}
            >
              <LogIn size={18} />
              <span>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}