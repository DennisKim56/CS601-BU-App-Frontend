import { useEffect, useState } from "react";

import CreatePlanCourseContainer from "./CreatePlanCourseContainer";

import Config from "../utility/config";

import "./CreatePlanCreator.css";

const CreatePlanCreator = ({ programDefinition, startTerm, startYear }) => {
  console.log(programDefinition);

  const Schedule = () => {
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
              <div
                id={"slot-" + i / 2}
                className="schedule-row-dropzone"
                key={termPointer + "-" + i}
              >
                <i className="fa-solid fa-circle-plus plus-icon"></i>
              </div>
            );
          }
        })}
      </>
    );
  };
  return (
    <>
      <div className="plan-creator-large-container">
        <div className="plan-creator-schedule-container">
          <Schedule />
        </div>
        <div className="plan-creator-course-container">
          <CreatePlanCourseContainer
            type="required"
            data={programDefinition.requiredCourses}
          />
          {programDefinition?.choiceCount > 0 && (
            <CreatePlanCourseContainer
              type="choice"
              data={programDefinition.choicesCourses}
            />
          )}
          {programDefinition?.electiveCount > 0 && (
            <CreatePlanCourseContainer
              type="elective"
              data={programDefinition.electiveCourses}
            />
          )}
        </div>
      </div>
      <div className="plan-creator-small-container">Please enlarge window</div>
    </>
  );
};

export default CreatePlanCreator;
