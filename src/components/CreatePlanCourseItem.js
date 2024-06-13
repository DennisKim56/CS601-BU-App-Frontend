import { useEffect, useRef } from "react";

import "./CreatePlanCourseItem.css";

const CreatePlanCourseItem = ({ data, type }) => {
  const elemRef = useRef(null);

  useEffect(() => {
    const thisDiv = elemRef.current;
    // subscribe event
    thisDiv.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("id", data.id);
      event.target.classList?.add("dragging");
      event.stopPropagation();
    });

    thisDiv.addEventListener("dragend", (event) => {
      event.target.classList?.remove("dragging");
    });
  }, []);

  const containerStyleClass = "create-plan-course-item " + type + "-course";
  return (
    <div
      id={data.id}
      className={containerStyleClass}
      draggable="true"
      ref={elemRef}
    >
      <div className="create-plan-course-item-id">{data.courseId}</div>
      <div className="create-plan-course-item-title">{data.title}</div>
    </div>
  );
};

export default CreatePlanCourseItem;
