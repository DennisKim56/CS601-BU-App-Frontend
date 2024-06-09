import CourseItem from "./CourseItem";

const CourseList = ({ courseData }) => {
  let renderContent;
  if (courseData && courseData.length > 0) {
    renderContent = courseData.map((item) => {
      return <CourseItem data={item} key={item.courseId} />;
    });
  } else {
    renderContent = <h2>No Course Content Found</h2>;
  }
  return <div className="course-container">{renderContent}</div>;
};

export default CourseList;
