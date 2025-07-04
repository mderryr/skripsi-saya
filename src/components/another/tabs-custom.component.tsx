'use client'

// components/CustomTabs/index.tsx
import { useState, ReactNode } from 'react';
import Box from '@mui/material/Box';
import {StyledTabs,StyledTab} from '@/styles/stlyle-tabs'

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface TabItem {
  label: string;
  content: ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  variant?: "fullWidth" | "standard" | "scrollable";
  scrollButtons?: boolean;
  defaultValue?: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`custom-tabpanel-${index}`}
    aria-labelledby={`custom-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 1 }}> {/* Ubah padding di sini */}
        {children}
      </Box>
    )}
  </div>
  );
}

export default function CustomTabs({
  tabs,
  variant = "fullWidth",
  scrollButtons = false,
  defaultValue = 0
}: CustomTabsProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' } } > 
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant={variant}
          scrollButtons={scrollButtons}
          aria-label="custom tabs"
        >
          {tabs.map((tab, index) => (
            <StyledTab
              key={index}
              label={tab.label}
              id={`custom-tab-${index}`}
              aria-controls={`custom-tabpanel-${index}`}
            />
          ))}
        </StyledTabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}