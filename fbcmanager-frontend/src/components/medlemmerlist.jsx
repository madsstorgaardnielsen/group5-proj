import React, { useState, useEffect } from "react";
import { getAll } from "../services/user_services";
import { addRandom } from "../services/user_services";
import { deleteUser } from "../services/user_services";
import { updateUser } from "../services/user_services";
import { searchUser } from "../services/user_services";
import { getByActivity } from "../services/user_services";

function Medlemmerlist() {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState();
  const [key, setKey] = useState(-1);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [active, setActive] = useState("");
  const [team, setTeam] = useState("");
  const [usertype, setUsertype] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [isUserActive, setIsUserActive] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  const usrtype = ["Medlem", "Admin", "Super Admin"];

  async function fetchData() {
    const resp = await getAll();
    setList(resp.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addRnd = async () => {
    await addRandom();
    fetchData();
  };

  const delUsr = async (id) => {
    await deleteUser(id);
    setEdit(false);
    fetchData();
  };

  const handleActiveCheck = async () => {
    setIsUserActive(!isUserActive);
    if (isUserActive) {
      const resp = await getByActivity("true");
      setList(resp.data);
    } else {
      fetchData();
    }
  };
  const handleInactiveCheck = async () => {
    setIsInactive(!isInactive);
    if (isInactive) {
      const resp = await getByActivity("false");
      setList(resp.data);
    } else {
      fetchData();
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length > 0) {
      const resp = await searchUser(searchQuery);
      setList(resp.data);
    } else {
      fetchData();
    }
  };

  const handleEdit = (user) => {
    setName(user.firstname);
    setLastname(user.lastname);
    setTeam(user.team);
    setActive(user.isactive);
    setUsertype(user.usertype);

    setEdit(true);
    setKey(user.userid);
  };

  const updUsr = async (user) => {
    console.log(user.userid);

    const userObj = {
      userid: user.userid,
      firstname: name,
      lastname: lastname,
      team: team,
      isactive: active,
      usertype: usertype,
    };
    await updateUser(userObj);
    setEdit(false);
    setKey(-1);
    setName("");
    fetchData();
  };

  return (
    <div>
      {/* <div>
        <button className="headerContent" onClick={addRnd}>
          Add Random
        </button>

        <input
          className="headerContent2"
          type="checkbox"
          checked={isUserActive}
          onChange={handleActiveCheck}
        />
        <label className="headerContent" htmlFor="aktive">
          vis aktive medlemmer
        </label>

        <input
          className="headerContent2"
          type="checkbox"
          checked={isInactive}
          onChange={handleInactiveCheck}
        />
        <label className="headerContent" htmlFor="inaktive">
          vis inaktive medlemmer
        </label>
      </div> */}

      <table className="medlemmerTable">
        <thead>
          <tr>
            <th>fornavn</th>
            <th>efternavn</th>
            <th>brugernavn</th>
            <th>by</th>
            <th>post nummer</th>
            <th>gade</th>
            <th>telefon nummer</th>
          </tr>
        </thead>
        <tbody>
          {list.map((user, index) => (
            <tr
              className={`${index % 2 === 0 ? "alternate" : ""} tableRow`}
              key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.zip}</td>
              <td>{user.street}</td>
              <td>{user.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // :

  // (
  //   <div>
  //     <div>
  //       <button className="headerContent" onClick={addRnd}>
  //         Add Random
  //       </button>

  //       <label className="headerContent" htmlFor="aktiv">
  //         <input
  //           className="headerContent2"
  //           id="aktiv"
  //           type="checkbox"
  //           checked={isUserActive}
  //           onChange={handleActiveCheck}
  //         />
  //         vis aktive medlemmer
  //       </label>

  //       <label className="headerContent" htmlFor="inaktiv">
  //         <input
  //           id="inaktiv"
  //           className="headerContent2"
  //           type="checkbox"
  //           checked={isInactive}
  //           onChange={handleInactiveCheck}
  //         />
  //         vis inaktive medlemmer
  //       </label>

  //       <input
  //       className="searchbar"
  //         value={searchQuery}
  //         placeholder="søg"
  //         onChange={(e) => {
  //           handleSearch(e.target.value);
  //         }}
  //       />
  //     </div>
  //     <table className="medlemmerTable">
  //       <thead>
  //         <tr>
  //           <th className="firstCol">id</th>
  //           <th className="otherCols">fornavn</th>
  //           <th className="otherCols">efternavn</th>
  //           <th className="otherCols">hold</th>
  //           <th className="dropdownCols">aktiv</th>
  //           <th className="dropdownCols">brugertype</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {list.map((user, index) => (
  //           <tr
  //             className={`${index % 2 === 0 ? "alternate" : ""} tableRow`}
  //             key={user.userid}
  //           >
  //             <td>{user.userid}</td>
  //             <td>{user.firstname}</td>
  //             <td>{user.lastname}</td>
  //             <td>{user.team}</td>
  //             <td>{user.isactive === "true" ? "ja" : "nej"}</td>
  //             <td>{usrtype[user.usertype]}</td>
  //             <td className="buttons">
  //               {edit ? (
  //                 <button
  //                   className="button"
  //                   onClick={() => {
  //                     delUsr(user.userid);
  //                   }}
  //                 >
  //                   delete
  //                 </button>
  //               ) : undefined}
  //             </td>
  //             <td className="buttons">
  //               <button
  //                 onClick={() => {
  //                   handleEdit(user);
  //                 }}
  //                 className="button"
  //               >
  //                 edit
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}
export default Medlemmerlist;
