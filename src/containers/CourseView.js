import { useEffect, useState } from "react";

import CourseList from "../components/CourseList";
import Modal from "../components/Modal";

import "./CourseView.css";

import Config from "../utility/config";
const courseApiUrl = Config.BACKEND_URL + "/courses/all";

const CourseView = () => {
  const [courseData, setCourseData] = useState([]);
  const [filterStr, setFilterStr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalFooter, setModalFooter] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(courseApiUrl);
      const data = await response.json();
      if (data?.courses?.length > 0) {
        setCourseData(data.courses);
      }
    })();
  }, []);

  const handleFilterStrChange = (e) => {
    setFilterStr(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle(null);
    setModalContent(null);
    setModalFooter(null);
  };
  const filteredData = courseData.filter((course) => {
    return (
      course?.courseId.toLowerCase().includes(filterStr.toLowerCase()) ||
      course?.title.toLowerCase().includes(filterStr.toLowerCase())
    );
  });

  return (
    <>
      <Modal
        show={showModal}
        onCancel={handleCloseModal}
        modalTitle={modalTitle}
        modalContent={modalContent}
        modalFooter={modalFooter}
      />
      <div className="course-view-container">
        <div className="course-view-title">
          Computer Science & Technology Courses
        </div>
        <div className="course-search-container">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            className="course-search-input"
            type="text"
            value={filterStr}
            onChange={handleFilterStrChange}
          />
        </div>
        <div className="course-result-count">
          Results: {filteredData.length}
        </div>
        <div className="course-container">
          <CourseList
            courseData={filteredData}
            setShowModal={setShowModal}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            setModalFooter={setModalFooter}
          />
        </div>
      </div>
    </>
  );
};

export default CourseView;
