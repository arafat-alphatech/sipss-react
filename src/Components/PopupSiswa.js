import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "unistore/react";
import { actions } from "../store";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import swal from 'sweetalert'

class PopupSiswa extends React.Component {
  state = {
    open: false,
    nis: "",
    nama: "",
    alamat: "",
    jenis_kelamin: "",
    telepon: ""
  };

  // post siswa
  postNewSiswa = () => {
    const token = this.props.adminToken;
    const headers = {
      Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/siswa";
    const data = {
      id_kelas: this.state.id_kelas,
      nis: this.state.nis,
      nama: this.state.nama,
      alamat: this.state.alamat,
      jenis_kelamin: this.state.jenis_kelamin,
      telepon: this.state.telepon
    };
    axios
      .post(url, data, { headers })
      .then(response => {
        swal("Tambah siswa berhasil");
        this.props.getAllSiswa(this.props.token);
        console.log("Response dari API: ", response);
        this.setState({ open: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // post siswa (end)

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  // Buka tutup popup
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  // Buka tutup popup (end)

  componentDidMount = () => {
    this.props.getAllSiswa(this.props.token);
  };

  render() {
    const listKelas = this.props.listKelas;
    console.log('cek statenya',this.state)
    console.log('cek cek cek',this.props.listKelas);
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          Tambah Data Siswa &nbsp;
          <i
            title="tambah data siswa"
            style={{ color: "#00e640" }}
            className="fas fa-user-plus"
          >
            <span style={{ marginRight: "20px" }} />
          </i>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            {"Tambah Data Siswa"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={e => e.preventDefault()}>
              {/* Piih Kelas */}

              <select
                style={{ maxWidth: "93%", margin: "20px 20px 10px 20px" }}
                className="form-control"
                value={listKelas.id_kelas}
                name="id_kelas"
                onChange={e => this.inputChange(e)}
                onClick={() => this.props.getAllKelas()}
              >
                <option>Nama kelas</option>
                {listKelas.map((item, key) => {
                  return (
                    <option value={item.id_kelas} key={key}>
                      {item.nama_kelas}
                    </option>
                  );
                })}
              </select>

              {/* Pilih Kelas (end) */}

              {/* Form isi NIS */}
              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="nis"
                  type="text"
                  label="NIS"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
              {/* Form isi NIS (end) */}

              {/* Form isi nama Siswa */}
              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="nama"
                  type="text"
                  label="Nama Siswa"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
              {/* Form isi nama siswa (end) */}

              {/* Piih Jenis Kelamin */}
              <select
                style={{ maxWidth: "93%", margin: "20px 20px 10px 20px" }}
                className="form-control"
                value={this.state.jenis_kelamin}
                name="jenis_kelamin"
                onChange={e => this.inputChange(e)}
              >
                <option>Jenis Kelamin</option>
                {[["Laki - laki", "L"], ["Perempuan", "P"]].map((item, key) => {
                  return (
                    <option value={item[1]} key={key}>
                      {item[0]}
                    </option>
                  );
                })}
              </select>
              {/* Pilih Jenis Kelamin (end) */}

              {/* Form isi alamat */}
              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="alamat"
                  type="text"
                  label="Alamat"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
              {/* Form isi alamat (end) */}

              {/* Form isi telepon */}
              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              >
                <TextField
                  required
                  name="telepon"
                  type="text"
                  label="Telepon"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
              {/* Form isi telepon (end) */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Batal
            </Button>
            <Button
              onClick={() => this.postNewSiswa()}
              color="primary"
              autoFocus
            >
              Tambahkan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  "is_login, adminToken, id_kelas, listKelas, listTingkat",
  actions
)(PopupSiswa);
