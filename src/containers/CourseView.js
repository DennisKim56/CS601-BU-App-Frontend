import { useEffect, useState } from "react";

import CourseList from "../components/CourseList";

const courseApiUrl = "http://localhost:5000/api/courses/all";

const CourseView = () => {
  const [courseData, setCourseData] = useState([]);
  const [filterStr, setFilterStr] = useState("health ");

  useEffect(() => {
    (async () => {
      const response = await fetch(courseApiUrl);
      const data = await response.json();
      if (data?.courses?.length > 0) {
        setCourseData(data.courses);
      }
    })();
  }, []);
  return (
    <div>
      <CourseList
        courseData={courseData.filter((course) => {
          return (
            course?.courseId.toLowerCase().includes(filterStr.toLowerCase()) ||
            course?.title.toLowerCase().includes(filterStr.toLowerCase())
          );
        })}
      />
    </div>
  );
};

export default CourseView;
