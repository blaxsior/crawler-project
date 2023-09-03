import SearchBar from '@/components/search/searchbar';
import SearchErrors from '@/components/search/search-errors';
import TagList from '@/components/search/TagList';
import { getDefaultTag, getRelevantTag } from '@/api/search';

type SearchPageProps = {
  searchParams: {
    search?: string
  }
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const { search } = searchParams;
  let tags;
  if (search) { // 
    // tags = await getRelevantTag();
  } else {
    // tags = await getDefaultTag();
  }

  tags = [{ tag: 'hash', url: '/details' }, { tag: 'hash2', url: '/details' }]
  //TODO: fetch 이용하여 검색 결과 가져오는 로직 구현.
  //필요하면 use client 사용

  return (
    <div className='pt-20 lg:px-40 sm:pt-20 h-full'>
      <SearchBar />
      <SearchErrors errors={["hello", "worlds"]} />
      <TagList
        tagInfos={tags}
      />
    </div>
  );
}
export default SearchPage;