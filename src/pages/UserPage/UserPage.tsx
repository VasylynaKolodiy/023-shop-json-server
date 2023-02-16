import React, {useEffect} from 'react';
import './UserPage.scss'
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom"
import './UserPage.scss'
import UserAbout from "../../components/UserAbout/UserAbout";
import UserHistory from "../../components/UserHistory/UserHistory";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel, a11yProps} from "../../helpers"

const UserPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    !user.name && navigate('/')
  }, [user])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (
    <main className='userPage'>
      <h2 className='userPage__title'> Hello, {user.name}!</h2>

      <Box
        sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs"
          sx={{borderRight: 1, borderColor: 'divider'}}
        >
          <Tab label="About user" {...a11yProps(0)} />
          <Tab label="Buy history" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <UserAbout user={user}/>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <UserHistory user={user}/>
        </TabPanel>
      </Box>
    </main>
  );
};

export default UserPage;