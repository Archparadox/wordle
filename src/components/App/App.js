import LettersStatusProvider from "../ContextProviders/LettersStatusProvider/LettersStatusProvider";
import Game from "../Game";
import Header from "../Header";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="game-wrapper">
        <LettersStatusProvider>
          <Game />
        </LettersStatusProvider>
      </div>
    </div>
  );
}

export default App;
