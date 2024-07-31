import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = ({color,size,style,position='center'}) => {
    const positions={
        center:{
            top: 0,
            left: 0,
            right:0,
            bottom:0,
        },
        left:{
            top: 0,
            left: 0,
        },
        right:{
            top: 0,
            right:0,
        }
    }
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            ...positions[position],
            margin:'auto',
            ...style,

        }}>
            <CircularProgress size={size}   style={{color:color}}/>
        </Box>
    );
};

export default Loader;
