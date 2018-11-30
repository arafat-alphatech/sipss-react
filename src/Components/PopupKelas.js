import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "unistore/react";
import { actions } from "../store";
import TextField from "@material-ui/core/TextField";
import swal from 'sweetalert';
import axios from 'axios'

class PopupKelas extends React.Component {
  state = {
    open: false,
    id_tingkat:'',
    wali_kelas: "",
    nama_kelas:''
  };

  // tambah kelas
  postNewKelas = () => {
    const token = this.props.adminToken;
    const headers = {
      Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/kelas";
    const data = {
      id_tingkat: this.state.id_tingkat,
      nama_kelas: this.state.nama_kelas,
      wali_kelas: this.state.wali_kelas,
    };
    axios
      .post(url, data, { headers })
      .then(response => {
        swal("Tambah data kelas berhasil");
        this.props.getAllKelas(this.props.token);
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
    // console.log(e.target.value);
  };

  // Buka tutup popup

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // Buka tutup popup (end)

  render() {
    const listTingkat = this.props.listTingkat;
    console.log('statenya kelas',this.state)
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          Tambah Kelas &nbsp;
          <i
            title="tambah data kelas"
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
            {"Tambah Kelas"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={e => e.preventDefault()}>
              {/* Piih Tingkat Kelas */}
              <div style={{ margin: "10px" }}>
                <select
                  className="form-control"
                  value={listTingkat.id_tingkat}
                  name="id_tingkat"
                  onChange={e => this.inputChange(e)}
                >
                  <option>Tingkat Kelas</option>
                  {listTingkat.map((item, key) => {
                    return (
                      <option value={item.id_tingkat} key={key}>
                        {item.nama_tingkat}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Pilih Kelas (end) */}

              {/* Tambah Nama Kelas */}
              <div
                className="form-label-group"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  maxWidth: "500px"
                }}
              >
                <TextField
                  required
                  name="nama_kelas"
                  type="text"
                  label="Nama Kelas"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
              {/* Tambah nama kelas (end) */}

              <div
                className="form-label-group"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  maxWidth: "500px"
                }}
              >
                <TextField
                  required
                  name="wali_kelas"
                  type="text"
                  label="Wali Kelas"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                  style={{
                    width: "100%"
                  }}
                  onChange={e => this.inputChange(e)}
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Batal
            </Button>
            <Button onClick={() => this.postNewKelas()} color="primary" autoFocus>
              Tambahkan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(
  "id_kelas, listMapel, listNamaKelas, id_mapel, is_login, listTingkat, adminToken",
  actions
)(PopupKelas);
