import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate()

    

    useEffect(()=>{
        if(value === 0) navigate('/home')
        else if (value === 1) navigate('/edit')
        else if (value === 2) navigate('/sort')
        else if (value === 3) navigate('/search')      
    },[value,navigate]
    
    )

    return (
        <Box sx={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            backgroundColor: '#2d313a',
            zindex: 100,
        }}>

            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    navigate("/" + newValue)
                }}
            >
                <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Edit" value="edit" icon={<EditIcon />} />
                {/* <BottomNavigationAction label="Sort" value="sort" icon={<SortIcon />} /> */}
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />

            </BottomNavigation>
        </Box>
    );
}