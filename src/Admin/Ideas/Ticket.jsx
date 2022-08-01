import React from "react";
import { Container, Row } from "reactstrap";
import { Tabs } from "antd";
import TicketDataTable from "./TicketDataTable";
import Layout from "../../Admin/Layout";
import { Tag } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { HiDotsHorizontal } from "react-icons/hi";
import { CommonDropDownComp } from "../../stories/CommonDropdown/CommonDropdownComp";

import PageConstruction from "../../components/PageUnderConstrcution";

const { TabPane } = Tabs;

const TicketsPage = (props) => {
  const callback = (key) => {};

  const filterDropProps = {
    name: "",
    Icon: HiDotsHorizontal,
    options: [
      { name: " Mark as Solved", path: "" },
      { name: "Edit Ticket", path: "" },
      { name: "Delete Ticket", path: "" },
    ],
  };
  const TableProps = {
    data: [
      {
        key: "1",
        name: "#2021-3454",
        status: ["Open"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "2",
        name: "#2021-3454",
        status: ["Solved"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "3",
        name: "#2021-3454",
        status: ["Draft"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "4",
        name: "#2021-3454",
        status: ["Open"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
    ],
    columns: [
      {
        title: "TICKET ID",
        dataIndex: "name",
      },
      {
        title: "STATUS",
        dataIndex: "status",
        render: (status) => (
          <span>
            {status.map((tag) => {
              let color = "gold";
              if (tag === "Solved") {
                color = "green";
              }
              if (tag === "Draft") {
                color = "red";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "CATEGORY",
        dataIndex: "category",
      },
      {
        title: "DISCRIPTION",
        dataIndex: "desc",
      },
      {
        title: "CREATED DATE",
        dataIndex: "createdDate",
      },
      {
        title: "",
        dataIndex: "viewDetails",
        render: (text) => (
          <a
            onClick={() => props.history.push("/admin/idea-details")}
            className='view-link'
          >
            {text}
          </a>
        ),
      },
      {
        title: "",
        dataIndex: "action",
        render: (text) => (
          <CommonDropDownComp
            className='action-dropdown'
            {...filterDropProps}
          />
        ),
      },
    ],
    allbtn: 1,
  };
  const TableOpenProps = {
    data: [
      {
        key: "1",
        name: "#2021-3454",
        status: ["Open"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "2",
        name: "#2021-3054",
        status: ["Open"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "3",
        name: "#2021-3454",
        status: ["Open"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "4",
        name: "#2021-3454",
        status: ["Open"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
    ],
    columns: [
      {
        title: "TICKET ID",
        dataIndex: "name",
      },
      {
        title: "STATUS",
        dataIndex: "status",
        render: (status) => (
          <span>
            {status.map((tag) => {
              let color = "gold";
              if (tag === "Solved") {
                color = "green";
              }
              if (tag === "Draft") {
                color = "red";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "CATEGORY",
        dataIndex: "category",
      },
      {
        title: "DISCRIPTION",
        dataIndex: "desc",
      },
      {
        title: "CREATED DATE",
        dataIndex: "createdDate",
      },
      {
        title: "",
        dataIndex: "viewDetails",
        render: (text) => (
          <a
            onClick={() => props.history.push("/admin/idea-details")}
            className='view-link'
          >
            {text}
          </a>
        ),
      },
      {
        title: "",
        dataIndex: "action",
        render: (text) => (
          <Dropdown
            className='action-dropdown'
            onClick={(e) => {
              // setActionHandler(e, data);
            }}
          >
            <Dropdown.Toggle id='dropdown-action'>
              <div>
                <BsThreeDots
                  color={"#7C7C7C"}
                  style={{
                    backgroundColor: `${"#EEEEEE"}`,
                    height: "26px",
                  }}
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href='#/action-2'
                // onClick={() => setRescheduleShow(true)}
              >
                Mark as Solved
              </Dropdown.Item>
              <Dropdown.Item
                href='#/action-2'
                // onClick={() => setRescheduleShow(true)}
              >
                Edit Ticket
              </Dropdown.Item>
              <Dropdown.Item
                href='#/action-1'
                // onClick={() => setCancelShow(true)}
              >
                Delete Ticket
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ],
    allbtn: 1,
  };
  const TableSolvedProps = {
    data: [
      {
        key: "1",
        name: "#2021-3454",
        status: ["Solved"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "2",
        name: "#2021-3454",
        status: ["Solved"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "3",
        name: "#2021-3454",
        status: ["Solved"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
    ],
    columns: [
      {
        title: "TICKET ID",
        dataIndex: "name",
      },
      {
        title: "STATUS",
        dataIndex: "status",
        render: (status) => (
          <span>
            {status.map((tag) => {
              let color = "gold";
              if (tag === "Solved") {
                color = "green";
              }
              if (tag === "Draft") {
                color = "red";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: "CATEGORY",
        dataIndex: "category",
      },
      {
        title: "DISCRIPTION",
        dataIndex: "desc",
      },
      {
        title: "CREATED DATE",
        dataIndex: "createdDate",
      },
      {
        title: "",
        dataIndex: "viewDetails",
        render: (text) => (
          <a
            onClick={() => props.history.push("/admin/idea-details")}
            className='view-link'
          >
            {text}
          </a>
        ),
      },
      {
        title: "",
        dataIndex: "action",
        render: (text) => (
          <Dropdown
            className='action-dropdown'
            onClick={(e) => {
              // setActionHandler(e, data);
            }}
          >
            <Dropdown.Toggle id='dropdown-action'>
              <div>
                <BsThreeDots
                  color={"#7C7C7C"}
                  style={{
                    backgroundColor: `${"#EEEEEE"}`,
                    height: "26px",
                  }}
                />
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href='#/action-2'
                // onClick={() => setRescheduleShow(true)}
              >
                Mark as Solved
              </Dropdown.Item>
              <Dropdown.Item
                href='#/action-2'
                // onClick={() => setRescheduleShow(true)}
              >
                Edit Ticket
              </Dropdown.Item>
              <Dropdown.Item
                href='#/action-1'
                // onClick={() => setCancelShow(true)}
              >
                Delete Ticket
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ),
      },
    ],
    allbtn: 1,
  };
  const TableDraftProps = {
    data: [
      {
        key: "1",
        name: "#2021-3454",
        status: ["Draft"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
      {
        key: "2",
        name: "#2021-3454",
        status: ["Draft"],
        category: "Payment Gateway",
        desc: "Is the Payment Gateway secure?",
        createdDate: "Dec 30, 2021, 09:42 PM",
        viewDetails: "view details",
        action: <HiDotsHorizontal />,
      },
    ],
    allbtn: 0,
  };
  return (
    <Layout>
      <PageConstruction />
      {/* <Container className='ticket-page mb-50'>
        <Row className='mt-5 pt-5'>
          <h2>Ideas</h2>
          <div className='ticket-data'>
            <Tabs defaultActiveKey='1' onChange={callback}>
              <TabPane tab='All Ideas' key='1'>
                <TicketDataTable {...TableProps} />
              </TabPane>
              <TabPane tab='Latest Ideas' key='2'>
                <TicketDataTable {...TableOpenProps} />
              </TabPane>
              <TabPane tab='Under Evaluation' key='3'>
                <TicketDataTable {...TableSolvedProps} />
              </TabPane>
              <TabPane tab='Evaluation Completed' key='4'>
                <TicketDataTable {...TableDraftProps} />
              </TabPane>
            </Tabs>
          </div>
        </Row>
      </Container> */}
    </Layout>
  );
};

export default TicketsPage;
