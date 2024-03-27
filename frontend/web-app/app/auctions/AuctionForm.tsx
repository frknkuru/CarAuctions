'use client'
import { Button } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { usePathname, useRouter } from 'next/navigation';
import { createAuction, updateAuction } from '../actions/auctionActions';
import toast from 'react-hot-toast';
import { Auction } from '@/types';


type Props = {
  auction?: Auction
}

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onTouched'
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus('make')
  }, [setFocus])

  async function onSubmit(data: FieldValues) {
    try {
      let id = '';
      let res;
      if (pathname === '/auctions/create/') {
        const res = await createAuction(data);
        id = res.id;
      }
      else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`)
    }
    catch (error: any) {
      toast.error(error.status + ' ' + error.message);
    }
  };

  return (
    <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
      <Input label='Make' name='make' control={control} rules={{ required: 'Make is Required' }} />
      <Input label='Model' name='model' control={control} rules={{ required: 'Model is Required' }} />
      <Input label='Color' name='color' control={control} rules={{ required: 'Color is Required' }} />

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Year' name='year' control={control} type='number' rules={{ required: 'Year is Required' }} />
        <Input label='Mileage' name='mileage' control={control} type='number' rules={{ required: 'Mileage is Required' }} />
      </div>
      {pathname === '/auctions/create' &&
        <>
          <Input label='Image URL' name='imageUrl' control={control} rules={{ required: 'Image URL is Required' }} />

          <div className='grid grid-cols-2 gap-3'>
            <Input label='Reserve price (enter 0 if no reserve)' name='reservePrice' control={control} type='number' rules={{ required: 'Reserve price is Required' }} />
            <DateInput label='Auction end date/time' name='auctionEnd' control={control} rules={{ required: 'Auction end date/time is Required' }} dateFormat='dd MMMM yyyy h:mm a' showTimeSelect />
          </div>
        </>
      }


      <div className='flex justify-between'>
        <Button outline color='gray'>Cancel</Button>
        <Button
          outline color='success'
          isProcessing={isSubmitting}
          disabled={!isValid}
          type='submit'
        >
          Submit</Button>
      </div>
    </form>
  )
}
