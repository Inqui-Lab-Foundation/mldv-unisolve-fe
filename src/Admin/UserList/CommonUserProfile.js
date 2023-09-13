/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import Layout from '../../Admin/Layout';
import { useHistory, withRouter } from 'react-router-dom';
import { Container, Row, Card, CardBody, CardText } from 'reactstrap';
import { BreadcrumbTwo } from '../../stories/BreadcrumbTwo/BreadcrumbTwo';
import { Button } from '../../stories/Button';
import { useTranslation } from 'react-i18next';
import { studentResetPassword } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import {
    // getNormalHeaders,
    getCurrentUser,
    openNotificationWithIcon
} from '../../helpers/Utils';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import logout from '../../assets/media/logout.svg';
import {
    getStudentDashboardStatus,
    getStudentDashboardTeamProgressStatus
} from '../../redux/studentRegistration/actions';
import { useSelector } from 'react-redux';

const CommonUserProfile = (props) => {
    // console.log(props, 'data');
    // console.log('props', props);
    const history = useHistory();
    const StudentsDaTa = JSON.parse(localStorage.getItem('studentData'));
    // const OrgDaTa = JSON.parse(localStorage.getItem('orgData'));
    const [course, setCourse] = useState([]);

    console.log(StudentsDaTa, '1');
    // const currentUser = getCurrentUser('current_user');
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentUser = getCurrentUser('current_user');

    const headingDetails = {
        title: 'User List Details',

        options: [
            {
                title: 'User List',
                path: '/admin/userlist'
            },
            {
                title: 'User List Profile',
                path: '/admin/userlist'
            }
        ]
    };
    const dashboardStatus = useSelector(
        (state) => state?.studentRegistration.dashboardStatus
    );
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const dashboardTeamProgressStatus = useSelector(
        (state) => state?.studentRegistration.dashboardTeamProgressStatus
    );
    useEffect(() => {
        if (currentUser) {
            dispatch(getStudentDashboardStatus(StudentsDaTa.user_id, language));
            dispatch(
                getStudentDashboardTeamProgressStatus(
                    currentUser?.data[0]?.user_id,
                    language
                )
            );
        }
    }, [currentUser?.data[0]?.user_id, language]);
    useEffect(() => {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                `/dashboard/quizscores?user_id=${StudentsDaTa.user_id}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setCourse(response.data.data[0]?.scores);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const handleViewBack = () => {
        history.push({
            pathname: '/admin/userlist'
        });
        localStorage.setItem('dist', props.location.dist);
        localStorage.setItem('num', props.location.num);
        // localStorage.setItem(
        //     'mentor',
        //     JSON.stringify(mentor.organization_code)
        // );
    };
    // const handleReset = () => {
    //     // where we can reset the password  as diesCode //

    //     const body = JSON.stringify({
    //         organization_code:
    //             props.location.data && props.location.data?.organization_code,
    //         mentor_id: props.location.data && props.location.data.mentor_id,
    //         otp: false
    //     });
    //     var config = {
    //         method: 'put',
    //         url: process.env.REACT_APP_API_BASE_URL + '/mentors/resetPassword',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${currentUser?.data[0]?.token}`
    //         },
    //         data: body
    //     };
    //     axios(config)
    //         .then(function (response) {
    //             if (response.status === 202) {
    //                 openNotificationWithIcon(
    //                     'success',
    //                     'Reset Password Successfully Update!',
    //                     ''
    //                 );
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };
    const handleReset = () => {
        // here we can reset password as  user_id //
        // here data = student_id //
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
                cancelButtonText: t('general_req.btn_cancel'),
                reverseButtons: false
            })
            .then((result) => {
                if (result.isConfirmed) {
                    dispatch(
                        studentResetPassword({
                            user_id: StudentsDaTa.user_id.toString()
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
    const handleEdit = () => {
        history.push({
            pathname: '/admin/student/edit-user-profile',
            data: {
                Age: StudentsDaTa.Age,
                Gender: StudentsDaTa.Gender,
                Grade: StudentsDaTa.Grade,
                student_id: StudentsDaTa.student_id,
                team_id: StudentsDaTa?.team.team_id,
                full_name: StudentsDaTa.full_name
            }
        });
    };
    // const handleEdit = () => {
    //     // where we can edit  the users data //
    //     history.push({
    //         pathname: '/admin/edit-user-profile',
    //         data: {
    //             username: props.location.data && props.location.data.username,
    //             full_name: props.location.data && props.location.data.full_name,
    //             organization_code:
    //                 props.location.data &&
    //                 props.location.data?.organization_code,
    //             mentor_id: props.location.data && props.location.data.mentor_id
    //             // where: 'Dashbord'
    //         }
    //     });
    // };

    return (
        <Layout>
            <Container className="mt-5 pt-5 dynamic-form">
                <Row>
                    <div className="col-6">
                        <BreadcrumbTwo {...headingDetails} />
                    </div>
                    <div className="col-6 text-end">
                        <Button
                            btnClass="btn btn-primary"
                            size="small"
                            label="Edit"
                            onClick={handleEdit}
                        />
                        <Button
                            btnClass="btn btn-success"
                            size="small"
                            label="Reset"
                            onClick={handleReset}
                        />
                        {/* <Button
                            btnClass="btn btn-info"
                            size="small"
                            label="Download"
                        /> */}
                        {/* <Button
                            btnClass="btn btn-success"
                            size="small"
                            label="View Details"
                        /> */}
                        {/* <Button
                            btnClass="btn btn-danger"
                            size="small"
                            label="Delete"
                        /> */}
                        <Button
                            btnClass={'primary'}
                            size="small"
                            // onClick={() => history.push('/admin/userlist')}
                            label="Back"
                            onClick={handleViewBack}
                        />
                    </div>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            <CardText>
                                <span className="mx-3">
                                    <b>Name :</b>
                                </span>
                                <b>
                                    {StudentsDaTa.full_name
                                        ? StudentsDaTa.full_name
                                        : '-'}
                                    {/* {props.location.data &&
                                    props.location.data.full_name
                                        ? props.location.data &&
                                          props.location.data.full_name
                                        : '-'}{' '} */}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Class :</b>
                                </span>
                                <b>
                                    {StudentsDaTa.Grade
                                        ? StudentsDaTa.Grade
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b> Gender :</b>
                                </span>
                                <b>
                                    {StudentsDaTa.Gender
                                        ? StudentsDaTa.Gender
                                        : '-'}
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Age :</b>
                                </span>
                                <b>
                                    {StudentsDaTa.Age ? StudentsDaTa.Age : '-'}
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Mentor Name :</b>
                                </span>
                                <b>
                                    {StudentsDaTa.team?.mentor.full_name
                                        ? StudentsDaTa.team?.mentor.full_name
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Team Name :</b>
                                </span>
                                <b>
                                    {StudentsDaTa?.team.team_name
                                        ? StudentsDaTa?.team.team_name
                                        : '-'}
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
                <Row className="my-5">
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Institution Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b>Unique Code:</b>
                                </span>
                                <b>
                                    {/* {StudentsDaTa.team &&
                                    StudentsDaTa.team.mentor &&
                                    StudentsDaTa.team.mentor.organization
                                        .organization_code
                                        ? StudentsDaTa.team &&
                                          StudentsDaTa.team.mentor &&
                                          StudentsDaTa.team.mentor.organization
                                              .organization_code
                                        : '-'} */}
                                    {StudentsDaTa?.team?.mentor?.organization
                                        .organization_code
                                        ? StudentsDaTa?.team?.mentor
                                              ?.organization.organization_code
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>School Name:</b>
                                </span>

                                <b>
                                    {/* {
                                        StudentsDaTa?.team?.mentor?.organization
                                            .organization_name
                                    } */}
                                    {StudentsDaTa?.team?.mentor?.organization
                                        .organization_name
                                        ? StudentsDaTa?.team?.mentor
                                              ?.organization.organization_name
                                        : '-'}
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>District:</b>
                                </span>
                                <b>
                                    {StudentsDaTa?.team?.mentor?.organization
                                        .district
                                        ? StudentsDaTa?.team?.mentor
                                              ?.organization.district
                                        : '-'}
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
                <Row>
                    <Card className="py-5">
                        <CardBody>
                            <h2 className="mb-4">Course Details</h2>

                            <CardText>
                                <span className="mx-3">
                                    <b>Completed Videos :</b>
                                </span>
                                <b>
                                    {dashboardStatus &&
                                    dashboardStatus?.videos_completed_count
                                        ? dashboardStatus?.videos_completed_count
                                        : '-'}
                                </b>
                            </CardText>

                            <CardText>
                                <span className="mx-3">
                                    <b>Completed Quiz :</b>
                                </span>
                                <b>
                                    {dashboardStatus &&
                                    dashboardStatus?.quiz_completed_count
                                        ? dashboardStatus?.quiz_completed_count
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Course Completion :</b>
                                </span>
                                <b>
                                    {dashboardStatus?.topics_completed_count !==
                                    undefined
                                        ? `${
                                              Math.round(
                                                  (dashboardStatus?.topics_completed_count /
                                                      dashboardStatus?.all_topics_count) *
                                                      100
                                              ) + '%'
                                          }`
                                        : '-'}
                                </b>
                            </CardText>
                            <CardText>
                                <span className="mx-3">
                                    <b>Earned Badges :</b>
                                </span>
                                <b>
                                    {dashboardStatus &&
                                    dashboardStatus?.badges_earned_count
                                        ? dashboardStatus?.badges_earned_count
                                        : '-'}
                                </b>
                            </CardText>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </Layout>
    );
};

export default withRouter(CommonUserProfile);
