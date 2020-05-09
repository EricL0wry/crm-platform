import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/Icon';

export default function MapDialog(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton>{props.icon}</IconButton>
      {/* <Dialog>

      <Dialog /> */}
    </div>
  );
}
