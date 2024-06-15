import "./ViewPlanHeader.css";

import Config from "../utility/config";
const deletePlanApiUrl = Config.BACKEND_URL + "/plans";

const ViewPlanHeader = ({ planData, title, logout, setPlanData }) => {
  const handleDelete = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("token")
    );

    const payload = JSON.stringify({
      planId: planData.id,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: payload,
    };

    (async () => {
      const response = await fetch(deletePlanApiUrl, requestOptions);
      if (response.status === 401) {
        logout();
      } else if (response.status === 200) {
        setPlanData([]);
      }
    })();
  };
  return (
    <>
      <div className="plan-view-title">
        <div className="title-text"> {title}</div>
        <div className="delete-plan" onClick={handleDelete}>
          Delete Plan <i className="fa-solid fa-trash"></i>
        </div>
      </div>
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
