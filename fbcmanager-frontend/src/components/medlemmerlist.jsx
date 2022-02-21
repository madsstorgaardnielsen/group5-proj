import React, { useState, useEffect } from "react";
import { getAll } from "../services/user_services";
import { addRandom } from "../services/user_services";
import { deleteUser } from "../services/user_services";
import { updateUser } from "../services/user_services";

function Medlemmerlist() {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState();
  const [key, setKey] = useState(-1);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [active, setActive] = useState("");
  const [team, setTeam] = useState("");
  const [usertype, setUsertype] = useState("");

  const [aktivCheck, setAktivCheck] = useState(false);
  const [inaktivCheck, setinAktivCheck] = useState(false);

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const usrtype = ["Medlem", "Admin", "Super Admin"];
  async function fetchData() {
    console.log("fetching");
    const resp = await getAll();
    setList(resp.data);
    
    if (isSearching && loading) {
      if (searchQuery.length > 0) {
        let filterByFirstname = list.filter((v) =>
          v.first_name.toLowerCase().includes(searchQuery)
        );

        let filterByLastname = list.filter((v) =>
          v.last_name.toLowerCase().includes(searchQuery)
        );

        let filterByTeam = list.filter((v) =>
          v.team.toLowerCase().includes(searchQuery)
        );

        let tempResult = filterByFirstname.concat(
          filterByLastname,
          filterByTeam
        );

        let searchResult = [...new Set(tempResult)]; //convert to set to avoid duplicates
        console.log(searchResult);
        setList(searchResult);
      } else if (searchQuery.length === 0) {
        setList(resp.data);
      }
    }

    if (!isSearching && loading) {
      let filteredList = [];
      if (aktivCheck && !inaktivCheck) {
        filteredList = list.filter((t) => {
          return t.is_active === "true";
        });
        setList(filteredList);
      } else if (inaktivCheck && !aktivCheck) {
        filteredList = list.filter((t) => {
          return t.is_active !== "true";
        });
        setList(filteredList);
      } else if (loading) {
        setList(resp.data);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const addRnd = async () => {
    await addRandom();
    fetchData()
    // setLoading(true);
  };

  const delUsr = async (id) => {
    await deleteUser(id);
    setEdit(false);
    fetchData()
  };

  const handleAktivCheck = () => {
    setAktivCheck(!aktivCheck);
    fetchData()
  };

  const handleInaktivCheck = () => {
    setinAktivCheck(!inaktivCheck);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const handleEdit = (medlem) => {
    setName(medlem.first_name);
    setLastname(medlem.last_name);
    setTeam(medlem.team);
    setActive(medlem.is_active);
    setUsertype(medlem.user_type);

    setEdit(true);
    setKey(medlem.user_id);
  };

  const updUsr = (medlem) => {
    const userObj = {
      user_id: medlem.user_id,
      first_name: name,
      last_name: lastname,
      team: team,
      is_active: active,
      user_type: usertype,
    };

    updateUser(userObj);
    setEdit(false);
    setKey(-1);
    setName("");
    setLoading(true);
  };

  return edit ? (
    <div>
      <div>
        <button className="headerContent" onClick={addRnd}>
          Add Random
        </button>

        <input
          className="headerContent2"
          type="checkbox"
          checked={aktivCheck}
          onChange={handleAktivCheck}
        />
        <label className="headerContent" htmlFor="aktive">
          vis aktive medlemmer
        </label>

        <input
          className="headerContent2"
          type="checkbox"
          checked={inaktivCheck}
          onChange={handleInaktivCheck}
        />
        <label className="headerContent" htmlFor="inaktive">
          vis inaktive medlemmer
        </label>
      </div>

      <table className="medlemmerTable">
        <thead>
          <tr>
            <th className="firstCol">id</th>
            <th className="otherCols">fornavn</th>
            <th className="otherCols">efternavn</th>
            <th className="otherCols">hold</th>
            <th className="dropdownCols">aktiv</th>
            <th className="dropdownCols">brugertype</th>
          </tr>
        </thead>
        <tbody>
          {list.map((medlem, index) => (
            <tr
              className={`${index % 2 === 0 ? "alternate" : ""} tableRow`}
              key={medlem.user_id}
            >
              <td>{medlem.user_id}</td>
              {medlem.user_id !== key ? (
                <td>{medlem.first_name}</td>
              ) : (
                <td>
                  <input
                    className="tableTextField"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </td>
              )}
              {medlem.user_id !== key ? (
                <td>{medlem.last_name}</td>
              ) : (
                <td>
                  <input
                    className="tableTextField"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </td>
              )}
              {medlem.user_id !== key ? (
                <td>{medlem.team}</td>
              ) : (
                <td>
                  <input
                    className="tableTextField"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    required
                  />
                </td>
              )}
              {medlem.user_id !== key ? (
                <td>{medlem.is_active === "true" ? "ja" : "nej"}</td>
              ) : (
                <td>
                  <select
                    name="dropdown"
                    className="dropdown"
                    value={active}
                    onChange={(e) => setActive(e.target.value)}
                  >
                    <option value={true}>ja</option>
                    <option value={false}>nej</option>
                  </select>
                </td>
              )}
              {medlem.user_id !== key ? (
                <td>{usrtype[medlem.user_type]}</td>
              ) : (
                <td>
                  <select
                    name="dropdown"
                    className="dropdown"
                    value={usertype}
                    onChange={(e) => setUsertype(e.target.value)}
                  >
                    <option value={0}>Medlem</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Super admin</option>
                  </select>
                </td>
              )}
              <td className="buttons">
                {medlem.user_id === key ? (
                  edit ? (
                    <button
                      className="button"
                      onClick={() => {
                        delUsr(medlem.user_id);
                      }}
                    >
                      delete
                    </button>
                  ) : undefined
                ) : undefined}
              </td>
              <td className="buttons">
                {medlem.user_id !== key ? (
                  <button onClick={() => handleEdit(medlem)} className="button">
                    edit
                  </button>
                ) : (
                  <button
                    onClick={
                      medlem.first_name.length > 0
                        ? () => updUsr(medlem)
                        : undefined
                    }
                    className="button"
                  >
                    save
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <div>
        <button className="headerContent" onClick={addRnd}>
          Add Random
        </button>

        <label className="headerContent" htmlFor="aktiv">
          <input
            className="headerContent2"
            id="aktiv"
            type="checkbox"
            checked={aktivCheck}
            onChange={() => {
              handleAktivCheck();
            }}
          />
          vis aktive medlemmer
        </label>

        <label className="headerContent" htmlFor="inaktiv">
          <input
            id="inaktiv"
            className="headerContent2"
            type="checkbox"
            checked={inaktivCheck}
            onChange={() => {
              handleInaktivCheck();
            }}
          />
          vis inaktive medlemmer
        </label>

        <input
          value={searchQuery}
          placeholder="søg"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <table className="medlemmerTable">
        <thead>
          <tr>
            <th className="firstCol">id</th>
            <th className="otherCols">fornavn</th>
            <th className="otherCols">efternavn</th>
            <th className="otherCols">hold</th>
            <th className="dropdownCols">aktiv</th>
            <th className="dropdownCols">brugertype</th>
          </tr>
        </thead>
        <tbody>
          {list.map((medlem, index) => (
            <tr
              className={`${index % 2 === 0 ? "alternate" : ""} tableRow`}
              key={medlem.user_id}
            >
              <td>{medlem.user_id}</td>
              <td>{medlem.first_name}</td>
              <td>{medlem.last_name}</td>
              <td>{medlem.team}</td>
              <td>{medlem.is_active === "true" ? "ja" : "nej"}</td>
              <td>{usrtype[medlem.user_type]}</td>
              <td className="buttons">
                {edit ? (
                  <button
                    className="button"
                    onClick={() => {
                      delUsr(medlem.user_id);
                    }}
                  >
                    delete
                  </button>
                ) : undefined}
              </td>
              <td className="buttons">
                <button
                  onClick={() => {
                    handleEdit(medlem);
                  }}
                  className="button"
                >
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
export default Medlemmerlist;
