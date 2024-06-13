import { useEffect, useRef, useState } from "react";

import "./CreatePlanTermDropZone.css";

const CreatePlanTermDropZone = ({ sequence }) => {
  const elemRef = useRef(null);

  useEffect(() => {
    const thisDiv = elemRef.current;
    // subscribe event
    thisDiv.addEventListener("dragover", handleDragOver);
    thisDiv.addEventListener("dragleave", handleDragLeaveOrDrop);
    thisDiv.addEventListener("drop", handleDrop);
    return () => {
      thisDiv.removeEventListener("dragover", handleDragOver);
      thisDiv.removeEventListener("dragleave", handleDragLeaveOrDrop);
      thisDiv.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeaveOrDrop = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e) => {
    const thisDiv = elemRef.current;
    handleDragLeaveOrDrop(e);
    const dragRefId = e.dataTransfer.getData("id");
    const dragRef = document.getElementById(dragRefId);
    thisDiv.appendChild(dragRef);
    const clone = thisDiv.cloneNode(true);
    const iconElement = clone.querySelector(".plus-icon");
    if (iconElement) {
      iconElement.remove();
    }
    clone.firstChild.classList.remove("dragging");
    thisDiv.replaceWith(clone);
  };

  return (
    <div
      id={"dropzone-" + sequence / 2}
      className="schedule-row-dropzone"
      ref={elemRef}
    >
      <i className="fa-solid fa-circle-plus plus-icon"></i>
    </div>
  );
};

export default CreatePlanTermDropZone;
