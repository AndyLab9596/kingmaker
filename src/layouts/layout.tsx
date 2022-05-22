import React from 'react';
import 'twin.macro';
import Footer from './footer';
import Header from './header';
import Main from './main';
interface LayoutProps {
  isNonFooter?: boolean;
  isNonHeader?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, isNonFooter, isNonHeader, className } = props;
  return (
    <div className={className} tw="flex flex-col h-full w-full overflow-auto">
      {!isNonHeader ? <Header /> : null}
      <Main>{children}</Main>
      {!isNonFooter ? <Footer /> : null}
    </div>
  );
};

export default Layout;
