import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  CheckSquare,
  Award,
  Users,
  FileCheck,
  FolderKanban,
  FileText,
  UserPlus,
  Database,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuConfig = {
    Trainee: [
      { label: 'แดชบอร์ดส่วนบุคคล', path: '/trainee/dashboard', icon: LayoutDashboard },
      { label: 'เส้นทางการเรียนรู้ (Roadmap)', path: '/trainee/roadmap', icon: Compass },
      { label: 'สื่อเรียนรู้และส่งงาน', path: '/trainee/assignments', icon: CheckSquare },
      { label: 'ผลการประเมิน & Feedback', path: '/trainee/evaluations', icon: Award }
    ],
    Trainer: [
      { label: 'แดชบอร์ดผู้ฝึกสอน', path: '/trainer/dashboard', icon: LayoutDashboard },
      { label: 'ตรวจและประเมินงาน (Rubric)', path: '/trainer/evaluations', icon: Award },
      { label: 'จัดการพนักงาน & มอบหมายแผน', path: '/trainer/trainees', icon: Users },
      { label: 'คลังสื่อ & คลังโจทย์', path: '/trainer/tasks', icon: FolderKanban }
    ],
    HR: [
      { label: 'แดชบอร์ดภาพรวมฝ่ายบุคคล', path: '/hr/dashboard', icon: LayoutDashboard },
      { label: 'จัดการบัญชีผู้ใช้ (Users)', path: '/hr/users', icon: UserPlus },
      { label: 'รายงานผลทดลองงาน (Probation)', path: '/hr/probation', icon: FileCheck }
    ]
  };

  const currentMenu = menuConfig[user?.role] || [];

  return (
    <aside style={{
      width: '260px',
      flexShrink: 0,
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      borderRight: '1px solid #1e293b',
      userSelect: 'none',
      zIndex: 50
    }}>
      <div>
        {/* Logo / Header */}
        <div style={{ padding: '24px 22px 20px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              color: '#ffffff',
              fontSize: '18px'
            }}>
              T
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
                TRAIN TMS
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                Dynamics Motion Onboarding
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div style={{ padding: '16px 12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', padding: '0 12px 10px', letterSpacing: '0.5px' }}>
            เมนูหลัก ({user?.role})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentMenu.map((item, index) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  to={item.path}
                  style={{
                    color: isActive ? '#ffffff' : '#94a3b8',
                    textDecoration: 'none',
                    padding: '11px 14px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? '600' : '500',
                    backgroundColor: isActive ? '#1e293b' : 'transparent',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderLeft: isActive ? '3px solid #f97316' : '3px solid transparent',
                    transition: 'all 0.15s'
                  }}
                >
                  <Icon size={17} color={isActive ? '#f97316' : '#64748b'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Database Inspector Shortcut (Only for HR and Trainer/BA) */}
          {(user?.role === 'HR' || user?.role === 'Trainer') && (
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #1e293b' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', padding: '0 12px 8px', letterSpacing: '0.5px' }}>
                เครื่องมือระบบ
              </div>
              <Link
                to="/database"
                style={{
                  color: location.pathname === '/database' ? '#ffffff' : '#94a3b8',
                  textDecoration: 'none',
                  padding: '11px 14px',
                  fontSize: '13.5px',
                  fontWeight: location.pathname === '/database' ? '600' : '500',
                  backgroundColor: location.pathname === '/database' ? '#1e293b' : 'transparent',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderLeft: location.pathname === '/database' ? '3px solid #38bdf8' : '3px solid transparent',
                  transition: 'all 0.15s'
                }}
              >
                <Database size={17} color={location.pathname === '/database' ? '#38bdf8' : '#64748b'} />
                <span>ตรวจฐานข้อมูล (13 Tables)</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* User Footer & Logout */}
      <div style={{ borderTop: '1px solid #1e293b', padding: '16px 18px', backgroundColor: '#090d16' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: user?.role === 'Trainee' ? '#2563eb' : user?.role === 'Trainer' ? '#d97706' : '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: '14px'
          }}>
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.fullName}
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              {user?.role} · {user?.position || 'Dynamics Motion'}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '8px 12px',
            backgroundColor: '#1e293b',
            color: '#ef4444',
            border: '1px solid #334155',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'background-color 0.15s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#ef4444'; }}
        >
          <LogOut size={14} />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}