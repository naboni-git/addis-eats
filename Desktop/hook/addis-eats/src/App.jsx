import { SomeProvider } from "./cart/CartContext";
import Menu from "./Menu";
import "./App.css";

function App() {
  return (
    <SomeProvider>
      <div className="app">
        <header className="header">
          <h1>🍛 Addis Eats</h1>
          <p>Authentic Ethiopian Cuisine</p>
        </header>
        <Menu />
      </div>
    </SomeProvider>
  );
}

export default App;
