import "./ViewPlanHeader.css";

const ViewPlanHeader = ({ planData, title }) => {
  return (
    <>
      <div className="plan-view-title">{title}</div>
      <div className="plan-view-metadata">
        <div className="plan-metadata">
          <div className="plan-metadata-label">Program:</div>
          <div className="plan-metadata-value">
            {planData?.program?.subject || "Unknown"}
          </div>
        </div>
        <div className="plan-metadata">
          <div className="plan-metadata-label">Concentration:</div>
          <div className="plan-metadata-value">
            {planData?.program?.concentration || "None"}
          </div>
        </div>
        <div className="plan-metadata">
          <div className="plan-metadata-label">Starting Term:</div>
          <div className="plan-metadata-value">
            {planData?.startingTerm || "?"}
          </div>
        </div>
        <div className="plan-metadata">
          <div className="plan-metadata-label">Starting Year:</div>
          <div className="plan-metadata-value">
            {planData?.startingYear || "?"}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPlanHeader;
