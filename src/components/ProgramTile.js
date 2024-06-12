import { Link } from "react-router-dom";

import "./ProgramTile.css";

const programIcons = {
  "Health Informatics": "fa-solid fa-laptop-medical program-icon",
  "Software Development": "fa-solid fa-laptop-code program-icon",
  "Applied Data Analytics": "fa-solid fa-database program-icon",
  "Computer Information Systems": "fa-solid fa-network-wired program-icon",
};

const ProgramTile = ({ label, data }) => {
  return (
    <div className="program-tile">
      <Link
        to={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="program-tile-link"
      >
        <div className="program-tile-title">{label}</div>
        <i className={programIcons[label]}></i>
      </Link>
      {data.concentrations?.length > 0
        ? data.concentrations.map((subject) => {
            return (
              <Link
                to={subject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="program-tile-link"
              >
                <div className="program-tile-concentration">
                  {subject.topic}
                </div>
              </Link>
            );
          })
        : ""}
    </div>
  );
};

export default ProgramTile;
