import React from "react";
import { ContextType } from "../types";

const Context = React.createContext<ContextType | undefined>(undefined);

export default Context;
