"use server"

import Link from 'next/link';
import { HashIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
export interface HashtagProps {
  tag: string;
  url: string;
}

const HashTag: React.FC<HashtagProps> = ({ tag, url }) => {
  return (
    <li className='w-fit group'>
      <Link href={url} className='flex items-end text-gray-500 group-hover:text-black'>
        <span className='mr-1'>
        <HashIcon className='h-7 w-7 stroke-blue-500 group-hover:stroke-blue-700'/>
        </span>
        {tag}
      </Link>
      <Separator className='h-1 group-hover:bg-gray-400' />
    </li>
  );
}

export default HashTag;