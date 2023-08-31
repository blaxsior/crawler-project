import SearchError from "./search-error";

interface SearchErrorProps {
  errors?: string[];
}

const SearchErrors: React.FC<SearchErrorProps> = ({ errors }) => {

  return (
    <ul className="text-center">
      {errors?.map(it => <SearchError errMsg={it} />)}
    </ul>
  )
};

export default SearchErrors;