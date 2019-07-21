// npm dependencies
import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

// all components for routing
// import Header                           from "./components/common/header";
import Dashboard from './components/home/dashboard';
import Settings from './components/settings';
import CreateCategoryItem from './components/settings/createCategoryItem';
import EditCategoryItem from './components/settings/editCategoryItem/editCategoryItem';

import { Link } from "react-router-dom"

/**
 * This is the routes component 
 */
class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          {/* <Route path="/"  component={Header} />   */}
          <div class="container-fluid">
            <div class="row min-vh-100">
              <aside class="col-12 col-md-2 p-0 bg-dark">
                <nav class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start py-2">
                  <div class="collapse navbar-collapse">
                    <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                      <li class="nav-item">
                        <Link class="nav-link pl-0 text-nowrap" to="/"><i class="fa fa-home"></i> <span class="font-weight-bold">Home</span></Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link pl-0 " to="/settings"><i class="fa fa-cogs"></i> <span class="d-none d-md-inline">Settings</span></Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link pl-0" to="#"><i class="fa fa-address-card"></i> <span class="d-none d-md-inline">Profile</span></Link>
                      </li>

                    </ul>
                  </div>
                </nav>
              </aside>
              <main class="col bg-faded py-3">
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/createItem" component={CreateCategoryItem} />
                <Route exact path="/editItem/:category/:item" component={EditCategoryItem} />
              </main>
            </div>
          </div>


        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default Routes;