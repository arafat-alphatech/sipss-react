import React, { Component } from "react";
import { actions } from "../store";
import { connect } from "unistore/react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'
//Import untuk component2 editor soal
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../Styles/EditorSoal.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

//Import untuk Component UI
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import "../Styles/Home.css";
import MenuBawah from '../Components/MenuBawah'

class HalamanEdit extends Component {
  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
      const data = new FormData(); // eslint-disable-line no-undef
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  componentWillMount = () => {
    let id_paket_soal = this.props.id_paket_soal
    this.props.getCurrentSoal(id_paket_soal).then((value) => {
      let no_soal = this.props.match.params.no_soal;
      this.pindahSoalHandle(parseInt(no_soal))
    })

  };

  pindahSoalHandle = (no_soal) => {
    no_soal = parseInt(no_soal)
    let cur_soal = this.props.current_all_soal.find((val, index) => {
      return val.no_soal === no_soal;
    });
    // cek apakah no soal ada di global state, kalau ada muncul di component
    if (cur_soal !== undefined) {

      const blocksFromHTML = convertFromHTML(cur_soal.narasi)
      let editorState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
      editorState = EditorState.createWithContent(editorState)

      // const processedHTML = DraftPasteProcessor.processHTML(cur_soal.narasi);
      // const contentState = ContentState.createFromBlockArray(processedHTML);
      // //move focus to the end. 
      // let editorState = EditorState.createWithContent(contentState);
      // editorState = EditorState.moveFocusToEnd(editorState);

      this.setState({
        editorState: editorState,
        deskripsi_soal: cur_soal.narasi,
        optionA: cur_soal.option_A,
        optionB: cur_soal.option_B,
        optionC: cur_soal.option_C,
        optionD: cur_soal.option_D,
        optionE: cur_soal.option_E,
        jawaban: cur_soal.jawaban,
        isEdit: true
      });

    }
  }

  componentDidMount = () => {
    this.props.getKelas();
    this.props.getMaPel();
  };

  InitialState = {
    editorState: EditorState.createEmpty(),
    deskripsi_soal: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    optionE: "",
    jawaban: "",
    isEdit: false
  };

  state = this.InitialState;

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
      deskripsi_soal: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
    // console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
    console.log(this.state.deskripsi_soal);
  };

  onJawabanChange = e => {
    this.setState({
      jawaban: e.target.value
    });
    // console.log(this.state)
  };

  onOptionChange = (e, option) => {
    if (option === "Pilihan A") {
      this.setState({ optionA: e.target.value });
    } else if (option === "Pilihan B") {
      this.setState({ optionB: e.target.value });
    } else if (option === "Pilihan C") {
      this.setState({ optionC: e.target.value });
    } else if (option === "Pilihan D") {
      this.setState({ optionD: e.target.value });
    } else if (option === "Pilihan E") {
      this.setState({ optionE: e.target.value });
    }

    // console.log(this.state)
  };

  postNewSoal = () => {
    let id_paket_soal = parseInt(this.props.match.params.id_paket_soal)
    const no_soal = parseInt(this.props.match.params.no_soal);
    console.log("id paket soal",id_paket_soal)
    console.log("no_soal",no_soal)
    const {
      deskripsi_soal,
      optionA,
      optionB,
      optionC,
      optionD,
      optionE,
      jawaban
    } = this.state;
    if (
      deskripsi_soal === "" ||
      optionA === "" ||
      optionB === "" ||
      optionC === "" ||
      optionD === "" ||
      optionE === "" ||
      jawaban === ""
    ) {
      swal({title:"Maaf",text:"Pastikan semua kolom terisi",icon:"warning",dangerMode:true}  );
      // this.props.history.push('#')
      console.log(this.state);
    } else {
      const url = "https://sipss-api.online/soal";
      const data = {
        id_paket_soal: id_paket_soal,
        narasi: this.state.deskripsi_soal,
        option_A: this.state.optionA,
        option_B: this.state.optionB,
        option_C: this.state.optionC,
        option_D: this.state.optionD,
        option_E: this.state.optionE,
        jawaban: this.state.jawaban,
        no_soal: no_soal
      };
      // jika user mengedit paket soal yang sudah pernah ada
      const token = this.props.token        
      const headers = {
          Authorization: "Bearer " + token
      };
      if (this.state.isEdit) {
        axios
          .put(url, data, {headers})
          .then(response => {
            swal("Sukses","Berhasil mengubah soal","success");
            this.props.editSoal(no_soal, data)
            // this.setState(this.InitialState);
            const route = "/post-soal/" + id_paket_soal + "/" + (parseInt(no_soal) + 1);
            this.props.history.push(route);
            console.log("body edit", data);
            console.log('current soal di cmponent', this.props.current_all_soal)
          })
          .catch(err => {
            console.log(err);
          });
      }
      // jika user membuat soal dari paket soal baru
      else {
        axios
          .post(url, data, {headers})
          .then(response => {
            swal("Sukses","Berhasil menambah soal","success");
            this.props.addNewSoal(data);
            this.setState(this.InitialState);
            console.log("Res post new soal", response);
            const no_soal = this.props.match.params.no_soal;
            if (this.props.current_jumlah_soal < this.props.jumlah_soal) {
              const route = "/post-soal/" + this.props.id_paket_soal + "/" + (parseInt(no_soal) + 1);    

              this.props.history.push(route);
            } else {
              swal("Sukses","selesai membuat soal","success");
              const route = "/";
              this.props.history.push(route);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  onSwitchSoal = e => {
    console.log("pindah navigasi",e.target.value)
    this.pindahSoalHandle(e.target.value)
    let id_paket_soal = parseInt(this.props.match.params.id_paket_soal)
    let route = "/post-soal/" + id_paket_soal + "/" + e.target.value;
    this.props.history.push(route);
  };

  render() {
    // console.log(this.state)
    // console.log(this.props.current_all_soal)

    const no_soal = this.props.match.params.no_soal;
    let choice = ["A", "B", "C", "D", "E"];
    return (
      <div className="Halaman Edit">
        <h3 style={{ marginLeft: "20px" }}>Soal Nomor {no_soal}</h3>

        {/* Editor Soal */}
        <div style={{ margin: "20px" }}>
          <div className="rdw-storybook-root">
            <Editor
              toolbarClassName="rdw-storybook-toolbar"
              wrapperClassName="rdw-storybook-wrapper"
              editorClassName="rdw-storybook-editor"
              editorState={this.state.editorState}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: {
                  uploadCallback: this.uploadImageCallBack,
                  alt: { present: true, mandatory: false }
                }
              }}
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <Divider light />
        </div>
        {/* Editor Soal (end) */}

        {/* Edit Pilihan Jawaban */}
        <form>
          <div className="row">
            {
              choice.map((item, key) => {
              let option = [ "Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D", "Pilihan E"];
              let optionName = ["optionA","optionB","optionC","optionD","optionE"];
              return (
                <TextField
                  key={key}
                  required
                  id="outlined-required"
                  label={option[key]}
                  onChange={e => this.onOptionChange(e, option[key])}
                  value={this.state[optionName[key]]}
                  margin="normal"
                  variant="outlined"
                  style={{
                    marginLeft: "20px",
                    minWidth: "320px",
                    width: "95%",
                    marginRight: "20px"
                  }}
                />
              );
            })}
          </div>
          {/* Edit Pilihan Jawaban (end) */}

          {/* Piih Jawaban Benar */}
          <div style={{ margin: "20px" }}>
            <select
              name="jawaban"
              className="form-control"
              onChange={e => this.onJawabanChange(e)}
              value={this.state.jawaban}
            >
              <option>Pilih Jawaban Benar</option>
              {choice.map((item, key) => {
                return (
                  <option key={key} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        {/* Pilih Jawaban Benar (end) */}

        {/* Kumpulan Button Navigasi */}
        <Link
          className="btn btn-primary"
          to="#"
          style={{ minWidth: "320px", margin: "20px", marginBottom: "0px" }}
          onClick={() => this.postNewSoal()}
        >
          Simpan dan Lanjutkan
        </Link>
        <br />
        <Link
          className="btn btn-primary"
          style={{ minWidth: "320px", margin: "20px", marginBottom: "0px" }}
          to="/tambah-ujian"
        >
          Kembali ke Menu Sebelumnya
        </Link>
        {/* Kumpulan Button Navigasi (end) */}

        {/* Navigasi Soal */}
        <div style={{ margin: "20px" }}>

          <select
            className="form-control"
            onChange={e => this.onSwitchSoal(e)}
            value={no_soal}
          >
            <option>Navigasi Soal</option>
            {this.props.current_all_soal.map((item, key) => {
              return (
                <option key={key} value={item.no_soal}>
                  {item.no_soal}
                </option>
              );
            })}
          </select>
        </div>
        {/* Navigasi Soal (end) */}

        {/* Footer */}
        <div style={{marginTop:'80px'}}></div>
        <footer
          className="footer"
          style={{
            position: "fixed",
            height: "55px",
            bottom: "0",
            width: "500px"
          }}
        >
          <MenuBawah />
        </footer>
        {/* Footer (end) */}

      </div>
    );
  }
}

export default connect(
  "listNamaKelas, listMapel, id_paket_soal, current_all_soal, jumlah_soal, current_jumlah_soal,token",
  actions
)(withRouter(HalamanEdit));
