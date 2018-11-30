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
import swal from "sweetalert";

class PopupEditMKCon extends React.Component {
  state = {
    open: false,
    id_guru_old: "",
    id_guru_new: "",
    nip: "",
    nama: "",
    id_kelas_old: "",
    id_kelas_new: "",
    nama_kelas: "",
    id_mapel_old: "",
    id_mapel_new: "",
    nama_mapel: ""
  };

  // edit guru
  doEditMKCon = () => {
    const token = this.props.adminToken;
    const headers = {
      Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/kelasmapelconj" ;
    const data = {
      id_guru_old : parseInt(this.state.id_guru_old),
      id_kelas_old : parseInt(this.state.id_kelas_old),
      id_mapel_old : parseInt(this.state.id_mapel_old),
      id_guru_new : parseInt(this.state.id_guru_new),
      id_kelas_new : parseInt(this.state.id_kelas_new),
      id_mapel_new : parseInt(this.state.id_mapel_new),
    };
    axios
      .put(url, data, { headers })
      .then(response => {
        swal("Edit data berhasil");
        this.props.getMapelKelas(this.props.token)
        console.log("Response dari API: ", response);
        this.setState({ open: false });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // edit guru (end)

  //set state ketika ada inputan
  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //set state ketika ada inputan (end)

  // Buka tutup popup
  handleClickOpen = () => {
    this.setState({
      id_guru_old :this.props.id_guru_old,
      id_kelas_old : this.props.id_kelas_old,
      id_mapel_old : this.props.id_mapel_old,
      nip :this.props.nip,
      nama : this.props.nama,
      nama_kelas : this.props.nama_kelas,
      nama_mapel : this.props.nama_mapel
    })
    this.props.getAllGuru(this.props.token);
    this.props.getAllKelas()
    this.props.getAllMapel()
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      nip: "",
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      telepon: "",
      username: "",
      password: ""
    });
  };
  // Buka tutup popup (end)

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          <i
            title="edit data"
            style={{ color: "#00e640" }}
            className="fas fa-user-edit"
            style={{ color: "blue" }}
          />
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
            {"Edit Data"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={e => e.preventDefault()}>
              {/* Form isi NIP */}
              <div
                className="form-label-group"
                style={{
                  maxWidth: "500px",
                  margin: "0 auto"
                }}
              > 
                <p>NIP            : {this.state.nip}</p>
                <p>Nama Guru      : {this.state.nama}</p>
                <p>Nama Kelas     : {this.state.nama_kelas}</p>
                <p>Mata Pelajaran : {this.state.nama_mapel}</p>
              </div>
              {/* Form isi NIS (end) */}

              {/* Piih Guru */}
              <select
                style={{ maxWidth: "93%", margin: "20px 20px 10px 20px" }}
                className="form-control"
                value={this.state.id_guru}
                name="id_guru_new"
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
                name="id_kelas_new"
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
                name="id_mapel_new"
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
            <Button onClick={() => this.doEditMKCon()} color="primary" autoFocus>
              Simpan
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
)(PopupEditMKCon);
