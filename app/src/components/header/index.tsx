import { darkTheme, ThemeProvider, screen } from '@nebula-js/ui';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { DesktopHeader } from './desktop';
import { MobileHeader } from './mobile';

export function Header() {
  const isMobile = useMediaQuery({ maxWidth: screen.tablet.max });
  return (
    <ThemeProvider theme={darkTheme} injectFirst={false}>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </ThemeProvider>
  );
}
