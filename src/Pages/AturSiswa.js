import React, { Component } from "react";
import { connect } from "unistore/react";
import { actions } from "../store";
import PopupSiswa from '../Components/PopupSiswa'
import PopupEditSiswa from '../Components/PopupEditSiswa'
import Button from "@material-ui/core/Button";
import swal from 'sweetalert'

class AturSiswa extends Component {
  componentDidMount = () => {
    this.props.getAllSiswa(this.props.token);
  };
  doDeleteSiswa = (id) => {
    this.props.deleteSiswa(id).then(()=>{
      this.props.getAllSiswa(this.props.token)
    })
  }
  render() {
    const listSiswa = this.props.listSiswa
    return (
      <div style={{ padding: "20px" }}>
        {/* Table Guru */}
        <div className="card" style={{ margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: "#39C2C9", marginTop: "20px" }}> Daftar Siswa
          </h1>
          <div  style={{ margin: "20px 20px 0 auto" }}>
        <PopupSiswa/>
        </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-10 offset-sm-1">
                <div style={{ margin: "0 auto" }}>
                  <table
                    style={{
                      overflowX: "auto",
                      //   display: "block",
                      whiteSpace: "nowrap",
                      margin: "0 auto"
                    }}
                    className="table table-hover table-stripped text-center"
                  >
                    <thead>
                      <tr style={{ color: "#39C2C9" }}>
                        <th>No</th>
                        <th>NIS</th>
                        <th>Nama Siswa</th>
                        <th>Alamat</th>
                        <th>Jenis Kelamin</th>
                        <th>Telepon</th>
                        <th style={{ color: "blue" }}>Edit</th>
                        <th style={{ color: "red" }}>Hapus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listSiswa.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td className='align-middle'>{key + 1}</td>
                            <td className='align-middle'>{item.nis}</td>
                            <td className='align-middle'>{item.nama}</td>
                            <td className='align-middle'>{item.alamat}</td>
                            <td className='align-middle'>{item.jenis_kelamin}</td>
                            <td className='align-middle'>{item.telepon}</td>
                            <td title="edit data guru">
                            <PopupEditSiswa id={item.id_siswa}/>
                            </td>
                            <td title="hapus data guru">
                            <Button>
                              <i
                                onClick={() => this.doDeleteSiswa(item.id_siswa)}
                                className="fas fa-user-minus"
                                style={{ color: "red" }}
                              />
                            </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Table Guru (End) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "listSiswa, is_login",
  actions
)(AturSiswa);
