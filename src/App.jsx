import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(6);
  const [numbe, setNumber] = useState(false);
  const [charac, setCharac] = useState(false);
  const [pass, setPass] = useState("");
  var [gen, setGen] = useState(0);

  const Ref = useRef(null);

  const copyclipboard = useCallback(() => {
    Ref.current?.select();
    Ref.current?.setSelectionRange(0, length);

    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  const passgenerate = useCallback(() => {
    let password = "";
    let final = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numb = "1234567890";
    let special = "!@#$%^&*()~`_-][}{";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
      if (numbe) {
        let n = Math.floor(Math.random() * numb.length + 1);
        password += numb.charAt(n);
        i++;
      }
      if (charac) {
        let s = Math.floor(Math.random() * special.length + 1);
        password += special.charAt(s);
        i++;
      }
    }

    for(let i =0;i<=password.length;i++){

          let c = Math.floor(Math.random() * password.length );
          final += password.charAt(c);
          
    }
    password = final;
    setPass(password.substr(0, length));
  }, [length, numbe, charac, setPass, setGen]);

  useEffect(() => {
    if (gen > 0) {
      passgenerate();
    }
  }, [gen]);

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 bg-gray-800"
      >
        <h1 className="my-3 text-center text-white">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3"
            placeholder="Generate Password"
            readOnly
            ref={Ref}
          />
          <button
            onClick={copyclipboard}
            className="outline-none bg-blue-700 text-white 
          px-3 py-0.5 shrink-0"
          >
            COPY
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              id="lengthInput"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label htmlFor="lengthInput" className="text-white">
              Length :{length}
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbe}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            ></input>
            <label htmlFor="numberInput" className="text-white">
              {" "}
              Number
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charac}
              id="characInput"
              onChange={() => {
                setCharac((prev) => !prev);
              }}
            ></input>
            <label htmlFor="characInput" className="text-white">
              Character
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4
       border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => {
            setGen(gen + 1);
          }}
        >
          Generate
        </button>
      </div>
    </>
  );
}

export default App;
