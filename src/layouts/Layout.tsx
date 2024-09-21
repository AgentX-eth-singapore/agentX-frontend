import React, { ReactNode } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/Header';

// Define types for the component props
interface LayoutProps {
  children: ReactNode; // Specifies that children can be any valid React node
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
