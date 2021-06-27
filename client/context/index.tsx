import React, { Component } from "react";
import { ProviderState } from "../types";
import Context from "./context";

class ContextProvider extends Component<{}, ProviderState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      searchKey: ""
    };
  }

  onSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.setState(() => ({
      searchKey: event.target.value
    }));

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
