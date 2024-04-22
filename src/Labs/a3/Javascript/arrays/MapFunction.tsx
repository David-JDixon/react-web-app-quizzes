function MapFunction() {
    let numberArray1 = [1, 2, 3, 4, 5, 6];
    const square = (a: number) => a * a;
  
    const squares = numberArray1.map(square);
    const cubes = numberArray1.map((a) => a * a * a);
  
    const squareList = numberArray1.map((number) => <li>{number * number}</li>);
  
    return (
      <>
        <h4>Working with Map function</h4>
        numberArray1 = {numberArray1}
        <br />
        squares = {squares}
        <br />
        cubes = {cubes}
        <br />
        <ul>{squareList}</ul>
        <br />
        <ul>
          {numberArray1.map((number) => (
            <li>{number * number * number}</li>
          ))}
        </ul>
      </>
    );
  }
  
  export default MapFunction;
  