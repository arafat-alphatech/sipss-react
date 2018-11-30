import React, { Component } from "react";
import MenuBawah from "../Components/MenuBawah";
import { Link, Redirect } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../store";

class Intro extends Component {
  render() {
    if ((this.props.is_login === false || this.props.is_login === "") && this.props.location.pathname !== '/signin') {
      return <Redirect to={{ pathname: "/signin" }} />;
    }
    return (
      <div>
        {/* <h1
          style={{ textAlign: "center", color: "#00A2E5", marginTop: "20px" }}
        >
          Home
        </h1> */}
        {/* Banner */}
        <div className="card rounded-0 text-center" style={{backgroundColor:'#00A2E5', color:'white', width:'105%'}}>
          {/* <div className="card-header">Featured</div> */}
          <div className="card-body">
            <h5 className="card-title">Selamat Datang di SIPS</h5>
            <p className="card-text">
              Permudah proses penilaian dengan SIPS, mulai hidup lebih produktif ! 
            </p>

          </div>
        </div>
        {/* Banner (end) */}
        <div
          className="row container-fluid"
          style={{ width: "100%", margin: "0px", marginLeft:'10px' }}
        >
          <div className="col-6">
            <Link to="/ujian">
              <div
                className="card"
                style={{
                  minWidth: "120px",
                  maxWidth: "100%",
                  margin: "20px",
                  marginRight: "0px",
                  marginLeft: "0px",
                  padding: "10px"
                }}
              >
                <img
                  className="card-img-top"
                  src="https://i.ibb.co/84Mzb8H/ujian.png"
                  alt="Card-cap"
                  style={{ maxWidth: "140px", maxHeight: "100px" }}
                />
                <div
                  className="card-body"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    marginBottom: "10px"
                  }}
                >
                  <h5
                    className="card-title"
                    style={{
                      padding: "0px",
                      margin: "0px",
                      textAlign: "center",
                      color: "#00A2E5"
                    }}
                  >
                    Ujian
                  </h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-6">
            <Link to="/dashboard">
              <div
                className="card"
                style={{
                  minWidth: "120px",
                  maxWidth: "100%",
                  margin: "20px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  padding: "10px"
                }}
              >
                <img
                  className="card-img-top"
                  src="http://icons-for-free.com/free-icons/png/512/2136425.png"
                  alt="Card-cap"
                  style={{ maxWidth: "140px", height: "100px" }}
                />
                <div
                  className="card-body"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    marginBottom: "10px"
                  }}
                >
                  <h5
                    className="card-title"
                    style={{
                      padding: "0px",
                      margin: "0px",
                      textAlign: "center",
                      color: "#00A2E5"
                    }}
                  >
                    Statistik
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div
          className="row container-fluid"
          style={{ width: "100%", margin: "0px", marginBottom: "0px", marginLeft:'10px'}}
        >
          <div className="col-6">
          <Link to="/rekap-nilai">
            <div
              className="card"
              style={{
                minWidth: "120px",
                maxWidth: "100%",
                margin: "20px",
                marginLeft: "0px",
                marginRight: "0px",
                padding: "10px"
              }}
            >
              <img
                className="card-img-top"
                src="https://i.ibb.co/hWPJS61/summary-icon.png"
                alt="Card-cap"
                style={{ width: "120px", height: "100px" }}
              />
              <div
                className="card-body"
                style={{ padding: "0px", margin: "0px", marginBottom: "10px" }}
              >
                <h5
                  className="card-title"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    textAlign: "center",
                    color: "#00A2E5"
                  }}
                >
                  Rapor
                </h5>
              </div>
            </div>
              </Link>
          </div>
          <div className="col-6">
          <Link to="/profile">
            <div
              className="card"
              style={{
                minWidth: "120px",
                maxWidth: "100%",
                margin: "20px",
                marginLeft: "0px",
                marginRight: "0px",
                padding: "10px"
              }}
              >
              <img
                className="card-img-top"
                src="https://i.ibb.co/rZNGTsV/storyblocks-teacher-in-the-classroom-with-students-vector-illustration-design-Bd-YUS3o9m-thumb.jpg"
                alt="Card-cap"
                style={{ maxWidth: "140px", height: "100px" }}
                />
              <div
                className="card-body"
                style={{ padding: "0px", margin: "0px", marginBottom: "10px" }}
                >
                <h5
                  className="card-title"
                  style={{
                    padding: "0px",
                    margin: "0px",
                    textAlign: "center",
                    color: "#00A2E5"
                  }}
                  >
                  Profile
                </h5>
              </div>
            </div>
                  </Link>
          </div>
        </div>
        <div style={{marginTop:'40px'}}></div>
        <footer
          className="footer"
          style={{
            height: "55px",
            bottom: "0",
            width: "100%",
            position:'fixed'
          }}
        >
          <MenuBawah />
        </footer>
      </div>
    );
  }
}

export default connect(
  "id_kelas, listMapel, listNamaKelas, id_mapel, is_login",
  actions
)(Intro);
