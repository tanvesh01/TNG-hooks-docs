import { CSS, styled } from '@stitches/react';
import React, { useState } from 'react';

const MainContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '200px 2fr',
  fontFamily: "'Inter', sans-serif",
});

const Sidebar = styled('aside', {
  background: '#151518',
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
  lineHeight: '28px',
  boxShadow:
    'rgb(50 50 93 / 14%) 0px 2px 11px 0px, rgb(0 0 0 / 20%) 0px 1px 3px -1px',
  ...styles,
});

const SidebarItemContainer = styled('ul', {
  paddingLeft: '10px',

  variants: {
    childrenContainer: {
      true: {
        paddingLeft: '9px',
        marginLeft: '13px',
        borderLeft: '2px solid #e3e5eb',
      },
    },
  },
});

const SidebarItem = styled('li', {
  listStyle: 'none',
  padding: '10px',
  borderRadius: 5,
  fontWeight: '600',
  letterSpacing: '-0.02em',
  color: ' #8b8c8e',

  '&:hover': {
    background: '#2b2c31',
  },

  variants: {
    active: {
      true: {
        background: '#2b2c31',
        paddingLeft: '20px',
        color: 'white',
      },
    },
    isHeading: {
      true: {
        fontSize: '1.2rem',
        color: '#626262',
        '&:hover': {
          background: 'none',
        },
      },
    },
  },
});

const SidebarItemWithChildren = ({
  parentLabel,
  children,
  isDefaultOpen = true,
}) => {
  return (
    <div>
      <SidebarItem isHeading>{parentLabel}</SidebarItem>
      <SidebarItemContainer childrenContainer>{children}</SidebarItemContainer>
    </div>
  );
};

const LayoutContainer: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <MainContainer>
      <Sidebar>
        <SidebarItemContainer>
          <SidebarItem active>Introduction</SidebarItem>
          <SidebarItemWithChildren parentLabel={'API'}>
            <SidebarItem>useState</SidebarItem>
            <SidebarItem>useReducer</SidebarItem>
            <SidebarItem>useCallback</SidebarItem>
            <SidebarItem>useEffect</SidebarItem>
          </SidebarItemWithChildren>
        </SidebarItemContainer>
      </Sidebar>
      <MainContentContainer>{children}</MainContentContainer>
    </MainContainer>
  );
};

export default LayoutContainer;
