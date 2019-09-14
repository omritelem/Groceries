import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import './CopyWrite.css';

const copyright = ({ color }) => {
    return (
        <Typography className="CopyWrite" variant="body2" color={color} align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.Grosharies.com/">
                www.Grosharies.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default copyright;
