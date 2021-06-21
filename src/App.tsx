import "./App.css";

import React from "react";

const App: React.FC = () => {
  const [request, setRequest] = React.useState('');

  return <div>
    <input value={request} onChange={({ target: { value }}) => setRequest(value)} />
  </div>
};

export default App;
