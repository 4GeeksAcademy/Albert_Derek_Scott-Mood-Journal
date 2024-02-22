import React, { useState } from "react";

export default function Profile() {
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="container h-100">
      <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{ width: '200px', height: '800px' }}>
          {/* Inline styles in JSX must be passed as objects */}
        </div>

        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="e-profile">
                    <div className="row">
                      <div className="col-12 col-sm-auto mb-3">
                        <div className="mx-auto" style={{ width: '140px', height: '140px', backgroundColor: 'rgb(233, 236, 239)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}>
                          {/* Updated styles for better alignment and presentation */}
                          <span style={{ color: 'rgb(166, 168, 170)', fontWeight: 'bold', fontSize: '8pt' }}>140x140</span>
                        </div>
                        <div className="mt-2">
                          <button className="btn btn-primary" type="button" onClick={() => setShowPhotoModal(true)}>
                            <i className="fa fa-fw fa-camera"></i>
                            <span>Change Photo</span>
                          </button>
                        </div>
                      </div>
                      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">John Smith</h4>
                          <p className="mb-0">@johnny.s</p>
                          <div className="text-muted"><small>Last seen 2 hours ago</small></div>
                        </div>
                      </div>
                    </div>

                    <form className="form" onSubmit={handleSaveChanges}>
                      <div className="row mb-3">
                        <div className="col">
                          <input type="text" className="form-control" placeholder="Full Name" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input type="email" className="form-control" placeholder="Email Address" />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <input type="password" className="form-control" placeholder="New Password" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col d-flex justify-content-end">
                          <button className="btn btn-primary" type="submit">Save Changes</button>
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

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Photo</h5>
                <button type="button" className="close" onClick={() => setShowPhotoModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Photo change form or component goes here */}
                <p>Upload or select a new photo.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPhotoModal(false)}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
