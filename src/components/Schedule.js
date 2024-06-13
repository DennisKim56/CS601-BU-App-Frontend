import CreatePlanTermDropZone from "./CreatePlanTermDropZone";

import Config from "../utility/config";

import "./Schedule.css";

const Schedule = ({ programDefinition, startTerm, startYear }) => {
  const totalCourse =
    programDefinition.requiredCount +
    programDefinition.electiveCount +
    programDefinition.choiceCount;
  let termPointer = Config.TERM_SEQUENCE.indexOf(startTerm);
  let year = startYear;
  // In order to enforce logic before the render, decrement start term by one
  if (termPointer !== 0) {
    termPointer--;
  } else {
    termPointer = 5;
    year--;
  }
  return (
    <>
      {Array.from({ length: totalCourse * 2 }, (_, i) => i + 1).map((i) => {
        if (i % 2 !== 0) {
          if (termPointer === 5) {
            termPointer = 0;
            year++;
          } else {
            termPointer++;
          }
          let labelStyle = "schedule-row-container ";
          if (termPointer <= 1) {
            labelStyle += "spring-label";
          } else if (termPointer <= 3) {
            labelStyle += "summer-label";
          } else if (termPointer <= 5) {
            labelStyle += "winter-label";
          }
          return (
            <div className={labelStyle} key={termPointer + "-" + i}>
              <div className="schedule-row-term-label">
                {Config.TERM_SEQUENCE[termPointer]}
              </div>
              <div className="schedule-row-year-label">{year}</div>
            </div>
          );
        } else {
          return (
            <CreatePlanTermDropZone key={termPointer + "-" + i} sequence={i} />
          );
        }
      })}
    </>
  );
};

export default Schedule;
