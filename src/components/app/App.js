import Display from "../display/Display";
import Numpad from "../numpad/Numpad";
import './App.scss'


function App() {
    return <div className="calculator d-flex flex-column">
        <Display/>
        <Numpad/>
    </div>
}

export default App;