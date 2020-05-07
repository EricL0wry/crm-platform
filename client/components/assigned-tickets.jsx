import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import TicketList from './ticket-list';

export default function AssignedTickets() {
  const context = useContext(AppContext);
  const [tickets, setTickets] = useState(null);
  const id = context.getUser().userId;

  useEffect(() => {
    fetch('/api/assignedtickets/' + { id })
      .then(res => res.json())
      .then(data => {
        setTickets(data);
      }).catch(error => console.log(error));
  }, []);

}
