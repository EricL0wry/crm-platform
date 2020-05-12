import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import { Typography } from '@material-ui/core';
import OrganizationList from './organization-list';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    icon: {
      color: theme.palette.primary.light
    }
  };
});

export default function Organization() {
  const context = useContext(AppContext);
  const userId = context.getUser().userId;
  const [orgData, setOrgData] = useState([]);
  const classes = useStyles();

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
          <Typography variant="h4">
            Organization Members
          </Typography>
        </Box>
        <Box mr={1}>
          <Link to="/organization/newuser">
            <IconButton className={classes.icon}>add_circle</IconButton>
          </Link>
        </Box>
      </Box>
      <OrganizationList orgData={orgData} />
    </Fragment>
  );
}
