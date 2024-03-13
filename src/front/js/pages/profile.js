import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export default function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [file, setFile] = useState();
  const [avatar, setavatar] = useState(null);

  const { store, actions } = useContext(Context);

  useEffect(() => {
    async function fetchData() {
      let result = await actions.getUser();
      if (result) {
        setEmail(store.user.email);
        setFullName(store.user.full_name);
      }
    }
    fetchData();
  }, []);
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const response = await fetch(
      process.env.BACKEND_URL + "/api/updateProfile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ fullName, email, newPassword, avatar }),
      }
    );

    if (response.ok) {
      alert("Profile updated successfully!");
      console.log(response.json());
      setFullName("");
      setEmail("");
      setNewPassword("");
    } else {
      // At minimum, inform the user that the update did not succeed
      alert("Failed to update profile. Please try again.");
    }
  };

  async function uploadPhoto(e) {
    const file = e.target.files[0];
    if (file.size > 3145728) {
      // 3 MB in bytes
      alert("File is too large. Maximum file size is 3MB.");
      return; // Exit the function if file is too large
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      // Check the size of base64 String, if necessary
      if (base64String.length > 3145728 * 1.37) {
        // Adjusting for base64 size increase
        alert("File is too large after conversion. Try a smaller file.");
        return;
      }
      setavatar(base64String);
    };
    reader.readAsDataURL(file);
    setFile(URL.createObjectURL(file));
  }

  useEffect(() => console.log(avatar), [avatar]);

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
                        <div className="photoPreview">
                          {file ? (
                            <img
                              src={file ? file : store.user?.avatar}
                              alt="Profile"
                            />
                          ) : (
                            <div
                              className="mx-auto photoPreview"
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
                              <img src={store.user?.avatar} />
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <i className="fa fa-fw fa-camera"></i>
                          <label
                            htmlFor="uploadPhoto"
                            className="col-sm-2 col-form-label"
                          >
                            Change Photo
                          </label>
                          <input
                            id="uploadPhoto"
                            className="btn btn-primary"
                            type="file"
                            onChange={uploadPhoto}
                          />
                        </div>
                      </div>
                      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                            {store.user?.full_name}
                          </h4>

                          <p className="mb-0">{store.user?.email}</p>

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
                <input type="file" onChange={uploadPhoto} />
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
