import "./CreatePlanCourseItem.css";

const CreatePlanCourseItem = ({ data, type }) => {
  const containerStyleClass = "create-plan-course-item " + type + "-course";
  return (
    <div className={containerStyleClass} draggable="true">
      <div className="create-plan-course-item-id">{data.courseId}</div>
      <div className="create-plan-course-item-title">{data.title}</div>
    </div>
  );
};

export default CreatePlanCourseItem;
