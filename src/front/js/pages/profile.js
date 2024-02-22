import React from "react";

export default function Profile() {
  // Function names should be capitalized to follow React component naming conventions

  return (
    <div className="container">
      <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{ width: '200px' }}>
          {/* Inline styles in JSX must be passed as objects */}
          <div className="card p-3">
            <div className="e-navlist e-navlist--active-bg">
              <ul className="nav">
                {/* Use `className` instead of `class` */}
                <li className="nav-item"><a className="nav-link px-2 active" href="#"><i className="fa fa-fw fa-bar-chart mr-1"></i><span>Overview</span></a></li>
                <li className="nav-item"><a className="nav-link px-2" href="https://www.bootdey.com/snippets/view/bs4-crud-users" target="_blank" rel="noopener noreferrer"><i className="fa fa-fw fa-th mr-1"></i><span>CRUD</span></a></li>
                {/* Added rel="noopener noreferrer" for security */}
                <li className="nav-item"><a className="nav-link px-2" href="https://www.bootdey.com/snippets/view/bs4-edit-profile-page" target="_blank" rel="noopener noreferrer"><i className="fa fa-fw fa-cog mr-1"></i><span>Settings</span></a></li>
              </ul>
            </div>
          </div>
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
                      </div>
                      <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                        <div className="text-center text-sm-left mb-2 mb-sm-0">
                          <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">John Smith</h4>
                          <p className="mb-0">@johnny.s</p>
                          <div className="text-muted"><small>Last seen 2 hours ago</small></div>
                          <div className="mt-2">
                            <button className="btn btn-primary" type="button">
                              <i className="fa fa-fw fa-camera"></i>
                              <span>Change Photo</span>
                            </button>
                          </div>
                        </div>
                        <div className="text-center text-sm-right">
                          <span className="badge badge-secondary">administrator</span>
                          <div className="text-muted"><small>Joined 09 Dec 2017</small></div>
                        </div>
                      </div>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="nav-item"><a href="" className="active nav-link">Settings</a></li>
                    </ul>
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                        <form className="form" noValidate="">
                          {/* Removed `novalidate` as it should be `noValidate` in JSX */}
                          <div className="row">
                            {/* Content unchanged */}
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

            {/* Additional content unchanged */}
          </div>
        </div>
      </div>
    </div>
  );
}