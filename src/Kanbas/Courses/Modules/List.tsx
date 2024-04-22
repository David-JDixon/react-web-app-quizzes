import React, { useEffect, useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules
} from "./reducer";
import * as client from "./client";

import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const modulesList = useSelector((state: KanbasState) => 
    state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
    state.modulesReducer.module);
  const dispatch = useDispatch();

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <button
          onClick={handleAddModule}>
          Add
        </button>
        <button
          onClick={() => handleUpdateModule}>
          Update
        </button>
        <input
          value={module.name}
          onChange={(e) =>
            dispatch(setModule({ ...module, name: e.target.value }))
          }/>
        <textarea
          value={module.description}
          onChange={(e) =>
            dispatch(setModule({ ...module, description: e.target.value }))
          }/>
      </li>
      {modulesList
        .filter((module) => module.course === courseId)
        .map((module, index) => (
          <li key={index} className="list-group-item">
            <button
              onClick={() => dispatch(setModule(module))}>
              Edit
            </button>
            <button
              onClick={() => handleDeleteModule(module._id)}>
              Delete
            </button>
            <h3>{module.name}</h3>
            <p>{module.description}</p>
          </li>
        ))}
    </ul>
  );


  //const modulesList = modules.filter((module) => module.course === courseId);
  // const [modulesList, setModuleList] = useState<any[]>(modules);
  // const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  // const [module, setModule] = useState({
  //   name: "New Module",
  //   description: "New Description",
  //   course: courseId,
  //   _id: ""
  // });
  // const addModule = (module: any) => {
  //   const newModule = { ...module,
  //     _id: new Date().getTime().toString() };
  //   const newModuleList = [newModule, ...modulesList];
  //   setModuleList(newModuleList);
  // };
  // const deleteModule = (moduleId: string) => {
  //   const newModuleList = modulesList.filter(
  //     (module) => module._id !== moduleId );
  //   setModuleList(newModuleList);
  // // };  
  // return (
  //   <>
  //     <ul className="list-group wd-modules">
  //       <li className="list-group-item">
  //         <button
  //             onClick={() => deleteModule(module._id)}>
  //             Delete
  //         </button>

  //         <button onClick={() => { addModule(module) }}>
  //           Add
  //         </button>
  //         <input value={module.name}
  //           onChange={(e) => setModule({
  //             ...module, name: e.target.value })}
  //         />
  //         <textarea value={module.description}
  //           onChange={(e) => setModule({
  //             ...module, description: e.target.value })}
  //         />
  //       </li>

  //       {/* {modulesList.map((module, index)  */}
  //       {modulesList.filter((module) => 
  //         module.course === courseId).map((module, index) => (
  //         <li key={index}
  //           className="list-group-item"
  //           onClick={() => setSelectedModule(module)}>
  //           <div>
  //             <FaEllipsisV className="me-2" />
  //             {module.name}
  //             <span className="float-end">
  //               <FaCheckCircle className="text-success" />
  //               <FaPlusCircle className="ms-2" />
  //               <FaEllipsisV className="ms-2" />
  //             </span>
  //           </div>
  //           {selectedModule._id === module._id && (
  //             <ul className="list-group">
  //               {module.lessons?.map((lesson:any, index:any) => (
  //                 <li className="list-group-item" key={index}>
  //                   <FaEllipsisV className="me-2" />
  //                   {lesson.name}
  //                   <span className="float-end">
  //                     <FaCheckCircle className="text-success" />
  //                     <FaEllipsisV className="ms-2" />
  //                   </span>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );
}
export default ModuleList;