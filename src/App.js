import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from 'react';

function App() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const genAI = new GoogleGenerativeAI("enter your API_Key");
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const handleChange = (event) => {
    setQuestion(event.target.value);
  }

  async function sendPrompt() {
    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();
    var typing = "Answer to your Question: ";
    for (let i = 0; i < text.length; i++) {
      typing = typing + text[i];
      setAnswer(typing);
      await sleep(100);
    }
    return;
  }
  return (
    <div className="App">
      <div align="center" id="head" style={{paddingLeft: "20%", paddingRight: "20%"}}>
        <p class="text-4xl text-green-900 dark:text-green">Gemini Chat Interface</p>
        <p class="text-lg text-black-900 dark:text-black">{answer}</p>
      </div>
      <div align="center" id="prompt">
        <table className="Bottom">
            <tr>
              <td>
                <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900" onClick={sendPrompt}>Ask</button>
              </td>
              <td>
                <input type="text" id="question" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Question" onChange={handleChange} required />
              </td>
            </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
