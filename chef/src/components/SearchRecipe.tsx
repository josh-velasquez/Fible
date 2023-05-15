import React, { useState } from "react";
import { Container, Grid, Header, Search, Segment } from "semantic-ui-react";

const SearchRecipe: React.FC = () => {
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const onResultSelect = () => {
    console.log("SELECTED");
  };

  const handleSearchChange = React.useCallback(() => {
    console.log("Search change");
  }, []);

  return (
    <Search
      size="mini"
      loading={false}
      placeholder="Search recipe..."
      onResultSelect={onResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
    />
  );
};
export default SearchRecipe;
