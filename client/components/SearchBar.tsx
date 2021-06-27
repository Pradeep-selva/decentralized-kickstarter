import React from "react";
import { Icon, Input } from "semantic-ui-react";
import Context from "../context/context";

const SearchBar = () => {
  const context = React.useContext(Context);

  return (
    <Input
      icon={<Icon name='search' />}
      iconPosition={"left"}
      placeholder={"Search for a campaign..."}
      value={context.searchKey}
      name={"searchKey"}
      onChange={context.onSearch}
      style={{ width: "20vw" }}
    />
  );
};

export default SearchBar;
