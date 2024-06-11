import "./CourseItem.css";

const CourseItem = ({
  data,
  setShowModal,
  setModalTitle,
  setModalContent,
  setModalFooter,
}) => {
  const handleClick = () => {
    setModalTitle({ title: data.title, courseId: data.courseId });
    setModalContent(data.description);
    if (data.requirements) {
      setModalFooter(data.requirements);
    }
    setShowModal(true);
  };
  return (
    <div className="course-item-grid-item" onClick={handleClick}>
      <div className="course-item-container shadow">
        <div className="course-item-title">{data.title}</div>
        <div className="course-item-id">{data.courseId}</div>
      </div>
    </div>
  );
};

export default CourseItem;
