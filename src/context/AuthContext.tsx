import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

// type
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => Promise<void>;
}
