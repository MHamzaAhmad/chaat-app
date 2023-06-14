import { ThemeProvider } from "@emotion/react";
import "./App.css";
import AuthComponent from "./features/auth/auth";
import theme from "./utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <AuthComponent />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
