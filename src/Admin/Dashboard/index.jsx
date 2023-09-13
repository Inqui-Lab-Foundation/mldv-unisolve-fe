/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { Descriptions, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Col, Container, Row, CardBody, CardText } from 'reactstrap';

import { Button } from '../../stories/Button';
import Layout from '../Layout';
import {
    deleteTempMentorById,
    teacherResetPassword
} from '../store/admin/actions';
import './dashboard.scss';
import { useHistory } from 'react-router-dom';
import jsPDF from 'jspdf';
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { URL, KEY } from '../../constants/defaultValues';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import logout from '../../assets/media/logout.svg';
import { useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';

import {
    getCurrentUser,
    getNormalHeaders,
    openNotificationWithIcon
} from '../../helpers/Utils';
const Dashboard = () => {
    // here we can see the registration details //
    const history = useHistory();
    const dispatch = useDispatch();
    const pdfRef = React.useRef(null);
    const inputField = {
        type: 'text',
        className: 'defaultInput'
    };
    const currentUser = getCurrentUser('current_user');
    const [diesCode, setDiesCode] = useState('');
    const [orgData, setOrgData] = useState({});
    const [mentorId, setMentorId] = useState('');
    const [SRows, setSRows] = React.useState([]);
    const [mentorTeam, setMentorTeam] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState('');
    const handleOnChange = (e) => {
        // we can give diescode as input //
        //where organization_code = diescode //
        localStorage.removeItem('organization_code');
        setCount(0);
        setDiesCode(e.target.value);
        setOrgData({});
        setError('');
    };
    useEffect(() => {
        // where list = diescode //
        //where organization_code = diescode //
        const list = JSON.parse(localStorage.getItem('organization_code'));
        setDiesCode(list);
        apiCall(list);
    }, []);
    async function apiCall(list) {
        // Dice code list API //
        // where list = diescode //
        const body = JSON.stringify({
            organization_code: list
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };

        await axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setOrgData(response?.data?.data[0]);
                    setCount(count + 1);
                    setMentorId(response?.data?.data[0]?.mentor.mentor_id);
                    setError('');

                    if (response?.data?.data[0]?.mentor.mentor_id) {
                        getMentorIdApi(
                            response?.data?.data[0]?.mentor.mentor_id
                        );
                    }
                }
            })
            .catch(function (error) {
                if (error?.response?.data?.status === 404) {
                    setError('Entered Invalid UDISE Code');
                }
                setOrgData({});
            });
    }

    const handleSearch = (e) => {
        //where we can search through diescode //
        // we can see Registration Details & Mentor Details //

        const body = JSON.stringify({
            organization_code: diesCode
        });
        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/checkOrg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };

        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    setOrgData(response?.data?.data[0]);
                    setCount(count + 1);
                    setMentorId(response?.data?.data[0]?.mentor.mentor_id);
                    setError('');
                    if (response?.data?.data[0]?.mentor.mentor_id) {
                        getMentorIdApi(
                            response?.data?.data[0]?.mentor.mentor_id
                        );
                    }
                }
            })
            .catch(function (error) {
                if (error?.response?.data?.status === 404) {
                    setError('Entered Invalid Unique Code');
                }
                setOrgData({});
            });
        e.preventDefault();
    };

    async function getMentorIdApi(id) {
        // Mentor Id  Api//
        // id = Mentor Id //
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        axiosConfig['params'] = {
            mentor_id: id,
            status: 'ACTIVE',
            ideaStatus: true
        };
        await axios
            .get(`${URL.getTeamMembersList}`, axiosConfig)
            .then((res) => {
                if (res?.status == 200) {
                    var mentorTeamArray = [];
                    res &&
                        res.data &&
                        res.data.data[0] &&
                        res.data.data[0].dataValues.length > 0 &&
                        res.data &&
                        res.data.data[0].dataValues.map((teams, index) => {
                            var key = index + 1;
                            return mentorTeamArray.push({ ...teams, key });
                        });
                    setMentorTeam(mentorTeamArray);
                }
            })
            .catch((err) => {
                return err.response;
            });
    }

    const handleEdit = () => {
        //  here  We can edit the Registration details //
        // Where data = orgData //
        history.push({
            pathname: '/admin/edit-user-profile',
            data: {
                full_name: orgData.mentor?.full_name,
                // mobile: orgData.mentor?.mobile,
                username: orgData.mentor?.user?.username,
                mentor_id: orgData.mentor?.mentor_id,
                where: 'Dashbord',
                organization_code: orgData.organization_code
            }
        });
    };

    const handleresetpassword = (data) => {
        //  here we can reset the password as disecode //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'You are attempting to reset the password',
                text: 'Are you sure?',
                imageUrl: `${logout}`,
                showCloseButton: true,
                confirmButtonText: 'Reset Password',
                showCancelButton: true,
                cancelButtonText: 'cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(
                        teacherResetPassword({
                            organization_code: data.organization_code,
                            mentor_id: data.mentor_id,
                            otp: false
                        })
                    );
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Reset password is cancelled',
                        'error'
                    );
                }
            })
            .catch((err) => console.log(err.response));
    };
    const downloadPDF = () => {
        // where we can download the Registration Details //
        const content = pdfRef.current;
        const doc = new jsPDF('p', 'px', [1280, 1020]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('Detail.pdf');
            }
        });
        console.warn(content);
    };
    const viewDetails = () => {
        // where we can see all details //
        // where orgData = orgnization details , Mentor details //
        history.push({
            pathname: '/admin/View-More-details',
            data: orgData
        });
        localStorage.setItem('orgData', JSON.stringify(orgData));
    };
    const MentorsData = {
        data: mentorTeam,
        columns: [
            {
                name: 'No',
                selector: 'key',
                width: '12%'
            },
            {
                name: 'Team Name',
                selector: 'team_name',
                sortable: true,
                center: true,
                width: '25%'
            },
            {
                name: 'Student Count',
                selector: 'student_count',
                center: true,
                width: '20%'
            },
            {
                name: 'Idea Sub Status',
                selector: 'ideaStatus',
                center: true,
                width: '25%'
            },
            {
                name: 'Actions',
                cell: (params) => {
                    return [
                        <Link
                            key={params}
                            exact="true"
                            onClick={() =>
                                handleRevoke(
                                    params.challenge_response_id,
                                    params.ideaStatus
                                )
                            }
                        >
                            {params.ideaStatus == 'SUBMITTED' && (
                                <div className="btn btn-success btn-lg mr-5 mx-2">
                                    Revoke
                                </div>
                            )}
                        </Link>
                    ];
                },
                width: '20%',
                center: true
            }
        ]
    };
    const handleRevoke = async (id, type) => {
        // where id = challenge response id //
        // here we  can see the Revoke button when ever idea is submitted //
        // where type = ideaStatus //
        let submitData = {
            status: type == 'DRAFT' ? 'SUBMITTED' : 'DRAFT'
        };
        var config = {
            method: 'put',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/challenge_response/updateEntry/' +
                JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: submitData
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    openNotificationWithIcon(
                        'success',
                        'Idea Submission Status Successfully Update!',
                        ''
                    );
                    getMentorIdApi(mentorId);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleAlert = (id) => {
        // where id = mentor.userid //
        // we can delete the userid //
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
            allowOutsideClick: false
        });

        swalWithBootstrapButtons
            .fire({
                title: 'You are Delete Organization',
                text: 'Are you sure?',
                showCloseButton: true,
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    if (result.isConfirmed) {
                        deleteTempMentorById(id);
                        setOrgData({});
                        setDiesCode('');
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', '', 'error');
                }
            });
    };
    useEffect(() => {
        adminTeamsCount();
        adminSudentCount();
        adminideasCount();
        adminMentorCount();
        adminSudentbygenderCount();
        adminSchoolCount();
        adminmentorCourseCount();
        adminStudentCourseCount();
    }, []);

    const [totalteamsCount, setTotalteamsCount] = useState('-');
    const [totalStudentCount, setTotalStudentCount] = useState('-');
    const [totalideasCount, setTotalideasCount] = useState('-');
    const [totalSubmittedideasCount, setTotalSubmittedideasCount] =
        useState('-');
    const [totalMentorCount, setTotalMentorCount] = useState('-');
    const [totalMentorMaleCount, setTotalMentorMaleCount] = useState('-');
    const [totalStudentMaleCount, setTotalStudentMaleCount] = useState('-');
    const [totalStudentFemaleCount, setTotalStudentFemaleCount] = useState('-');
    const [totalSchoolCount, setTotalSchoolCount] = useState('-');
    const [mentorCoursesCompletedCount, setMentorCoursesCompletedCount] =
        useState('-');
    const [studentCoursesCompletedCount, setStudentCoursesCompletedCount] =
        useState('-');
    const [totalstudentCoursesCount, setTotalstudentCoursesCount] =
        useState('-');

    const adminTeamsCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/teamCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalteamsCount(response.data.data[0].teams_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminSudentCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/studentCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalStudentCount(response.data.data[0].student_count);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminideasCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/ideasCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalideasCount(response.data.data[0].initiated_ideas);
                    setTotalSubmittedideasCount(
                        response.data.data[0].submitted_ideas
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminMentorCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/mentorCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalMentorCount(response.data.data[0].mentorCount);
                    setTotalMentorMaleCount(response.data.data[0].mentorMale);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminSudentbygenderCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/studentCountbygender`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalStudentMaleCount(response.data.data[0].studentMale);
                    setTotalStudentFemaleCount(
                        response.data.data[0].studentFemale
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminSchoolCount = () => {
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/dashboard/schoolCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setTotalSchoolCount(response.data.data[0].schoolCount);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminmentorCourseCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/mentorCourseCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setMentorCoursesCompletedCount(
                        response.data.data[0].mentorCoursesCompletedCount
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const adminStudentCourseCount = () => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/studentCourseCount`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setStudentCoursesCompletedCount(
                        response.data.data[0].StudentCoursesCompletedCount
                    );
                    setTotalstudentCoursesCount(response.data.data[0].started);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Layout>
            <div className="dashboard-wrapper pb-5 my-5 px-5">
                <h2 className="mb-5">Dashboard </h2>
                <div className="dashboard p-5 mb-5">
                    <div className="row" style={{ overflow: 'auto' }}>
                        <div className=" row col-xs-12 col-md-7">
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem',
                                    paddingLeft: '2rem'
                                }}
                            >
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Eligible Schools
                                            </label>

                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalSchoolCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Reg Schools
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalMentorCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Reg Teachers
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalMentorCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Teachers Course Completed
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {mentorCoursesCompletedCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem'
                                }}
                            >
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalteamsCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams Submitted Ideas
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalSubmittedideasCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams Ideas in Draft
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalideasCount -
                                                    totalSubmittedideasCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Teams Not initiated Ideas
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalteamsCount -
                                                    totalideasCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem'
                                }}
                            >
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{ height: '150px' }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Students
                                            </label>
                                            <Card.Text
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Students course completed
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {studentCoursesCompletedCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Students course in progress
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalstudentCoursesCount -
                                                    studentCoursesCompletedCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Students Course not started
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentCount -
                                                    totalstudentCoursesCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                    paddingRight: '20px',
                                    paddingTop: '1rem',
                                    paddingLeft: '2rem'
                                    // height: '150px'
                                }}
                            >
                                {/* <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Male Teachers
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalMentorMaleCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row> */}
                                {/* <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '150px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Female Teachers
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalMentorCount -
                                                    totalMentorMaleCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row> */}

                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '310px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Male Students
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentMaleCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <Row>
                                    <Card
                                        bg="light"
                                        text="dark"
                                        className="mb-4"
                                        style={{
                                            height: '310px'
                                        }}
                                    >
                                        <Card.Body>
                                            <label htmlFor="teams" className="">
                                                Total Female Students
                                            </label>

                                            <Card.Text
                                                className="left-aligned"
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    marginTop: '10px',
                                                    marginBottom: '20px'
                                                }}
                                            >
                                                {totalStudentFemaleCount}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                        </div>
                        <div className=" row  col-xs-12 col-md-5">
                            <div
                                style={{ flex: 1 }}
                                className="bg-white rounded px-5 py-3 col-lg-12 disc-card-search"
                            >
                                <h2 className="mt-3">
                                    Search Registration Details
                                </h2>
                                <Row className="text-center justify-content-md-center my-4">
                                    <Col md={9} lg={12}>
                                        <Row>
                                            <Col md={9} className="my-auto">
                                                <Input
                                                    {...inputField}
                                                    id="organization_code"
                                                    onChange={(e) =>
                                                        handleOnChange(e)
                                                    }
                                                    value={diesCode}
                                                    name="organization_code"
                                                    placeholder="Enter Unique Code"
                                                    className="w-100 mb-3 mb-md-0"
                                                    style={{
                                                        borderRadius: '60px',
                                                        padding: '9px 11px'
                                                    }}
                                                />
                                            </Col>
                                            <Col md={3} className="partner-btn">
                                                <Button
                                                    label={'Search'}
                                                    style={{
                                                        fontSize: '15px',
                                                        height: '35px'
                                                    }}
                                                    btnClass="primary mx-3 w-100"
                                                    size="small"
                                                    onClick={(e) =>
                                                        handleSearch(e)
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                {orgData &&
                                orgData?.organization_name &&
                                orgData?.mentor !== null ? (
                                    <>
                                        {/* <div>
                                        <Descriptions
                                            bordered
                                            className='mt-3 text-left p-4'
                                            column={{ xxl: 1, xl: 1, lg: 1, md: 3, sm: 2, xs: 1 }}
                                        >
                                            <Descriptions.Item label="School">{orgData.organization_name}</Descriptions.Item>
                                            <Descriptions.Item label="City">{orgData.city}</Descriptions.Item>
                                            <Descriptions.Item label="District">{orgData.district}</Descriptions.Item>
                                            <Descriptions.Item label="Faculty Name">{orgData.mentor?.full_name}</Descriptions.Item>
                                            <Descriptions.Item label="Faculty Mobile">{orgData.mentor?.mobile}</Descriptions.Item>
                                            <Descriptions.Item label="Faculty email">{orgData.mentor?.user?.username}</Descriptions.Item>
                                        </Descriptions>
                                    </div> */}
                                        <div ref={pdfRef}>
                                            <div className="row">
                                                <div className="col">
                                                    <h2 className="text-center m-3 text-primary">
                                                        Registration Detail
                                                    </h2>
                                                    <hr />
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>School</p>
                                                            </Col>
                                                            <Col
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>
                                                                    {
                                                                        orgData.organization_name
                                                                    }
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>City</p>
                                                            </Col>
                                                            <Col
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>
                                                                    {
                                                                        orgData.city
                                                                    }
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>District</p>
                                                            </Col>
                                                            <Col
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>
                                                                    {
                                                                        orgData.district
                                                                    }
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>
                                                                    Mentor Name
                                                                </p>
                                                            </Col>
                                                            <Col
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>
                                                                    {
                                                                        orgData
                                                                            .mentor
                                                                            ?.full_name
                                                                    }
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="pt-3 pb-3">
                                                            <Col
                                                                xs={5}
                                                                sm={5}
                                                                md={5}
                                                                xl={5}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>
                                                                    Mentor Email
                                                                </p>
                                                            </Col>
                                                            <Col
                                                                xs={1}
                                                                sm={1}
                                                                md={1}
                                                                xl={1}
                                                            >
                                                                :
                                                            </Col>
                                                            <Col
                                                                xs={6}
                                                                sm={6}
                                                                md={6}
                                                                xl={6}
                                                                className="my-auto profile-detail"
                                                            >
                                                                <p>
                                                                    {
                                                                        orgData
                                                                            .mentor
                                                                            ?.user
                                                                            ?.username
                                                                    }
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between flex-column flex-md-row">
                                            <button
                                                onClick={handleEdit}
                                                className="btn  rounded-pill px-4  text-white mt-2 mt-md-0 ml-md-2"
                                                style={{
                                                    backgroundColor: '#ffcb34'
                                                }}
                                                // onClick={() => handleEdit()}
                                                // className="btn btn-warning btn-lg"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleresetpassword({
                                                        mentor_id:
                                                            orgData.mentor
                                                                .mentor_id,
                                                        organization_code:
                                                            orgData.organization_code
                                                    })
                                                }
                                                // className="btn btn-info rounded-pill px-4 btn-lg text-white"
                                                className="btn btn-info rounded-pill px-4  text-white mt-2 mt-md-0 ml-md-2"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={() => {
                                                    downloadPDF();
                                                }}
                                                // className="btn btn-primary rounded-pill px-4 btn-lg"
                                                className="btn btn-primary rounded-pill px-4 mt-2 mt-md-0 ml-md-2"
                                            >
                                                Download
                                            </button>
                                            <button
                                                onClick={viewDetails}
                                                // className="btn btn-success rounded-pill px-4 btn-lg"
                                                className="btn btn-success rounded-pill px-4 mt-2 mt-md-0 ml-md-2"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleAlert(
                                                        orgData.mentor?.user_id
                                                    );
                                                }}
                                                // className="btn btn-danger btn-lg"
                                                className="btn  btn-lg  rounded-pill mt-2 mt-md-0 ml-md-2"
                                                style={{
                                                    backgroundColor: '#dc3545'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <div className="mb-5 p-3">
                                            <div className="container-fluid card shadow border">
                                                <div className="row">
                                                    <div className="col">
                                                        <h2 className="text-center m-3 text-primary">
                                                            Teams Registered
                                                        </h2>
                                                        <hr />
                                                    </div>
                                                </div>
                                                <div>
                                                    <DataTableExtensions
                                                        print={false}
                                                        export={false}
                                                        // style={{ fontSize: '10' }}
                                                        {...MentorsData}
                                                    >
                                                        <DataTable
                                                            // data={SRows}
                                                            // style={{ fontSize: 8 }}
                                                            noHeader
                                                            defaultSortField="id"
                                                            defaultSortAsc={
                                                                false
                                                            }
                                                            // pagination
                                                            highlightOnHover
                                                            // fixedHeader
                                                            // subHeaderAlign={
                                                            //     Alignment.Center
                                                            // }
                                                        />
                                                    </DataTableExtensions>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // !error &&
                                    // diesCode &&
                                    // orgData !== {} &&
                                    count != 0 && (
                                        // <Card className="mt-3 p-4">
                                        <div className="text-success fs-highlight d-flex justify-content-center align-items-center">
                                            <span>
                                                Still No Teacher Registered
                                            </span>
                                        </div>
                                        // </Card>
                                    )
                                )}
                                {error && diesCode && (
                                    // <Card className="mt-3 p-4">
                                    <div className="text-danger mt-3 p-4 fs-highlight d-flex justify-content-center align-items-center">
                                        <span>{error}</span>
                                    </div>
                                )}
                                {!diesCode && (
                                    // <Card className="mt-3 p-4">

                                    <div className="d-flex  mt-3 p-4 justify-content-center align-items-center">
                                        <span className="text-primary fs-highlight">
                                            Enter Unique Code
                                        </span>
                                    </div>
                                    // </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
