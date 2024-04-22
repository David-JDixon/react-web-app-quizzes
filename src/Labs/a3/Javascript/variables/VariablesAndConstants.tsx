function VariablesAndConstants() {
    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped;
  
    return (
      <div>
        <h2>Variables and Constants</h2>
        functionScoped = {functionScoped}
        <br />
        blockScoped = {blockScoped}
        <br />
        constant1 = {functionScoped - blockScoped}
        <br />
      </div>
    );
  }
  export default VariablesAndConstants;
  