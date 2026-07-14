import "./App.css";
import { UserProvider } from "./context/usercontext.tsx";
import { AppRouter } from "./Router/Router.tsx";

export function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}
