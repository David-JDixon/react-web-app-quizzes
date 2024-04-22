import ModuleList from "./List";
function Modules() {
  return (
    <div>
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
        <button type="button" className="redButton">+ Module</button>

      </div>
      <ModuleList />
    

      
    </div>
    </div>

    
  );
}
export default Modules;