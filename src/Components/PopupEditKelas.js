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

class PopupEditKelas extends React.Component {
  state = {
    open: false,
    id_tingkat:"",
    wali_kelas: "",
    nama_kelas:""
  };

  // Edit Kelas
  doEditKelas = () => {
    const token = this.props.adminToken;
    const headers = {
      Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/kelas-detail/" +this.props.id;
    const data = {
      nama_kelas: this.state.nama_kelas,
      wali_kelas: this.state.wali_kelas,
    };
    axios
      .put(url, data, { headers })
      .then(response => {
        swal("Edit kelas berhasil");
        this.props.getAllKelas(this.props.token);
        console.log("Response dari API: ", response);
        this.setState({ open: false });
      })
      .catch(err => {
        console.log(err);
      });
  };


  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Buka tutup popup

  handleClickOpen = () => {
    const token = this.props.adminToken        
    const headers = {
        Authorization: "Bearer " + token
    };
    const url = "https://sipss-api.online/admin/kelas-detail/" +  this.props.id;
    axios
    .get(url,{headers})
    .then((response) => {
      this.setState({ nama_kelas: response.data.data[0].nama_kelas });
      this.setState({ wali_kelas: response.data.data[0].wali_kelas });
      console.log("from pop up edit kelas by id", response.data.data[0]);
    })
    .catch(function (error) {
      //handle error
      console.log(error);
    });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false,
      id_tingkat:"",
      nama_kelas:"",
      wali_kelas:""
    });
  };

  // Buka tutup popup (end)

  render() {
    console.log('state nama kelas', this.state.nama_kelas)
    const listTingkat = this.props.listTingkat;
    console.log('statenya kelas',this.state)
    return (
      <div>
        <Button onClick={this.handleClickOpen}>
          <i
            title="edit data kelas"
            style={{ color: "blue" }}
            className="fas fa-user-edit"
          >
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
            {"Edit Data Kelas"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={e => e.preventDefault()}>
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
                  label={"Nama Kelas: "+this.state.nama_kelas}
                  defaultValue={this.state.nama_kelas}
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
                  label={"Wali Kelas: "+this.state.wali_kelas}
                  defaultValue={this.state.wali_kelas}
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
            <Button onClick={() => this.doEditKelas()} color="primary" autoFocus>
              Simpan
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
)(PopupEditKelas);