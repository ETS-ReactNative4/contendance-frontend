import React, { useEffect, useState } from "react";
import { Col, Row, Button, Input, FormGroup, FormText } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import { useHistory, useParams } from "react-router";
import Swal from "sweetalert2";
import { notificationOptions, setFormData } from "../../utils/index.js";
import { createBeacon } from "../../api/BeaconAPI.js";
import { toast } from "react-toastify";

import s from "../components/Tables.module.scss";
import mock from "../components/mock.jsx";
import Notification from "../../components/Notification/Notification.js";

const FormBeacon = function () {
  const history = useHistory();
  let { id } = useParams();
  id = id !== undefined ? parseInt(id) : undefined;

  const [oldData, setOldData] = useState();
  const pageName = "Beacon";
  const [state, setState] = useState({
    uuid: "",
  });

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = setFormData(state);

    Swal.fire({
      title: `Menyimpan Informasi cover ${pageName}`,
      html: `Mohon tunggu, sedang menyimpan informasi ${pageName}`,
      padding: "30px",
      didOpen: async () => {
        Swal.showLoading();
        let res = null;
        if (!id) {
          res = await createBeacon(payload);
          if (res.status === 201) {
            Swal.close();
            history.push(`/dashboard/${pageName.toLowerCase()}s`);
            toast(
              <Notification
                type="success"
                message={`<span class='body-2'>${pageName}</span> baru berhasil ditambahkan!`}
                withIcon
              />,
              notificationOptions
            );
          } else {
            Swal.close();
            Swal.fire({
              title: `Gagal Menambah ${pageName}!`,
              text: `${res.data.message}`,
              icon: "error",
              confirmButtonText: "OKE!",
            });
          }
        }
      },
      allowOutsideClick: false,
    });
  };

  useEffect(() => {
    if (id) {
      state?.map((item) => {
        if (item.id === id) {
          setOldData(item);
        }
      });
    }
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">
                    {id ? `Update ${pageName}` : `Tambah ${pageName}`}
                  </div>
                </div>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="px-4">
                    <FormGroup className="my-3">
                      <FormText className="mb-2">UUID</FormText>
                      <Input
                        id="uuid"
                        className="input-transparent pl-3"
                        value={state.uuid}
                        onChange={(event) => changeCreds(event)}
                        type="uuid"
                        required
                        name="uuid"
                        placeholder="Beacon UUID"
                      />
                    </FormGroup>
                    <Button
                      className="rounded-pill float-right mt-3 mb-4"
                      color="primary"
                    >
                      {id ? `Update ${pageName}` : `Tambah ${pageName}`}
                    </Button>
                  </div>
                </form>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FormBeacon;
