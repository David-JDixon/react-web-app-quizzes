import ModuleList from "../Modules/List";
import "./index.css";
function Home() {
  return (

    // <div>
    //   <div>
    //     <div>
    //     <button>Collapse All</button>
    //     <button>View Progress</button>
        
    //     <select>
    //         <option>Publish All</option>
    //         <option>Publish All Modules and Items</option>
    //         <option>Publish Modules only</option>
    //         <option>UnPublish All Modules</option>
    //       </select>
    //     <button type="button" className="redButton">+ Module</button>
    //     </div>

    //     <h2>Home</h2>
    //   <ModuleList />
    //   <h2>Status</h2>
    //   </div>

    //   <div>
    //   <button>Add more</button>
    //   <button>Complete</button>
    //   <button>Incomplete</button>
    //   </div>
    // </div>

    <div className="home-container">
      <div>
        <div >
          <button>Collapse All</button>
          <button>View Progress</button>

          <select>
            <option>Publish All</option>
            <option>Publish All Modules and Items</option>
            <option>Publish Modules only</option>
            <option>UnPublish All Modules</option>
          </select>
          <button type="button" className="redButton">
            + Module
          </button>
        </div>

        <div >
          <h2>Home</h2>
          <ModuleList />
          <h2>Status</h2>
        </div>
      </div>

      <div className="vertical-buttons">
        <button>Import Exisitng Conntent</button>
        <button>Import from Commons</button>
        <button>Choose Home Page</button>
        <button>View Course Stream </button>
        <button>New Announcment</button>
      </div>
    </div>















    // <div>
    //   <div>
        // <button>Collapse All</button>
        // <button>View Progress</button>
        
        // <select>
        //     <option>Publish All</option>
        //     <option>Publish All Modules and Items</option>
        //     <option>Publish Modules only</option>
        //     <option>UnPublish All Modules</option>
        //   </select>
        // <button type="button" className="redButton">+ Module</button>

    //   </div>
      // <h2>Home</h2>
      // <ModuleList />
      // <h2>Status</h2>

    //   <div className="vertical-buttons">
    //     <button>Add more</button>
    //     <button>Complete</button>
    //     <button>Incomplete</button>
    //   </div>

      
    // </div>


    
  );
}
export default Home;