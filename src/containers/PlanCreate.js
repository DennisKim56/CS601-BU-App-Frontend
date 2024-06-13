import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import CreatePlanSelector from "../components/CreatePlanSelector";
import CreatePlanCreator from "../components/CreatePlanCreator";

import "./PlanCreate.css";

import Config from "../utility/config";
const getPlanApiUrl = Config.BACKEND_URL + "/plans";

const PlanCreate = ({ logout, planData, setPlanData }) => {
  const [programDefinition, setProgramDefinition] = useState(null);
  const [startTerm, setStartTerm] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [reset, setReset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("token")
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    (async () => {
      const response = await fetch(getPlanApiUrl, requestOptions);
      if (response.status === 401) {
        navigate("/login");
        logout();
      } else if (response.status === 200 && response.ok) {
        const data = await response.json();
        if (data?.plan?.id) {
          setPlanData(data.plan);
        }
      }
    })();
  }, [logout, navigate, setPlanData]);

  const handleReset = () => {
    setReset(reset + 1);
  };
  return (
    <>
      {planData?.id ? (
        <div className="plan-create-exists">
          <div className="plan-create-exists-message">
            A plan already exists for user.
          </div>
          <Link to="/plan/view" className="plan-create-exists-link">
            View Plan
          </Link>
        </div>
      ) : (
        <div className="create-plan-container">
          <CreatePlanSelector
            setProgramDefinition={setProgramDefinition}
            setStartTerm={setStartTerm}
            setStartYear={setStartYear}
          />
          {programDefinition && startTerm && startYear ? (
            <>
              <div className="plan-controls">
                <div className="plan-submit-btn">Submit</div>
                <div className="plan-reset-btn" onClick={handleReset}>
                  Reset
                </div>
              </div>
              <CreatePlanCreator
                key={programDefinition.id + reset}
                programDefinition={programDefinition}
                startTerm={startTerm}
                startYear={startYear}
              />
            </>
          ) : (
            <div className="create-plan-wait-inputs">
              To get started, select a program, a starting term, and a starting
              year
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PlanCreate;
