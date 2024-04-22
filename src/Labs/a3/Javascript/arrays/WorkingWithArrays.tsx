function WorkingWithArrays() {
    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped;
    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ["string1", "string2"];
    let todos = [<li>Buy milk</li>, <li>Buy eggs</li>, <li>Buy bread</li>];
    let todos2 = numberArray1.map((number) => <li>Todo {number}</li>);
    let todos3 = numberArray1.map(function (number) {
      return <li>Todo {number}</li>;
    });
  
    let variableArray1 = [
      functionScoped,
      blockScoped,
      constant1,
      numberArray1,
      stringArray1,
    ];
  
    return (
      <>
        <h4>Working with arrays</h4>
        numberArray1 = {numberArray1}
        <br />
        stringArray1 = {stringArray1}
        <br />
        variableArray1 = {variableArray1}
        <br />
        <ul>{todos}</ul>
        <ul>{todos2}</ul>
        <ul>{todos3}</ul>
      </>
    );
  }
  
  export default WorkingWithArrays;
  