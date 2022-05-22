import React from 'react';

const Main: React.FC = ({ children }) => {
  return (
    <main className="app-main flex-1">
      <div className="main-container h-full">{children}</div>
    </main>
  );
};

export default Main;
