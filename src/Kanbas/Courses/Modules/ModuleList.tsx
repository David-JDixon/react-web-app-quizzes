import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import * as db from "../../Database"

function ModuleList() {
    const { courseId } = useParams();
    //const modulesList = modules.filter((module) => module.course === courseId);
    const [modulesList, setModuleList] = useState<any[]>(modules);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    const [module, setModule] = useState({
        name: "New Module",
        description: "New Description",
        course: courseId,
        _id: ""
    });
    const addModule = (module: any) => {
        const newModule = { ...module,
        _id: new Date().getTime().toString() };
        const newModuleList = [newModule, ...modulesList];
        setModuleList(newModuleList);
    };
    const deleteModule = (moduleId: string) => {
        const newModuleList = modulesList.filter(
        (module) => module._id !== moduleId );
        setModuleList(newModuleList);
    };  
    const updateModule = () => {
      const newModuleList = modulesList.map((m) => {
        if (m._id === module._id) {
          return module;
        } else {
          return m;
        }
      });
      setModuleList(newModuleList);
    };
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <button onClick={addModule}>Add</button>
          <button onClick={updateModule}>
                  Update
          </button>
          <button
              onClick={() => deleteModule(module._id)}>
              Delete
          </button>
        </li>
        {modulesList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={index} className="list-group-item">
              <button
                onClick={(event) => { setModule(module); }}>
                Edit
              </button>
              <button
                onClick={() => deleteModule(module._id)}>
                Delete
              </button>
              {module.name}
              ...
            </li>))}
      </ul>
    );
  }
  export default ModuleList;