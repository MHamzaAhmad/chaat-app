import { ThemeProvider } from "@emotion/react";
import "./App.css";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthGuard from "./features/auth/AuthGuard";
import ContextManager from "./contexts/manager";

function App() {
  return (
    <Provider store={store}>
      <ContextManager>
        <ThemeProvider theme={theme}>
          <div className="App">
            <header className="App-header">
              <AuthGuard />
            </header>
          </div>
        </ThemeProvider>
      </ContextManager>
    </Provider>
  );
}

export default App;
