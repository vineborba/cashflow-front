import { Header } from "./components/Header";
import { AppRouter } from "./Router";

function App() {
  return (
    <main className="w-dvw h-dvh flex flex-col">
      <Header />
      <AppRouter />
    </main>
  );
}

export default App;
