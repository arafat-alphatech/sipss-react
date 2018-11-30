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

class PopupMKCon extends React.Component {
  state = {
    open: false,
    id_guru: '',
    id_kelas: '',
    id_mapel: ''
  };

  // post siswa
  doAddMKCon = () => {
    const token = this.props.adminToken;
    const headers = {
      Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/kelasmapelconj";
    const data = {
      id_guru: this.state.id_guru,
      id_kelas: this.state.id_kelas,
      id_mapel: this.state.id_mapel
    };
    axios
      .post(url, data, { headers })
      .then(response => {
        swal("Tambah data berhasil");
        this.props.getMapelKelas(this.props.token)
        console.log("Response tambah mapel kelas: ", response);
        this.setState({ open: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // post siswa (end)

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Buka tutup popup
  handleClickOpen = () => {
    this.props.getAllGuru(this.props.token);
    this.props.getAllKelas()
    this.props.getAllMapel()
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  // Buka tutup popup (end)

  componentDidMount = () => {
    this.props.getMapelKelas(this.props.token);
  };

  render() {
    const listKelas = this.props.listKelas;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          Tambah Data &nbsp;
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
            {"Tambah Data"}
          </DialogTitle>
          <DialogContent>
          <form onSubmit={e => e.preventDefault()}>
              {/* Piih Guru */}
              <select
                style={{ maxWidth: "93%", margin: "20px 20px 10px 20px" }}
                className="form-control"
                value={this.state.id_guru}
                name="id_guru"
                onChange={e => this.inputChange(e)}
              >
                <option>[NIP] Nama Guru</option>
                {this.props.listGuru.map((item, key) => {
                  return (
                    <option value={item.id_guru} key={key}>
                      [{item.nip}] {item.nama}
                    </option>
                  );
                })}
              </select>
              {/* Pilih Guru (end) */}
              
              {/* Piih Kelas */}
              <select
                style={{ maxWidth: "93%", margin: "20px 20px 10px 20px" }}
                className="form-control"
                value={this.state.id_kelas}
                name="id_kelas"
                onChange={e => this.inputChange(e)}
              >
                <option>Nama kelas</option>
                {this.props.listKelas.map((item, key) => {
                  return (
                    <option value={item.id_kelas} key={key}>
                      {item.nama_kelas}
                    </option>
                  );
                })}
              </select>
              {/* Pilih Kelas (end) */}

              {/* Piih Mata Pelajaran */}
              <select
                style={{ maxWidth: "93%", margin: "20px 20px 10px 20px" }}
                className="form-control"
                value={this.state.id_mapel}
                name="id_mapel"
                onChange={e => this.inputChange(e)}
              >
                <option>Nama Mata Pelajaran</option>
                {this.props.listAllMapel.map((item, key) => {
                  return (
                    <option value={item.id_mapel} key={key}>
                      {item.nama_mapel}
                    </option>
                  );
                })}
              </select>
              {/* Pilih Mata Pelajaran (end) */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Batal
            </Button>
            <Button
              onClick={() => this.doAddMKCon()}
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
  "is_login, adminToken, listKelas, listGuru, listAllMapel",
  actions
)(PopupMKCon);
