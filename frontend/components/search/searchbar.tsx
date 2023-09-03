'use client';
import { SearchIcon } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {useDebounce} from 'use-debounce';
import { useRouter } from 'next/navigation';
import { getQueryStrings } from '@/lib/utils';

const SearchBar =  () => {
  const [text, setText] = useState<string>('');
  const [query] = useDebounce(text, 500);
  const router = useRouter();

  useEffect(() => {
    if(query) {
    const qs = getQueryStrings([{key: 'search', value: query}]);
    router.push(`/?${qs}`);
    } 
  }, [query]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  return (
    <div className='flex flex-grow flex-nowrap p-2 border-4 rounded-2xl items-center mx-10 mb-10'>
      <Button 
      className='mr-4 bg-gray-50 hover:bg-sky-100 active:bg-gray-300 rounded-2xl '
      variant='outline'>
        <SearchIcon className='w-8 h-8' />
      </Button>
      <input
        value={text}
        onChange={onChange}
        placeholder='검색'
        className='active:border-0 w-full hover:bg-gray-50 outline-none' />
    </div>
  );
};

export default SearchBar;