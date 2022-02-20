import React from "react";
import { getAll } from "../services/user_services";
import { deleteUser } from "../services/user_services";
import { addRandom } from "../services/user_services";

export class MedlemmerList extends React.Component {
  state = {
    medlemmer: [],
    updated: false,
  };

  prevList = [];

  async componentDidMount() {
      getAll().then((response) => {
        this.setState({ medlemmer: response.data });
        this.prevList = this.state.medlemmer;
      });
  }

  async componentDidUpdate() {
    console.log(this.prevList)
    console.log(this.state.medlemmer)
    if (this.prevList.data !== this.state.medlemmer) {
      console.log("hello");
      //  getAll().then((response) => {
      //     this.setState({ medlemmer: response.data });
      //   });
    }

    // if (this.state.updated) {
    //   this.setState({ updated: false });

    // }
  }

  addRnd = () => {
    addRandom();
    getAll().then((response) => {
      this.setState({ medlemmer: response.data });
      
    });
  };

  delUsr = (id) => {
    deleteUser(id);
    this.setState({ updated: true });
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
                      this.delUsr(medlem.id);
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
