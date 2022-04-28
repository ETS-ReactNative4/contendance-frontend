import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
} from "reactstrap";
import Widget from "../../components/Widget/Widget.js";
import moreIcon from "../../assets/tables/moreIcon.svg";

import s from "../components/Tables.module.scss";
import mock from "../components/mock.jsx";
import { Link } from "react-router-dom";
import { deleteBeacon, getAllBeacons } from "../../api/BeaconAPI.js";
import { toast } from "react-toastify";
import {
  notificationOptions,
  swalWithBootstrapButtons,
} from "../../utils/index.js";
import Notification from "../../components/Notification/Notification.js";
import Swal from "sweetalert2";

const Beacons = function () {
  const [beaconTable] = useState(mock.beacons);
  const [beaconDatas, setBeaconDatas] = useState([]);
  const [uuid, setUuid] = useState("");
  const [beaconTableCurrentPage, setSecondTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);
  const pageSize = 10;
  const beaconTablePagesCount = Math.ceil(beaconTable.length / pageSize);
  const columns = ["UUID", "Ruangan", "Status"];
  const pageName = "Beacon";

  const getBeaconsData = async () => {
    const res = await getAllBeacons();
    setBeaconDatas(res);
  };

  const setBeaconTablePage = (e, index) => {
    e.preventDefault();
    setSecondTableCurrentPage(index);
  };

  const beaconMenuOpen = (data) => {
    setUuid(data.uuid);
    setBeaconDatas(
      beaconDatas?.map((item) => {
        if (item.id === data.id) {
          item.dropdownOpen = !item.dropdownOpen;
        }
        return item;
      })
    );
  };

  const tableMenuOpen = () => {
    setTableMenuOpen(!tableDropdownOpen);
  };

  const handleDelete = (id) => {
    swalWithBootstrapButtons
      .fire({
        title: `Anda yakin menghapus ${pageName}?`,
        html: `Anda akan menghapus Beacon <b>${uuid}</b>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Tidak, batal",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteBeacon(id);
          if (res.status === 200) {
            Swal.close();
            getBeaconsData();
            toast(
              <Notification
                type="success"
                message={`<span class='body-2'>${pageName}</span> berhasil dihapus!`}
                withIcon
              />,
              notificationOptions
            );
          }
        } else if (Swal.close()) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });

    // const res = await deleteBeacon(id);
    // if (res.status === 200) {
    //   getBeaconsData();
    //   toast(
    //     <Notification
    //       type="success"
    //       message={`<span class='body-2'>${pageName}</span> berhasil dihapus!`}
    //       withIcon
    //     />,
    //     notificationOptions
    //   );
    // } else {
    //   toast(
    //     <Notification
    //       type="error"
    //       message={`<span class='body-2'>${pageName}</span> gagal dihapus!`}
    //       withIcon
    //     />,
    //     notificationOptions
    //   );
    // }
  };

  useEffect(() => {
    getBeaconsData();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Daftar Beacon</div>
                  <div className="d-flex">
                    <Link to="beacons/create-beacon">
                      <Button className="rounded-pill mr-3" color="primary">
                        Tambah Beacon
                      </Button>
                    </Link>
                    <Dropdown
                      className="d-none d-sm-block"
                      nav
                      isOpen={tableDropdownOpen}
                      toggle={() => tableMenuOpen()}
                    >
                      <DropdownToggle nav>
                        <img
                          className="d-none d-sm-block"
                          src={moreIcon}
                          alt="More..."
                        />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <div>Copy</div>
                        </DropdownItem>
                        <DropdownItem>
                          <div>Edit</div>
                        </DropdownItem>
                        <DropdownItem>
                          <div>Delete</div>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <div className="widget-table-overflow">
                  <Table
                    className="table-striped table-borderless table-hover"
                    responsive
                  >
                    <thead>
                      <tr>
                        <th>
                          <div className="checkbox checkbox-primary">
                            <input
                              id="checkbox200"
                              className="styled"
                              type="checkbox"
                            />
                            <label htmlFor="checkbox200" />
                          </div>
                        </th>
                        {columns.map((col, index) => (
                          <th key={index}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {beaconDatas.length === 0 ? (
                        <tr>
                          <td colSpan="4">
                            <h5 className=" text-center my-3">
                              Belum ada data
                            </h5>
                          </td>
                        </tr>
                      ) : (
                        beaconDatas
                          ?.slice(
                            beaconTableCurrentPage * pageSize,
                            (beaconTableCurrentPage + 1) * pageSize
                          )
                          ?.map((item) => (
                            <tr key={uuidv4()}>
                              <td>
                                <div className="checkbox checkbox-primary">
                                  <input
                                    id={item?.id}
                                    className="styled"
                                    type="checkbox"
                                  />
                                  <label htmlFor={item?.id} />
                                </div>
                              </td>
                              <td>{item?.uuid}</td>
                              <td>
                                {item?.ruangan === undefined
                                  ? "-"
                                  : item?.ruangan}
                              </td>
                              <td>
                                <Badge color={item?.color}>
                                  {item?.status}
                                </Badge>
                              </td>
                              <td>
                                <Dropdown
                                  className="d-none d-sm-block"
                                  nav
                                  isOpen={item?.dropdownOpen}
                                  toggle={() => beaconMenuOpen(item)}
                                >
                                  <DropdownToggle nav>
                                    <img
                                      className="d-none d-sm-block"
                                      src={moreIcon}
                                      alt="More ..."
                                    />
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem>
                                      <Link
                                        to={`beacons/edit-beacon/${item?.id}`}
                                      >
                                        <div>Edit</div>
                                      </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                      <div
                                        className="secondary-red"
                                        onClick={() => handleDelete(item?.id)}
                                      >
                                        Delete
                                      </div>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>
                  <Pagination className="pagination-with-border">
                    <PaginationItem disabled={beaconTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setBeaconTablePage(e, beaconTableCurrentPage - 1)
                        }
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(beaconTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === beaconTableCurrentPage}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => setBeaconTablePage(e, i)}
                          href="#top"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        beaconTableCurrentPage >= beaconTablePagesCount - 1
                      }
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setBeaconTablePage(e, beaconTableCurrentPage + 1)
                        }
                        next
                        href="#top"
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Beacons;
