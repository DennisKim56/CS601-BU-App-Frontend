import "./ViewFinanceContent.css";

import Config from "../utility/config";

const ViewFinanceContent = ({ planData }) => {
  let termPointer = Config.TERM_SEQUENCE.indexOf(planData?.startingTerm);
  let year = planData.startingYear;

  // In order to enforce logic before the render, decrement start term by one
  if (termPointer !== 0) {
    termPointer--;
  } else {
    termPointer = 5;
    year--;
  }

  let total = 0;

  const sortedPlanData = planData?.courseList?.toSorted(
    (a, b) => a.sequence - b.sequence
  );

  return (
    <>
      <div className="view-finance-grid">
        <div className="view-finance-header">Term</div>
        <div className="view-finance-header">Course Information</div>
        <div className="view-finance-header">Student Fee</div>
        <div className="view-finance-header">Course Fee</div>
        <div className="view-finance-header">Total Fee</div>
        {sortedPlanData.map((course, i) => {
          if (termPointer === 5) {
            termPointer = 0;
            year++;
          } else {
            termPointer++;
          }
          let studentServiceFee = i === 0 || termPointer % 2 === 0 ? 60.0 : 0.0;

          let courseCost;
          const courseNumber = course.course.courseId.slice(-3);
          if (courseNumber < 600) {
            courseCost = 2140;
          } else {
            courseCost = 3820;
          }
          total += studentServiceFee;
          total += courseCost;
          return (
            <>
              <div className="grid-value">
                {Config.TERM_SEQUENCE[termPointer]} {year}
              </div>
              <div className="grid-course-value">
                {course.course.courseId}: {course.course.title}
              </div>
              <div className="grid-value">${studentServiceFee.toFixed(2)}</div>
              <div className="grid-value">
                $
                {courseCost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="grid-value">
                $
                {(courseCost + studentServiceFee).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </div>
            </>
          );
        })}
      </div>
      <div className="total-container">
        <div className="total-label">Total:</div>
        <div className="total-value">
          $
          {total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
    </>
  );
};

export default ViewFinanceContent;
