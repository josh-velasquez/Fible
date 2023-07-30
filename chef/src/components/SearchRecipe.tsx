import React, { useState } from "react";
import { Search, SearchProps, SearchResultData } from "semantic-ui-react";
import _ from "lodash";
import recipeList from "../samplePayload.json";

const SearchRecipe: React.FC = () => {
  const [results, setResults] = useState<string[]>();
  const [value, setValue] = useState("");
  const [recipe, setRecipe] = useState<Object>();
  const onResultSelect = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: SearchResultData
  ) => {
    if (data.result !== undefined) {
      setRecipe(data.result);
    }
  };

  const handleSearchChange = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
      if (data.value !== undefined || data.value !== "") {
        setValue(data.value ?? "");
        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = (result: Object) => {
          const recipeJson = JSON.parse(JSON.stringify(result));
          return (
            re.test(recipeJson.name) ||
            re.test(recipeJson.description) ||
            re.test(recipeJson.tags)
          );
        };
        const recipeJson = JSON.parse(
          JSON.stringify(recipeList.data.recipeList)
        );
        const result = _.filter(recipeJson, isMatch);
        setResults(result);
      }
    },
    [setResults, setValue]
  );

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
