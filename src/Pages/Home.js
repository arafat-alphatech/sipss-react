import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../Styles/Home.css";
import { connect } from "unistore/react";
import { actions } from "../store";
import { Link } from "react-router-dom";


class Home extends Component {
  componentDidMount = () => {
    this.props.getKelas();
    this.props.getMaPel();
  };
  render() {
    const listNamaKelas = this.props.listNamaKelas;
    const listMapel = this.props.listMapel;
    console.log("local state di home", this.state)
    return (
      <div>
        <h1 style={{ textAlign: "center" }}> INI HOME BOSS</h1>

        {/* Section Data Guru */}
        <div style={{ textAlign: "center" }}>
          <img
            style={{ width: "100px", height: "100px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tom_Cruise_by_Gage_Skidmore.jpg/220px-Tom_Cruise_by_Gage_Skidmore.jpg"
            alt="..."
            className="img-thumbnail"
          />
          <p>Nama Guru</p>
        </div>
        {/* Section Data Guru (end) */}

        {/* Piih Kelas */}
        <div style={{ margin: "10px" }}>
          <select className="form-control" value={listNamaKelas.id_kelas} name="id_kelas" onChange={e => this.props.setField(e)} onClick={() => this.props.getMaPel()}>
            <option>Pilih Kelas</option>
            {listNamaKelas.map((item, key) => {
              return <option value={item.id_kelas} key={key}>{item.nama_kelas}</option>;
            })}
          </select>
        </div>
        {/* Pilih Kelas (end) */}

        {/* div Card Kelas */}
        <div
          className="card mb-3"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <div className="card-body">
            <h5 className="card-title">Mata Pelajaran</h5>

            {/* Piih Mata Pelajaran */}
            <div style={{ margin: "10px" }}>
              <select className="form-control" value={listMapel.id_mapel} name="id_mapel" onChange={e => this.props.setField(e)} >
                <option>Pilih Mata Pelajaran</option>
                {listMapel.map((item, key) => {
                  return (
                    <option key={key} value={item.id_mapel}>{item['mapel.nama_mapel']}</option>
                  );
                })}
              </select>
            </div>
            {/* Pilih Mata Pelajaran (end) */}

            {/* Button Menu Siswa */}
            <Link
              className='btn btn-primary'
              to='tambah-ujian'
              style={{
                minWidth: "300px",
                maxWidth: "800px",
                marginBottom: "10px",
                // backgroundColor: '#39C2C9',
                // borderColor: '#39C2C9'
              }}
              >
              Siswa
              </Link>
            <br />
            {/* Button Menu Siswa (End) */}

            {/* Button Menu Ujian */}
            <Link
              className="btn btn-primary"
              to='/tambah-ujian'
              style={{minWidth:'300px', maxWidth:'800px', marginBottom:'10px'}}
              >
              Ujian
                </Link>
            <br />
            {/* Button Menu Ujian (End) */}

            {/* Button Menu Jadwal */}
            <Link
              className='btn btn-primary'
              style={{
                minWidth: "300px",
                maxWidth: "800px",
                marginBottom: "10px"
              }}
              to='/'
            >
              Jadwal
            </Link>
            <br />
            {/* Button Menu Jadwal (end) */}

            {/* Button Menu Rapor */}
            <Link
              className='btn btn-primary'
              style={{
                minWidth: "300px",
                maxWidth: "800px",
                marginBottom: "10px"
              }}
              to='/'
            >
              Rapor
            </Link>
            <br />
            {/* Button Menu Rapor (end) */}

            {/* Button Mata Pelajaran */}
            <Link
              className='btn btn-primary'
              style={{
                minWidth: "300px",
                maxWidth: "800px",
                marginBottom: "10px"
              }}
              to='/'
            >
              Tambah Mata Pelajaran
            </Link>
          </div>
          {/* Button Mata Pelajaran (end) */}

        </div>
        {/* div card Kelas (end) */}

        {/* Menu Tambah Kelas */}
        <div className="tambah-kelas">
          <Link
            className='btn btn-primary'
            style={{
              minWidth: "20px",
              maxWidth: "800px",
              marginBottom: "50px"
            }}
            to='/'
          >
            Tambah Kelas
          </Link>
        </div>
        {/* Menu Tambah Kelas (end) */}

      </div>
    );
  }
}

export default connect(
  "id_kelas,listMapel,listNamaKelas",
  actions
)(Home);
