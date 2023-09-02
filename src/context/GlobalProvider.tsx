"use client";
import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Topnav from "@/app/_components/topnav/Topnav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showSider: boolean;
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

const queryClient = new QueryClient();

const getSearchResult = async (query: string) => {};
const Providers = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSider, setShowSidebar] = useState(false);

  const searchContextValue: SearchContextProps = {
    searchTerm,
    setSearchTerm,
    showSider,
    setShowSidebar,
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SearchContext.Provider value={searchContextValue}>
          <Toaster />
          <Topnav />
          {children}
        </SearchContext.Provider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
