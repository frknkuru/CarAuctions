"use server";
import { Auction, PagedResult } from "@/types";
import { fetchWrapper } from "@/lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  return await fetchWrapper.get(`search/${query}`);
}

export async function UpdateAuctionTest() {
  const auctionid = "6a5011a1-fe1f-47df-9a32-b5346b289391";
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };

  return await fetchWrapper.post(`auctions/${auctionid}`, data);
}
