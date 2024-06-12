import CreatePlanCourseItem from "./CreatePlanCourseItem";

import "./CreatePlanCourseContainer.css";

const CreatePlanCourseContainer = ({ type, data }) => {
  console.log(data);
  if (type === "required") {
    return (
      <div className="schedule-course-container">
        <div className="schedule-course-container-label">Required Courses</div>
        <div className="schedule-course-container-grid">
          {data.map((course) => {
            return (
              <CreatePlanCourseItem
                key={course.courseId}
                data={course}
                type="required"
              />
            );
          })}
        </div>
      </div>
    );
  } else if (type === "elective") {
    return (
      <div className="schedule-course-container">
        <div className="schedule-course-container-label">Elective Courses</div>
        <div className="schedule-course-container-grid">
          {data.map((course) => {
            return (
              <CreatePlanCourseItem
                key={course.courseId}
                data={course}
                type="elective"
              />
            );
          })}
        </div>
      </div>
    );
  } else if (type === "choice") {
    return (
      <div className="schedule-course-container">
        <div className="schedule-course-container-label">Choose a Course</div>
        {data.map((choice) => {
          return <ChoiceComponent choice={choice} />;
        })}
      </div>
    );
  }
};

const ChoiceComponent = ({ choice }) => {
  return (
    <div className="course-choice-container">
      <CreatePlanCourseItem data={choice.choice1} type="choice" />
      <div className="course-choice-separator">or</div>
      <CreatePlanCourseItem data={choice.choice2} type="choice" />
    </div>
  );
};
export default CreatePlanCourseContainer;
