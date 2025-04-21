import { createContext } from "react";

const tempUser: User = {
    name: "t user",
    password: "t pass",
    email: "t email"
  };
  const temp: Session = {
    name: "test",
    date: new Date(),
    users: [
      tempUser
    ]
  };

export const SessionContext = createContext<Session>(temp);