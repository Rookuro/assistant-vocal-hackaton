import './App.css';
import Recognition from './Components/Recognition/Recognition.jsx';
import {ContactList} from "./Components/ContactList/ContactList";
import {NewContactForm} from "./Components/NewContactForm/NewContactForm";

function App() {
  return (
    <div className="App">
      <Recognition />
        <ContactList />
        <NewContactForm />
    </div>
  );
}

export default App;
