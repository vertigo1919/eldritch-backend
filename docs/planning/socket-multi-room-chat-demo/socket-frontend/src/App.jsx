import { useState } from "react";
import ChatTest from "./ChatTest";

function App() {
  const [count, setCount] = useState(0);

  return <ChatTest />;
}

export default App;
