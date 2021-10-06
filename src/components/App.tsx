import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Timetable } from "./Timetable";

function App() {
  return (
    <>
      <header>
        <nav>
          <div className="title">
            {/* <svg
              className="logo"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg> */}
            {/* <img className="logo" src={logo} alt="Logo" /> */}
            <span>Course Scheduler</span>
          </div>
          <a
            className="github"
            href="https://github.com/phineasla/course-scheduler"
          >
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </nav>
      </header>
      <Timetable />
    </>
  );
}

export default App;
