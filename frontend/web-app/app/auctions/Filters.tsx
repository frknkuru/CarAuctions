import { Button, ButtonGroup } from 'flowbite-react';
import { pages } from 'next/dist/build/templates/app-page';
import React from 'react'

type Props = {
  pageSize: number;
  setPageSize: (size: number) => void;
}

export const pageSizeButtons = [4, 8, 12]

export default function Filters({ pageSize, setPageSize }: Props) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>
          Page size
          <ButtonGroup>
            {pageSizeButtons.map((value, i) => (
              <Button key={i}
                onClick={() => {
                  setPageSize(value)
                }}
                className='focus:ring-0'
                color={`${pageSize === value ? 'red' : 'gray'}`}
              >
                {value}
              </Button>
            ))}
          </ButtonGroup>
        </span>
      </div>
    </div >
  )
}
