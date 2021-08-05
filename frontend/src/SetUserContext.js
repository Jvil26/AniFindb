import { createContext } from "react";

const SetUserContext = createContext();

export const SetUserProvider = SetUserContext.Provider;
export const SetUserConsumer = SetUserContext.Consumer;

export default SetUserContext;
