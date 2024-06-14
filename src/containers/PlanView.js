import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import ViewPlanContent from "../components/ViewPlanContent";
import ViewPlanHeader from "../components/ViewPlanHeader";

import "./PlanView.css";

import Config from "../utility/config";
const getPlanApiUrl = Config.BACKEND_URL + "/plans";

const PlanView = ({ logout, planData, setPlanData }) => {
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
        <div className="plan-view-container">
          <ViewPlanHeader planData={planData} title="View Plan" />
          <ViewPlanContent planData={planData} />
        </div>
      ) : (
        <div className="plan-does-not-exist">
          <div className="plan-does-not-exist-message">
            Plan does not exist.
          </div>
          <Link to="/plan/create" className="plan-does-not-exist-link">
            Create Plan
          </Link>
        </div>
      )}
    </>
  );
};

export default PlanView;
