import React, { Component } from "react";
import { ProviderState } from "../types";
import { debounce } from "../utils";
import Context from "./context";

class ContextProvider extends Component<{}, ProviderState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      searchKey: ""
    };
  }

  onSearch = debounce(
    (searchKey) =>
      this.setState(() => ({
        searchKey
      })),
    300
  );

  render() {
    const {
      onSearch,
      state: { searchKey }
    } = this;

    return (
      <Context.Provider
        value={{
          searchKey,
          onSearch
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ContextProvider;
