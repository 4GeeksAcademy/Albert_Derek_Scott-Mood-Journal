import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const { store, actions } = useContext(Context);
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const response = await fetch(
      process.env.BACKEND_URL + "/api/updateProfile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            Authorization: `Bearer ${store.token}`,
        },
        body: JSON.stringify({ fullName, email, newPassword }),
      }
    );

    if (response.ok) {
      alert("Profile updated successfully!");
      console.log(fullName, email, newPassword);
      setFullName("");
      setEmail("");
      setNewPassword("");
    } else {
      // At minimum, inform the user that the update did not succeed
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container h-100">
      <div className="row flex-lg-nowrap">
        <div
          className="col-12 col-lg-auto mb-3"
          style={{ width: "200px", height: "800px" }}
        >
          {/* Placeholder for side content if any */}
        </div>

        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="e-profile">
                    <div className="row">
                      <div className="col-12 col-sm-auto mb-3">
                        <div
                          className="mx-auto"
                          style={{
                            width: "140px",
                            height: "140px",
                            backgroundColor: "rgb(233, 236, 239)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "50%",
                          }}
                        >
                          <span
                            style={{
                              color: "rgb(166, 168, 170)",
                              fontWeight: "bold",
                              fontSize: "8pt",
                            }}
                          >
                            140x140
                          </span>
                        </div>
                        <div className="mt-2">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => setShowPhotoModal(true)}
                          >
                            <i className="fa fa-fw fa-camera"></i>
                            <span>Change Photo</span>
                          </button>
                        </div>
                      </div>
                      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                            John Smith
                          </h4>
                          <p className="mb-0">jonny@journal.com</p>
                          <div className="text-muted">
                            <small>Last visited 2 hours ago</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form className="form" onSubmit={handleSaveChanges}>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col d-flex justify-content-end">
                          <button className="btn btn-primary" type="submit">
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPhotoModal && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Photo</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowPhotoModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Upload or select a new photo.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPhotoModal(false)}
                >
                  Close
                </button>
                <button
                  onClick={handleSaveChanges}
                  type="button"
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
