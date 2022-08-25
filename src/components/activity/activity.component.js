import React from "react";
import "./activity.css";
function Activity() {
  const urls = [
    {
      original:
        "https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx",
      shortened: "bit.ly/123",
      clicks: 243,
    },
    {
      original:
        "https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx",
      shortened: "bit.ly/123",
      clicks: 243,
    },
    {
      original:
        "https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx",
      shortened: "bit.ly/123",
      clicks: 243,
    },
    {
      original:
        "https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx",
      shortened: "bit.ly/123",
      clicks: 243,
    },
  ];

  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((datar) => setData(datar.message));
  }, []);

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
              class="modal fade"
              id="shortenModal"
              tabindex="-1"
              aria-labelledby="shortenModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="shortenModalLabel">
                      Shorten URL
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div className="mb-3">
                        <label>Original URL*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter the original URL"
                        />
                      </div>

                      <div className="mb-3">
                        <label>Desired short link (Optional)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter a short link you prefer. This is optional!"
                        />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-primary">
                      Shorten
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** Activity Table */}
        <div className="card">
          <div className="card-body">
            {!data ? (
              "Loading..."
            ) : (
              <table className="table table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Original URL</th>
                    <th scope="col">Shortened URL </th>
                    <th scope="col">Total Clicks</th>
                    <th scope="col" className="text-center">
                      Click Stats
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((url, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{url.original}</td>
                      <td>{url.shortened}</td>
                      <td>{url.clicks}</td>
                      <td className="text-center">
                        <button className="btn btn-link p-0 m-0">
                          <i class="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
