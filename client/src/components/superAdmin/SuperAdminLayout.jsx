import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../utils/auth';
import { Icon } from '@iconify/react/dist/iconify.js';

const SuperAdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/super-admin/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: 'heroicons:home',
      link: '/super-admin',
      active: location.pathname === '/super-admin'
    },
    {
      title: 'Tenant Management',
      icon: 'heroicons:building-office',
      link: '/super-admin/tenants',
      active: location.pathname === '/super-admin/tenants'
    },
    {
      title: 'User Management',
      icon: 'heroicons:users',
      link: '/super-admin/users',
      active: location.pathname === '/super-admin/users'
    },
    {
      title: 'Roles & Permissions',
      icon: 'heroicons:shield-check',
      link: '/super-admin/roles',
      active: location.pathname === '/super-admin/roles'
    },
    {
      title: 'Company Settings',
      icon: 'heroicons:cog-6-tooth',
      link: '/super-admin/settings',
      active: location.pathname === '/super-admin/settings'
    },
    {
      title: 'Authentication',
      icon: 'heroicons:lock-closed',
      link: '/super-admin/authentication',
      active: location.pathname === '/super-admin/authentication'
    }
  ];

  return (
    <div className="min-vh-100 bg-light d-flex">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-end shadow-sm transition-all ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        style={{
          width: sidebarOpen ? '260px' : '80px',
          minHeight: '100vh',
          position: 'sticky',
          top: 0,
          transition: 'width 0.3s ease',
          zIndex: 1000
        }}
      >
        <div className="p-3 border-bottom">
          <div className="d-flex align-items-center justify-content-between">
            {sidebarOpen && (
              <Link to="/super-admin" className="text-decoration-none">
                <img src="/assets/images/168X40.jpeg" alt="logo" style={{ height: '32px' }} />
              </Link>
            )}
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Icon icon={sidebarOpen ? 'heroicons:bars-3-bottom-left' : 'heroicons:bars-3'} />
            </button>
          </div>
        </div>

        <nav className="p-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`d-flex align-items-center gap-3 p-3 mb-1 rounded text-decoration-none transition ${
                item.active
                  ? 'bg-primary text-white'
                  : 'text-dark hover-bg-light'
              }`}
              style={{
                transition: 'all 0.2s ease'
              }}
            >
              <Icon icon={item.icon} style={{ fontSize: '20px', minWidth: '20px' }} />
              {sidebarOpen && <span className="fw-medium">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        {/* Header */}
        <header className="bg-white border-bottom shadow-sm">
          <div className="container-fluid d-flex align-items-center justify-content-between py-3">
            <div>
              <div className="fw-semibold text-dark">Super Admin Portal</div>
              <small className="text-muted">Manage system-wide recruitment access</small>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <span className="text-muted small">
                {localStorage.getItem('userEmail') || 'Super Admin'}
              </span>
              <button type="button" className="btn btn-danger btn-sm" onClick={handleLogout}>
                <Icon icon="heroicons:arrow-right-on-rectangle" className="me-1" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1" style={{ overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

