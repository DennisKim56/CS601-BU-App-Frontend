import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import CreatePlanSelector from "../components/CreatePlanSelector";
import CreatePlanCreator from "../components/CreatePlanCreator";

import "./PlanCreate.css";

import Config from "../utility/config";
const getPlanApiUrl = Config.BACKEND_URL + "/plans";

const TERM_SEQUENCE = [
  "Spring 1",
  "Spring 2",
  "Summer 1",
  "Summer 2",
  "Fall 1",
  "Fall 2",
];

const PlanCreate = ({ logout, planData, setPlanData }) => {
  const [programDefinition, setProgramDefinition] = useState({});
  const [startTerm, setStartTerm] = useState({});
  const [startYear, setStartYear] = useState({});
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
            TERM_SEQUENCE={TERM_SEQUENCE}
          />
          <CreatePlanCreator
            programDefinition={programDefinition}
            startTerm={startTerm}
            startYear={startYear}
          />
        </div>
      )}
    </>
  );
};

export default PlanCreate;
