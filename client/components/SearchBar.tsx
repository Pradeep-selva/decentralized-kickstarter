import React from "react";
import { Icon, Input } from "semantic-ui-react";
import Context from "../context/context";

const SearchBar = () => {
  const context = React.useContext(Context);
  const [searchKey, setSearchKey] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;

    setSearchKey(value);
    context.onSearch(value);
  };

  return (
    <Input
      icon={<Icon name='search' />}
      iconPosition={"left"}
      placeholder={"Search for a campaign..."}
      value={searchKey}
      name={"searchKey"}
      onChange={handleChange}
      style={{ width: "20vw" }}
    />
  );
};

export default SearchBar;
