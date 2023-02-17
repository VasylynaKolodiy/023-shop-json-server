import React, {useEffect} from 'react';
import "./AdminPage.scss"
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabPanel, a11yProps} from "../../helpers"
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import AdminAddNewProduct from "../../components/AdminAddNewProduct/AdminAddNewProduct";
import AdminAddNewCategory from "../../components/AdminAddNewCategory/AdminAddNewCategory";

const AdminPage = () => {

  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    user.role !== 'admin' && navigate('/')
  }, [user])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (
    <main className='adminPage'>

      <h2 className='userPage__title'> Admin page</h2>

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
          <Tab label="Add new product" {...a11yProps(0)} />
          <Tab label="Add new category" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <AdminAddNewProduct />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <AdminAddNewCategory/>

        </TabPanel>
      </Box>

    </main>
  );
};

export default AdminPage;