import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import MenuAppBar from './menu-app-bar';

export default function Organization() {
  const context = useContext(AppContext);
  const userId = context.getUser().userId;

  return (
    <Fragment>
      <MenuAppBar />
    </Fragment>
  );
}
