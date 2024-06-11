import CourseItem from "./CourseItem";

const CourseList = ({
  courseData,
  setShowModal,
  setModalTitle,
  setModalContent,
  setModalFooter,
}) => {
  let renderContent;
  if (courseData && courseData.length > 0) {
    renderContent = courseData.map((item) => {
      return (
        <CourseItem
          data={item}
          key={item.courseId}
          setShowModal={setShowModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setModalFooter={setModalFooter}
        />
      );
    });
  } else {
    renderContent = (
      <div className="no-courses-found">No Course Content Found</div>
    );
  }
  return <>{renderContent}</>;
};

export default CourseList;
