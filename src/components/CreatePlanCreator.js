import CreatePlanCourseContainer from "./CreatePlanCourseContainer";
import Schedule from "./Schedule";

import "./CreatePlanCreator.css";

const CreatePlanCreator = ({
  programDefinition,
  startTerm,
  startYear,
  addCourse,
  planCourseList,
}) => {
  return (
    <>
      <div className="plan-creator-large-container">
        <div className="plan-creator-schedule-container">
          <Schedule
            programDefinition={programDefinition}
            startTerm={startTerm}
            startYear={startYear}
            addCourse={addCourse}
            planCourseList={planCourseList}
          />
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
              choiceCount={programDefinition.choiceCount}
            />
          )}
          {programDefinition?.electiveCount > 0 && (
            <CreatePlanCourseContainer
              type="elective"
              data={programDefinition.electiveCourses}
              electiveCount={programDefinition.electiveCount}
            />
          )}
        </div>
      </div>
      <div className="plan-creator-small-container">Please enlarge window</div>
    </>
  );
};

export default CreatePlanCreator;
