import React from 'react';
import { useApp } from '../../context/AppContext';
import { OverviewView } from './OverviewView';
import { FacultyDashboardView } from './FacultyDashboardView';
import { AdminDashboardView } from './AdminDashboardView';

/**
 * Dashboard Component
 * Main academic dashboard mapped to the /dashboard route.
 * Dynamically switches UI between Student, Faculty, and Admin modes based on user.role.
 */
export const Dashboard = (props) => {
  const { user } = useApp();
  const role = (user?.role || 'Student').toLowerCase();

  if (role.includes('faculty')) {
    return <FacultyDashboardView {...props} />;
  }

  if (role.includes('admin')) {
    return <AdminDashboardView {...props} />;
  }

  return <OverviewView {...props} />;
};

export default Dashboard;
