import { breakpoints } from '@nebula-js/ui';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Footer } from './Footer';

export interface MainLayoutProps {
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

function MainLayoutBase({
  className,
  containerClassName,
  children,
}: MainLayoutProps) {
  return (
    <Container className={containerClassName}>
      <div className={className}>
        {children}
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.section`
  padding: 70px 50px 50px 50px;

  > div {
    max-width: 1080px;
    margin: 0 auto;

    h1 {
      font-size: var(--font-size32);
      font-weight: 500;
    }
  }

  // small layout
  @media (max-width: ${breakpoints.tablet.max}px) {
    padding: 24px 16px 16px 16px;
  }
`;

export const MainLayout = styled(MainLayoutBase)``;
