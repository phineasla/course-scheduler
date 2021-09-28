import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Timetable } from "./components/Timetable";

function App() {
  return (
    <div className="App">
      <header className="App-header border">
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-2">
          <div className="flex-row font-semibold text-xl">
            <div>Course Scheduler</div>
          </div>
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </nav>
      </header>
      <body>
        <Timetable />
      </body>
      <footer></footer>
    </div>
  );
}

export default App;
