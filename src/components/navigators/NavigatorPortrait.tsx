import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Toolbar, Typography } from "@mui/material"
import { RouteType } from "./Navigator"
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavigatorPortrait: React.FC<{routes: RouteType[]}> = ({routes})=>{
    const navigate = useNavigate();
    const location = useLocation();
    const[value, setValue] = useState(0)
    const[open, setOpen] = useState(false)
    const[page, setPage] = useState('')
    function openMenu (){
        setOpen(true);
    }
    function closeMenu (){
        setOpen(false);
    }
    function updatePageName(pageName: string){
        setPage(pageName);
        closeMenu()
    }
    useEffect(() => {
        let index = routes.findIndex(r => r.to === location.pathname);
        if(index < 0){
            index = 0;
        }
        setPage(routes[index].name)
        navigate(routes[index].to)
        setValue(index)
    }, [routes])

    return<Box sx={{display: 'flex', flexDirection: 'row'}} mt={10}>
        <AppBar >
            <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={openMenu}
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
           {page}
          </Typography>
      </Toolbar>
      
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          onClose={closeMenu}
        open = {open}
          sx={{
            display: { xs: 'block', sm: 'none'}
          }}
        >
          <IconButton onClick={closeMenu}>
            <ChevronRightIcon />
          </IconButton>
        <List>
          {routes.map((r, index) => (
            <ListItem key={index} disablePadding >
             <ListItemButton >
             <Tab component={Link} to = {r.to} label= {r.name} onClick={updatePageName.bind(this, r.name)}></Tab>
             </ListItemButton>
            </ListItem>
          ))}
        </List>
        </Drawer>
        <Outlet></Outlet>
    </Box>
}

export default NavigatorPortrait;