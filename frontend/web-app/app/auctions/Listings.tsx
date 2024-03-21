'use client'

import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import { Auction } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters, { pageSizeButtons } from './Filters';

export default function Listings() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeButtons[0]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(pageNumber, pageSize);
      setAuctions(data.results);
      setPageCount(data.pageCount);
    };

    fetchData();
  }, [pageNumber, pageSize]);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageNumber(1); // Reset to page 1 every time the page size changes
  };

  return (
    <>
      <Filters
        pageSize={pageSize}
        setPageSize={handlePageSizeChange} />
      <div className='grid grid-cols-4 gap-6'>
        {auctions.map(auction => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination pageChanged={setPageNumber} currentPage={pageNumber} pageCount={pageCount} />
      </div>
    </>
  );
}
