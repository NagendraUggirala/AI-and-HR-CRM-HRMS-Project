import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../utils/auth';
import { Icon } from '@iconify/react/dist/iconify.js';

const SuperAdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarActive, setSidebarActive] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  const activeStyles = `
    .sidebar-menu li > a.active-page {
      background-color: #0d6efd !important;
      color: #fff !important;
      border-radius: 8px;
    }
    .sidebar-menu li > a.active-page .menu-icon {
      color: #fff !important;
    }
  `;

  const sidebarControl = () => setSidebarActive(!sidebarActive);
  const mobileMenuControl = () => setMobileMenu(!mobileMenu);

  return (
    <>
      <style>{activeStyles}</style>
      <section className={mobileMenu ? 'overlay active' : 'overlay'}>
        <aside
          className={
            sidebarActive
              ? 'sidebar active'
              : mobileMenu
                ? 'sidebar sidebar-open'
                : 'sidebar'
          }
        >
          <button onClick={() => setMobileMenu(!mobileMenu)} type='button' className='sidebar-close-btn'>
            <Icon icon='radix-icons:cross-2' />
          </button>
          <div>
            <Link to='/super-admin' className='sidebar-logo'>
              <img src='/assets/images/168X40.jpeg' alt='site logo' className='light-logo' />
              <img src='/assets/images/168X40.jpeg' alt='site logo' className='logo-icon' />
            </Link>
          </div>
          <div className='sidebar-menu-area'>
            <ul className='sidebar-menu' id='sidebar-menu'>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.link} className={item.active ? 'active-page' : ''}>
                    <Icon icon={item.icon} className='menu-icon' />
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={(sidebarActive ? 'dashboard-main active ' : 'dashboard-main') + ' bg-neutral-50'}>
          <div className='navbar-header bg-base' style={{ minHeight: '90px' }}>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto'>
                <div className='d-flex flex-wrap align-items-center gap-4'>
                  <button type='button' className='sidebar-toggle' onClick={sidebarControl}>
                    {sidebarActive ? (
                      <Icon icon='iconoir:arrow-right' className='icon text-2xl non-active' />
                    ) : (
                      <Icon icon='heroicons:bars-3-solid' className='icon text-2xl non-active ' />
                    )}
                  </button>
                  <button onClick={mobileMenuControl} type='button' className='sidebar-mobile-toggle'>
                    <Icon icon='heroicons:bars-3-solid' className='icon' />
                  </button>
                  <div className='d-none d-md-block lh-sm'>
                    <h6 className='mb-1 fw-semibold text-dark'>Super Admin Portal</h6>
                    <span className='text-secondary-light fw-medium text-sm d-block'>
                      Manage system-wide recruitment access
                    </span>
                  </div>
                </div>
              </div>
              <div className='col-auto'>
                <div className='d-flex flex-wrap align-items-center gap-3'>
                  <div className='d-none d-md-flex align-items-center'>
                    <span
                      className='text-muted small text-truncate'
                      style={{ maxWidth: '280px' }}
                      title={localStorage.getItem('userEmail') || 'Super Admin'}
                    >
                      {localStorage.getItem('userEmail') || 'Super Admin'}
                    </span>
                  </div>
                  <button type='button' className='btn btn-danger btn-sm d-flex align-items-center' onClick={handleLogout}>
                    <Icon icon='heroicons:arrow-right-on-rectangle' className='me-1' />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='dashboard-main-body bg-neutral-50'>
            {children}
          </div>
        </main>
      </section>
    </>
  );
};

export default SuperAdminLayout;

