import './App.css';
import Recognition from './Components/Recognition/Recognition.jsx';
import {ContactList} from "./Components/ContactList/ContactList";

function App() {
  return (
    <div className="App">
      <Recognition />
        <ContactList />
    </div>
  );
}

export default App;
