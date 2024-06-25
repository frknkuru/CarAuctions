'use client'

import { Bid } from '@/types';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { ReactNode, useEffect, useState } from 'react'
import { useAuctionStore } from '../hooks/useAuctionStore';

type Props = {
  children: ReactNode
}

export default function SignalRProvider({ children }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
  const apiUrl = process.env.NODE_ENV === 'production' ? 'https://api.carsauctions.com/notifications' : process.env.NEXT_PUBLIC_NOTIFY_URL
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(apiUrl!)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [apiUrl]);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to notification hub');

          connection.on('BidPlaced', (bid: Bid) => {
            console.log('Bid placed event received')
            if (bid.bidStatus.includes('Accepted')) {
              setCurrentPrice(bid.auctionId, bid.amount);
            }
          })
        })
        .catch(error => {
          console.log(error);
        })
    }
    return () => {
      connection?.stop();
    }
  }, [connection, setCurrentPrice])
  return (
    children
  )
}
