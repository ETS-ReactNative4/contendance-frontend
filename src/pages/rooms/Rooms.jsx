import React, { useState } from "react";
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

const Rooms = function () {
  const [roomTable] = useState(mock.rooms);
  const [roomData, setRoomData] = useState(mock.rooms);
  const [roomTableCurrentPage, setSecondTableCurrentPage] = useState(0);
  const [tableDropdownOpen, setTableMenuOpen] = useState(false);

  const pageSize = 10;
  const roomTablePagesCount = Math.ceil(roomTable.length / pageSize);

  const setBeaconTablePage = (e, index) => {
    e.preventDefault();
    setSecondTableCurrentPage(index);
  };

  const beaconMenuOpen = (id) => {
    setRoomData(
      roomData.map((item) => {
        if (item.id === id) {
          item.dropdownOpen = !item.dropdownOpen;
        }
        return item;
      })
    );
  };

  const tableMenuOpen = () => {
    setTableMenuOpen(!tableDropdownOpen);
  };

  const columns = ["", "Ruangan", "UUID Beacon", "Status"];

  return (
    <div>
      <Row>
        <Col>
          <Row className="mb-4">
            <Col>
              <Widget>
                <div className={s.tableTitle}>
                  <div className="headline-2">Daftar Ruangan</div>
                  <div className="d-flex">
                    <Link to="rooms/create-room">
                      <Button className="rounded-pill mr-3" color="primary">
                        Tambah Ruangan
                      </Button>
                    </Link>
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
                      {roomData
                        .slice(
                          roomTableCurrentPage * pageSize,
                          (roomTableCurrentPage + 1) * pageSize
                        )
                        .map((item) => (
                          <tr key={uuidv4()}>
                            <td>
                              <div className="checkbox checkbox-primary">
                                <input
                                  id={item.id}
                                  className="styled"
                                  type="checkbox"
                                />
                                <label htmlFor={item.checkboxId} />
                              </div>
                            </td>
                            <td className="d-flex align-items-center">
                              <span
                                className={`${s.avatar} rounded-circle float-left mr-2`}
                              >
                                <img
                                  className={s.image}
                                  src={item.img}
                                  alt="Rooms"
                                />
                              </span>
                            </td>
                            <td>{item.ruangan}</td>
                            <td>{item.uuid}</td>
                            <td>
                              <Badge color={item.color}>{item.status}</Badge>
                            </td>
                            <td>
                              <Dropdown
                                className="d-none d-sm-block"
                                nav
                                isOpen={item.dropdownOpen}
                                toggle={() => beaconMenuOpen(item.id)}
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
                                    <Link to={`rooms/edit-room/${item.id}`}>
                                      <div>Edit</div>
                                    </Link>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <Link
                                      to={`rooms/delete-room/${item.id}`}
                                      className="secondary-red"
                                    >
                                      <div className="secondary-red">
                                        Delete
                                      </div>
                                    </Link>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Pagination className="pagination-with-border">
                    <PaginationItem disabled={roomTableCurrentPage <= 0}>
                      <PaginationLink
                        onClick={(e) =>
                          setBeaconTablePage(e, roomTableCurrentPage - 1)
                        }
                        previous
                        href="#top"
                      />
                    </PaginationItem>
                    {[...Array(roomTablePagesCount)].map((page, i) => (
                      <PaginationItem
                        active={i === roomTableCurrentPage}
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
                      disabled={roomTableCurrentPage >= roomTablePagesCount - 1}
                    >
                      <PaginationLink
                        onClick={(e) =>
                          setBeaconTablePage(e, roomTableCurrentPage + 1)
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

export default Rooms;
