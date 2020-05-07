import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import TicketList from './ticket-list';

export default function AssignedTickets() {
  const context = useContext(AppContext);
  const [ticketList, setTicketList] = useState([]);
  const id = context.getUser().userId;

  useEffect(() => {
    fetch('/api/tickets/' + id)
      .then(res => res.json())
      .then(data => {
        setTicketList(data);
      })
      .catch(error => console.error(error));
  }, []);

  if (ticketList !== null) {
    return (
      <Fragment>
        <TicketList tickets={ticketList}/>
      </Fragment>
    );
  } else {
    return null;
  }

}
