import React, { useState, useEffect } from "react";
import { getAll } from "../services/user_services";
import { addRandom } from "../services/user_services";
import { deleteUser } from "../services/user_services";
import { updateUser } from "../services/user_services";

function Test() {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState();
  const [key, setKey] = useState(-1);
  const [username, setUsername] = useState("");

  async function getInitialList() {
    const response = await getAll();
    setList(response.data);
  }
  useEffect(() => {
    getInitialList();
  }, []);

  const addRnd = () => {
    addRandom();
    getAll().then((response) => {
      setList(response.data);
    });
  };

  const delUsr = (id) => {
    deleteUser(id);
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleEdit = (key) => {
    //   console.log(key)
    setEdit(true);
    setKey(key);
  };

  const updateUser = (id) => {
    //onClick={() => {updateUser(medlem.id)}}
    console.log(id);
    console.log(username);
    const userObj = { id, username };
    console.log(userObj);
    updateUser(userObj);
    //     setEdit(false)
    //     setKey(-1)
  };

  return edit ? (
    <div>
      <button onClick={addRnd}>Add Random</button>
      <table className="medlemmerTable">
        <thead>
          <tr>
            <th>id</th>
            <th>navn</th>
          </tr>
        </thead>
        <tbody>
          {list.map((medlem, index) => (
            <tr
              className={`${index % 2 === 0 ? "alternate" : ""} tableRow`}
              key={medlem.id}
            >
              <td>{medlem.id}</td>
              {medlem.id !== key ? (
                <td>{medlem.name}</td>
              ) : (
                <td>
                  <input
                    type="text"
                    value={username}
                    on
                    onInput={(e) => setUsername(e.target.value)}
                  ></input>
                </td>
              )}
              <td className="buttons">
                <button
                  className="button"
                  onClick={() => {
                    delUsr(medlem.id);
                  }}
                >
                  delete
                </button>
                {medlem.id !== key ? (
                  <button
                    onClick={() => handleEdit(medlem.id)}
                    className="button"
                  >
                    edit
                  </button>
                ) : (
                  <button className="button">save</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <button onClick={addRnd}>Add Random</button>
      <table className="medlemmerTable">
        <thead>
          <tr>
            <th>id</th>
            <th>navn</th>
          </tr>
        </thead>
        <tbody>
          {list.map((medlem, index) => (
            <tr
              className={`${index % 2 === 0 ? "alternate" : ""} tableRow`}
              key={medlem.id}
            >
              <td>{medlem.id}</td>
              <td>{medlem.name}</td>
              <td className="buttons">
                <button
                  className="button"
                  onClick={() => {
                    delUsr(medlem.id);
                  }}
                >
                  delete
                </button>
                <button onClick={handleEdit} className="button">
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Test;
