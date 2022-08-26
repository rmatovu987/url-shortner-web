import React, { Component } from "react";
import "./activity.css";
export default class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      isLoaded: false,
      original_url: ''
    };
  }

  componentDidMount() {
    fetch("http://http://18.141.56.186/:3000/urls", {
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem("url_token"),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          urls: json,
        });
      });
  }

  render() {
    let { isLoaded, urls } = this.state;

    if (isLoaded) {
      return (        
            <div className="card">
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Original URL</th>
                      <th scope="col">Shortened URL </th>
                      <th scope="col">Total Clicks</th>
                      {/* <th scope="col" className="text-center">
                        Click Stats
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((url, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{url.original_url}</td>
                        <td>{url.short_url}</td>
                        <td>{url.clicks}</td>
                        {/* <td className="text-center">
                          <button className="btn btn-link p-0 m-0">
                            <i className="bi bi-eye"></i>
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
      );
    } else {
      return <div>Activity is loading...</div>;
    }
  }
}