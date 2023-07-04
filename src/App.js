import { ThemeProvider } from "@emotion/react";
import "./App.css";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthGuard from "./features/auth/AuthGuard";
import SocketManager from "./contexts/socketContext";
import ApiManager from "./contexts/apiContext";

function App() {
  return (
    <Provider store={store}>
      <ApiManager>
        <SocketManager>
          <ThemeProvider theme={theme}>
            <div className="App">
              <header className="App-header">
                <AuthGuard />
              </header>
            </div>
          </ThemeProvider>
        </SocketManager>
      </ApiManager>
    </Provider>
  );
}

export default App;
