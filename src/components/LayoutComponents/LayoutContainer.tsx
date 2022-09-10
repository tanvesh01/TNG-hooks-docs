import { CSS, styled } from '@stitches/react';
import React from 'react';

const MainContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '200px 2fr',
});

const Sidebar = styled('aside', {
  background: '#f9fcff',
  height: '100%',
});

const styles: CSS = {
  '& a': {
    borderBottom: '1px solid #0c7acc70',
    textDecoration: 'none',
    color: '#0c7acc',
    fontWeight: 600,
    transition: 'all 150ms ease 0s',

    '&:hover': {
      borderColor: '#0c7acc',
      borderWidth: '2px',
    },
  },

  '& code': {
    border: '1px solid #e3e3e3',
    boxShadow: 'rgb(0 0 0 / 4%) 0px 2px 0px',
    padding: '1px 3px',
    borderRadius: '4px',
    background: 'rgb(164 207 255 / 10%)',
    fontFamily: 'JetBrains Mono',
    margin: '0 3px',
    color: '#005076',
  },
  '& strong': {
    fontWeight: 600,
  },
  '& h2': {
    letterSpacing: '-0.02em',
    fontSize: '3.5rem',
  },
  '& h3': {
    letterSpacing: '-0.02em',
    fontSize: '2rem',
  },
};

const MainContentContainer = styled('div', {
  padding: '5px 33px',
  margin: '15px',
  backgroundColor: 'White',
  borderRadius: '10px',
  fontFamily: "'Inter', sans-serif",
  lineHeight: '28px',
  boxShadow:
    'rgb(50 50 93 / 14%) 0px 2px 11px 0px, rgb(0 0 0 / 20%) 0px 1px 3px -1px',
  ...styles,
});

const LayoutContainer: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <MainContainer>
      <Sidebar />
      <MainContentContainer>{children}</MainContentContainer>
    </MainContainer>
  );
};

export default LayoutContainer;
