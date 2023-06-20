import { ThemeProvider } from "@emotion/react";
import "./App.css";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthGuard from "./features/auth/AuthGuard";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <AuthGuard />
          </header>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
