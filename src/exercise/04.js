import { useEffect, useState } from "react";

/* 
  the two parameters for this function are: 
  - key: the key on localStorage where we are saving this data
  - initialValue: the initial value of state
*/
export function useLocalStorage(key, initialValue) {
  /* 
    ✅ in this hook, use the useState hook. For the initial value for state:
    use the value saved in localStorage OR the initialValue from the function parameters 
  */
  function changeToObj(vKey){
    const value = localStorage.getItem(vKey);
    try {
      return JSON.parse(value);
    } catch {}
    return value
  }
  

  const [state, setState] = useState(changeToObj(key));
  /* 
   ✅ write a useEffect hook 
   in the useEffect, when state is updated, save the state to localStorage
   don't forget the dependencies array!
  */
  useEffect(() => {
    const value = JSON.stringify(state);
    window.localStorage.setItem(key,value)
    setState(state)
  },[key,state]);

  /* 
   ✅ return the same interface as useState:
   an array with state and a setState function
  */
  return [state, setState]
}

function Form() {
  // ✅ after implementing the useLocalStorage hook, replace useState with useLocalStorage
  // don't forget to pass in both arguments (a key and an initialValue)
  let initialValue = window.localStorage.getItem("name")
  const [name, setName] = useLocalStorage("name",initialValue);
  console.log(name);


  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Name:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <h4>{name ? `Welcome, ${name}!` : "Enter your name"}</h4>
    </form>
  );
}

function FormWithObject() {
  // 🤓 save me for the bonus! when you're ready, update this useState to use your useLocalStorage hook instead
  let initialValue = window.localStorage.getItem("formobject")
  const [formData, setFormData] = useLocalStorage("formobject",initialValue);

  function handleChange(e) {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Title:</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      <label htmlFor="name">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
    </form>
  );
}

export default function App() {
  return (
    <div>
      <h2>useLocalStorage can save string</h2>
      <Form />
      <hr />
      <h2>useLocalStorage can save objects (Bonus)</h2>
      <FormWithObject />
    </div>
  );
}