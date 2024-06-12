import { useEffect, useState } from "react";

import ProgramTile from "../components/ProgramTile";

import "./ProgramView.css";

import Config from "../utility/config";
const programApiUrl = Config.BACKEND_URL + "/programs/all";

const ProgramView = () => {
  const [programData, setProgramData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(programApiUrl);
      const data = await response.json();
      if (data?.programs?.length > 0) {
        const etlData = organizeData(data.programs);
        setProgramData(etlData);
      }
    })();
  }, []);

  const organizeData = (programList) => {
    const programObject = {};
    programList.forEach((program) => {
      if (programObject[program.subject]) {
        if (program.concentration) {
          programObject[program.subject].concentrations.push({
            topic: program.concentration,
            url: program.url,
          });
        } else {
          programObject[program.subject].url = program.url;
        }
      } else {
        if (program.concentration) {
          programObject[program.subject] = {
            concentrations: [
              {
                topic: program.concentration,
                url: program.url,
              },
            ],
          };
        } else {
          programObject[program.subject] = {
            concentrations: [],
            url: program.url,
          };
        }
      }
    });
    return programObject;
  };
  return (
    <>
      <div className="program-view-title">
        Computer Science & Technology Programs
      </div>
      {Object.keys(programData).length > 0 ? (
        <div className="program-container">
          {Object.keys(programData)
            .sort(
              (a, b) =>
                programData[b].concentrations?.length -
                programData[a].concentrations?.length
            )
            .map((programTitle) => (
              <ProgramTile
                label={programTitle}
                data={programData[programTitle]}
                key={programTitle}
              />
            ))}
        </div>
      ) : (
        <div className="no-data-available">
          No Program Data Available. Please Try Again Later.
        </div>
      )}
    </>
  );
};

export default ProgramView;
