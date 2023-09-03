import { useId } from "react";

const SearchError: React.FC<{errMsg: string}> = ({errMsg}) => {
  const id = useId();
  return (
    <li key={id}>{errMsg}</li>
  )
};

export default SearchError;