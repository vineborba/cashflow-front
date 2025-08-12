import { Header } from "./components/Header";
import { AppRouter } from "./Router";

function App() {
  return (
    <main className="flex h-dvh w-dvw flex-col">
      <Header />
      <AppRouter />
    </main>
  );
}

export default App;
