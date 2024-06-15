import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import ViewFinanceContent from "../components/ViewFinanceContent";
import ViewFinanceHeader from "../components/ViewPlanHeader";

import "./FinanceView.css";

import Config from "../utility/config";
const getPlanApiUrl = Config.BACKEND_URL + "/plans";

const FinanceView = ({ logout, planData, setPlanData }) => {
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
          <ViewFinanceHeader
            planData={planData}
            title="View Plan Finance"
            logout={logout}
            setPlanData={setPlanData}
          />
          <ViewFinanceContent planData={planData} />
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

export default FinanceView;
