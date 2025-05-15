
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MenuSection } from './components/MenuSection';
import { DashboardWelcome } from './components/DashboardWelcome';
import { menuSections } from './data/menu-sections';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <DashboardWelcome userEmail={user?.email} />
      
      {menuSections.map((section, index) => (
        <MenuSection key={index} title={section.title} items={section.items} />
      ))}
    </div>
  );
};

export default Dashboard;
