import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import Select from "react-select";

import s from "../components/Tables.module.scss";
import mock from "../components/mock.jsx";
import { useParams } from "react-router";

const FormRoom = function () {
  let { id } = useParams();
  id = parseInt(id);
  const [roomData] = useState(mock.rooms);
  const [beaconData] = useState(mock.beacons);
  const [oldData, setOldData] = useState();

  useEffect(() => {
    if (id) {
      roomData.map((item) => {
        if (item.id === id) {
          setOldData(item);
        }
      });
    }
  }, []);

  const getOldUUID = (oldUUID) => {
    beaconData.map((item, index) => {
      if (item.uuid === oldUUID) return beaconData[index];
    });
  };

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">
                    {id ? "Update Ruangan" : "Tambah Ruangan"}
                  </div>
                </div>
                <form
                  onSubmit={() => {
                    console.log("submitted");
                  }}
                >
                  <div className="px-4">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control py-4"
                        placeholder="Nama Ruangan/Lab"
                        aria-label="Nama Ruangan/Lab"
                        defaultValue={oldData?.ruangan}
                      />
                    </div>
                    <Select
                      value={beaconData.value}
                      options={beaconData}
                      // defaultValue={getOldUUID(oldData.uuid)}
                    />
                    <Button
                      className="rounded-pill float-right mt-3 mb-4"
                      color="primary"
                    >
                      {id ? "Update Ruangan" : "Tambah Ruangan"}
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

export default FormRoom;
