import { useEffect, useState } from "react";

import "./CreatePlanSelector.css";

import Config from "../utility/config";
const getProgramApiUrl = Config.BACKEND_URL + "/programs/all";
const getProgramDefinitionApiUrl =
  Config.BACKEND_URL + "/programdefinitions/byId";

const YEAR_SEQUENCE = [];
const currentYear = new Date().getFullYear();
for (let i = currentYear - 7; i < currentYear + 10; i++) {
  YEAR_SEQUENCE.push(i);
}

const CreatePlanSelector = ({
  setProgramDefinition,
  setStartTerm,
  setStartYear,
  setPlanCourseList,
}) => {
  const [programId, setProgramId] = useState();
  const [programList, setProgramList] = useState([]);

  const handleProgramSelect = (e) => {
    setProgramId(e.target.value);
    setPlanCourseList([]);
  };

  const handleStartTermSelect = (e) => {
    setStartTerm(e.target.value);
  };

  const handleStartYearSelect = (e) => {
    setStartYear(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(getProgramApiUrl);
      const data = await response.json();
      if (data?.programs?.length > 0) {
        const etlData = organizeData(data.programs);
        setProgramList(etlData);
      }
    })();
  }, []);

  useEffect(() => {
    if (programId) {
      (async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const payload = JSON.stringify({
          programId: programId,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: payload,
        };

        const response = await fetch(
          getProgramDefinitionApiUrl,
          requestOptions
        );
        const data = await response.json();
        if (data.programDefinition) {
          setProgramDefinition(data.programDefinition);
        }
      })();
    }
  }, [programId]);

  const organizeData = (dataList) => {
    const newData = dataList.map((program) => {
      const programAcronym = program.subject
        .split(" ")
        .map((word) => word[0])
        .join("");
      if (program.concentration) {
        return {
          id: program.id,
          label: program.concentration + " (" + programAcronym + ")",
        };
      }
      return {
        id: program.id,
        label: program.subject + " (" + programAcronym + ")",
      };
    });
    return newData;
  };

  return (
    <div className="create-plan-selector-container">
      <div className="selector-container">
        <label className="selector-form-label">Program</label>
        <select
          className="selector-form-input"
          onChange={handleProgramSelect}
          defaultValue="default"
        >
          <option hidden disabled value="default">
            -- Select A Program --
          </option>
          {programList.map((program) => (
            <option value={program.id} key={program.id}>
              {program.label}
            </option>
          ))}
        </select>
      </div>
      <div className="selector-container">
        <label className="selector-form-label">Starting Term</label>
        <select
          className="selector-form-input"
          onChange={handleStartTermSelect}
          defaultValue="default"
        >
          <option hidden disabled value="default">
            -- Select A Term --
          </option>
          {Config.TERM_SEQUENCE.map((term) => (
            <option value={term} key={term}>
              {term}
            </option>
          ))}
        </select>
      </div>
      <div className="selector-container">
        <label className="selector-form-label">Starting Year</label>
        <select
          className="selector-form-input"
          onChange={handleStartYearSelect}
          defaultValue="default"
        >
          <option hidden disabled value="default">
            -- Select A Year --
          </option>
          {YEAR_SEQUENCE.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CreatePlanSelector;
