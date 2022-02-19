import React from "react";
import { getAll } from "../services/user_services";
import { deleteUser } from "../services/user_services";
import { addRandom } from "../services/user_services";

export class MedlemmerList extends React.Component {
  state = {
    medlemmer: [],
  };

  async componentDidMount() {
    getAll().then((response) => {
      this.setState({ medlemmer: response.data });
    });
  }

  addRnd = (e) => {
    addRandom();
    getAll().then((response) => {
      console.log(response.data);
      this.setState({ medlemmer: response.data });
    });
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <button onClick={this.addRnd}>Add Random</button>
        <table className="medlemmerTable">
          <thead>
            <tr>
              <th>id</th>
              <th>navn</th>
            </tr>
          </thead>
          <tbody>
            {this.state.medlemmer.map((medlem, index) => (
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
                      deleteUser(medlem.id);
                    }}
                  >
                    delete
                  </button>
                  <button className="button">edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
