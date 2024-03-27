'use client'
import { Button } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';
import DateInput from '../components/DateInput';
import { useRouter } from 'next/navigation';
import { createAuction } from '../actions/auctionActions';
import toast from 'react-hot-toast';

export default function AuctionForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onTouched'
  });

  useEffect(() => {
    setFocus('make')
  }, [setFocus])

  async function onSubmit(data: FieldValues) {
    try {
      const res = await createAuction(data);
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${res.id}`)
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
      <Input label='Image URL' name='imageUrl' control={control} rules={{ required: 'Image URL is Required' }} />

      <div className='grid grid-cols-2 gap-3'>
        <Input label='Reserve price (enter 0 if no reserve)' name='reservePrice' control={control} type='number' rules={{ required: 'Reserve price is Required' }} />
        <DateInput label='Auction end date/time' name='auctionEnd' control={control} rules={{ required: 'Auction end date/time is Required' }} dateFormat='dd MMMM yyyy h:mm a' showTimeSelect />
      </div>


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
