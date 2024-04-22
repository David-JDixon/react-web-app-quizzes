function JsonStringify() {
    const squares = [1, 4, 16, 25, 36];
    return (
      <>
        <h3>JSON Stringify</h3>
        squares =<pre>{JSON.stringify(squares)}</pre>
        <br />
        squares = {squares}
      </>
    );
  }
  export default JsonStringify;
  