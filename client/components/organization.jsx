import React, { Fragment, useContext, useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import AppContext from '../lib/context';

import OrganizationList from './organization-list';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  titleStyles: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5)
  }
}));

export default function Organization() {
  const context = useContext(AppContext);
  const classes = useStyles();
  const userId = context.getUser().userId;
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    fetch(`/api/org/${userId}`)
      .then(response => response.json())
      .then(data => {
        setOrgData(data);
      })
      .catch(error => console.error('unable to fetch customer data', error));
  }, []);

  return (
    <Fragment>
      <Box display='flex' alignItems='center'>
        <Box p={0} flexGrow={1}>
          <Typography className={classes.titleStyles}
            variant="h4">
            Organization Members
          </Typography>
        </Box>
        <Box mr={1.5}>
          <Link to="/organization/newuser">
            <IconButton>add_circle</IconButton>
          </Link>
        </Box>
      </Box>
      <OrganizationList orgData={orgData} />
    </Fragment>
  );
}
