import React from "react";
import { Icon, Input } from "semantic-ui-react";

const SearchBar = () => {
  const [searchKey, setSearchKey] = React.useState("");

  return (
    <Input
      icon={<Icon name='search' />}
      iconPosition={"left"}
      placeholder={"Search for a campaign..."}
      value={searchKey}
      name={"searchKey"}
      onChange={({ target: { value } }) => setSearchKey(value)}
      style={{ width: "20vw" }}
    />
  );
};

export default SearchBar;
