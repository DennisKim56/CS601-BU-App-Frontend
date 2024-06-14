import "./ViewPlanContent.css";

import Config from "../utility/config";

const ViewPlanContent = ({ planData }) => {
  let termPointer = Config.TERM_SEQUENCE.indexOf(planData?.startingTerm);
  let year = planData.startingYear;

  // In order to enforce logic before the render, decrement start term by one
  if (termPointer !== 0) {
    termPointer--;
  } else {
    termPointer = 5;
    year--;
  }
  const sortedPlanData = planData?.courseList?.toSorted(
    (a, b) => a.sequence - b.sequence
  );
  return (
    <div className="plan-view-grid">
      {sortedPlanData.map((course) => {
        if (termPointer === 5) {
          termPointer = 0;
          year++;
        } else {
          termPointer++;
        }
        let labelStyle = "view-plan-term-title";
        if (termPointer <= 1) {
          labelStyle += " view-plan-spring-label";
        } else if (termPointer <= 3) {
          labelStyle += " view-plan-summer-label";
        } else if (termPointer <= 5) {
          labelStyle += " view-plan-winter-label";
        }
        return (
          <div className="view-plan-course-container" key={course.id}>
            <div className={labelStyle}>
              {Config.TERM_SEQUENCE[termPointer]} {year}
            </div>
            <div className="view-plan-course-content-container">
              <div className="view-plan-course-id">
                {course.course.courseId}
              </div>
              <div className="view-plan-course-title">
                {course.course.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewPlanContent;
