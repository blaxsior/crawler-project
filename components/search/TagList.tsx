
import { cn } from "@/lib/utils";
import HashTag, { HashtagProps } from "./hash-tag";


const TagList: React.FC<{ tagInfos?: HashtagProps[], className?: string }> = ({ tagInfos, className }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center", className)}>
      <h2>Tag List</h2>
      <ul className='flex gap-2 '>
        {tagInfos?.map(tagInfo => <HashTag {...tagInfo} />)}
      </ul>
    </div>
  );
}

export default TagList;