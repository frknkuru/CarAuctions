'use client'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useParamsStore } from '../hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const setParams = useParamsStore(state => state.setParams);
  const setSearchValue = useParamsStore(state => state.setSearchValue);
  const searchValue = useParamsStore(state => state.searchValue);
  const router = useRouter()
  const pathName = usePathname();

  function onChange(event: any) {
    setSearchValue(event.target.value);
  }

  function search() {
    if (pathName !== '/') { router.push('/') }
    setParams({ searchTerm: searchValue });
  }
  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
      <input
        type='text'
        value={searchValue}
        placeholder='Search by make, model or color'
        onChange={onChange}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') search()
        }}
        className='
          input-custom 
          text-sm
          text-gray-600'
      />
      <button type='button' onClick={search}>
        <FaSearch size={34} className='bg-red-500 text-white rounded-full p-2 cursor-pointer mx-2' />
      </button>
    </div>
  )
}
