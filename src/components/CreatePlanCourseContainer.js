import CreatePlanCourseItem from "./CreatePlanCourseItem";

import "./CreatePlanCourseContainer.css";

const CreatePlanCourseContainer = ({
  type,
  data,
  choiceCount,
  electiveCount,
}) => {
  if (type === "required") {
    return (
      <div className="schedule-course-container">
        <div className="schedule-course-container-label">
          Required Courses
          <i class="fa-solid fa-eye-slash"></i>
        </div>
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
        <div className="schedule-course-container-label">
          Elective Courses ({electiveCount})
          <i class="fa-solid fa-eye-slash"></i>
        </div>
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
        <div className="schedule-course-container-label">
          Choose a Course ({choiceCount})<i class="fa-solid fa-eye-slash"></i>
        </div>
        {data.map((choice) => {
          return <ChoiceComponent choice={choice} key={choice.id} />;
        })}
      </div>
    );
  }
};

const ChoiceComponent = ({ choice }) => {
  return (
    <div className="course-choice-container">
      <div className="course-choice-course">
        <CreatePlanCourseItem data={choice.choice1} type="choice" />
      </div>
      <div className="course-choice-separator">or</div>
      <div className="course-choice-course">
        <CreatePlanCourseItem data={choice.choice2} type="choice" />
      </div>
    </div>
  );
};
export default CreatePlanCourseContainer;
