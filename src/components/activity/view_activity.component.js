import React, { useState } from "react";
import Activity from "./activity.component";
import "./activity.css";

export default function ViewActivity() {
  const [name, setName] = useState("");
  const [original_url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  async function shorten(event) {
    const postData = {
      name: name,
      original_url: original_url,
    };
    event.preventDefault();
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ` + sessionStorage.getItem("url_token"),
        },
        body: JSON.stringify(postData),
      };

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}`.concat("/urls"), requestOptions);

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      let modal = document.getElementById(
        'closeModal'
      );
      modal.click();

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="activity-wrapper">
      <div className="container mt-3">
        {/** Page heading */}
        <div className="d-flex justify-content-between">
          <div className="p2">
            <h2>
              <strong>Past Activity</strong>
            </h2>
          </div>

          <div>
            {/* Button trigger modal*/}
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#shortenModal"
            >
              Shorten URL
            </button>

            {/* Modal */}
            <div
              className="modal fade"
              id="shortenModal"
              tabindex="-1"
              aria-labelledby="shortenModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="shortenModalLabel">
                      Shorten URL
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label>Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter a name for the original url"
                          onChange={handleNameChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label>Original URL*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter the original URL"
                          onChange={handleUrlChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                    id="closeModal"
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={shorten}
                    >
                      Shorten
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** Activity Table */}
        <Activity />
      </div>
    </div>
  );
}
