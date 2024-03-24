'use client'
import React from 'react'
import { useParamsStore } from '../hooks/useParamsStore'
import Heading from './Heading';
import { Button } from 'flowbite-react';
import { signIn } from 'next-auth/react';

type Props = {
  title?: string,
  subtitle?: string,
  showReset?: boolean,
  showLogin?: boolean,
  callbackurl?: string
}

export default function EmptyFilter({
  title = 'No Matches for this filter',
  subtitle = 'Try changing or resetting the filter',
  showReset,
  showLogin,
  callbackurl
}: Props) {
  const reset = useParamsStore(state => state.reset);

  return (
    <div className='h-[40vh] flex flex-col  gap-2 justify-center items-center shadow-lg'>
      <Heading title={title} subtitle={subtitle} />
      <div className='mt-4'>
        {showReset && (
          <Button outline onClick={reset}>Remove Filters</Button>
        )}
        {showLogin && (
          <Button outline onClick={() => signIn('id-server', { callbackUrl: callbackurl })}>Login</Button>
        )}
      </div>
    </div>
  )
}
