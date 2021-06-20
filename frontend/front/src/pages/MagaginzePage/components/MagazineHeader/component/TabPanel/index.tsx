/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import { useMediaQuery, Box } from '@material-ui/core';

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

const TabPanel: React.FunctionComponent<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;
  const matches = useMediaQuery('(max-width:1280px)');

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingTop={matches ? 7.5 : 15.625}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
