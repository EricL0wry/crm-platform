import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import { Typography } from '@material-ui/core';
import OrganizationList from './organization-list';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      marginTop: '14px'
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
      <Typography variant="h4" className={classes.root}>
        Organization
      </Typography>
      <Typography variant="h4">
        Members
      </Typography>
      <OrganizationList orgData={orgData}/>
    </Fragment>
  );
}
