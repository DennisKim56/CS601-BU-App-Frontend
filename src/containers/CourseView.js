import { useEffect, useState } from "react";

import CourseList from "../components/CourseList";

import Config from "../utility/config";
const courseApiUrl = Config.BACKEND_URL + "/courses/all";

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
