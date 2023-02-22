/* eslint-disable indent */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
import 'antd/dist/antd.css';
import { Card, Col, Progress } from 'reactstrap';
import { Table } from 'antd';
import { getAdminTeamsList, getTeamMemberStatus } from '../store/teams/actions';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import DoubleBounce from '../../components/Loaders/DoubleBounce';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Button } from '../../stories/Button';
import IdeaSubmissionCard from '../../components/IdeaSubmissionCard';
import { getStudentChallengeSubmittedResponse } from '../../redux/studentRegistration/actions';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                '#00008b',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                '#00008b',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }
    ]
};
export const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 1
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'left'
        },
        title: {
            display: true,
            text: 'Student progress'
        }
    }
};

export default function DoughnutChart({ user }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { teamsList, teamsMembersStatus, teamsMembersStatusErr } =
        useSelector((state) => state.teams);
    // here teamsList = we can select the teams //
    // here  teamsMembersStatus =  teams //
    const [teamId, setTeamId] = useState(null);
    const [showDefault, setshowDefault] = useState(true);
    const [ideaShow, setIdeaShow] = useState(false);
    const [mentorid, setmentorid] = useState('');
    const { challengesSubmittedResponse } = useSelector(
        (state) => state?.studentRegistration
    );
    useEffect(() => {
        dispatch(getTeamMemberStatus(teamId, setshowDefault));
        dispatch(getStudentChallengeSubmittedResponse(teamId));
    }, [teamId, dispatch]);
    const percentageBWNumbers = (a, b) => {
        // here a = all_topics_count ; b= topics_completed_count //
        return (((a - b) / a) * 100).toFixed(2);
    };
    useEffect(() => {
        if (user) {
            setmentorid(user[0].mentor_id);
        }
    }, [user]);
    useEffect(() => {
        if (mentorid) {
            setshowDefault(true);
            dispatch(getAdminTeamsList(mentorid));
        }
    }, [mentorid]);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            width: '20%'
        },
        {
            title: 'Pre Survey',
            dataIndex: 'pre_survey_status',
            align: 'center',
            width: '10%',
            render: (_, record) =>
                record?.pre_survey_status ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Lesson Progress',
            dataIndex: 'address',
            align: 'center',
            width: '30%',
            render: (_, record) => {
                let percent =
                    100 -
                    percentageBWNumbers(
                        record.all_topics_count,
                        record.topics_completed_count
                    );
                return (
                    <div className="d-flex">
                        <div style={{ width: '80%' }}>
                            <Progress
                                key={'25'}
                                className="progress-height"
                                animated
                                color={
                                    percent
                                        ? percent <= 25
                                            ? 'danger'
                                            : percent > 25 && percent <= 50
                                            ? 'info'
                                            : percent > 50 && percent <= 75
                                            ? 'warning'
                                            : 'sucess'
                                        : 'danger'
                                }
                                value={percent}
                            />
                        </div>
                        <span className="ms-2">
                            {Math.round(percent) ? Math.round(percent) : '0'}%
                        </span>
                    </div>
                );
            }
        },
        {
            title: 'Idea Submission',
            dataIndex: 'idea_submission',
            align: 'center',
            width: '20%',
            render: (_, record) =>
                record?.idea_submission ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Post Survey',
            dataIndex: 'post_survey_status',
            align: 'center',
            width: '10%',
            render: (_, record) =>
                record?.post_survey_status ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        },
        {
            title: 'Certificate',
            dataIndex: 'certificate_status',
            align: 'center',
            width: '10%',
            render: (_, record) =>
                record?.certificate_status ? (
                    <FaCheckCircle size={20} color="green" />
                ) : (
                    <FaTimesCircle size={20} color="red" />
                )
        }
    ];

    return (
        <>
            <div className="select-team w-100">
                <label htmlFor="teams" className="">
                    Team Progress:
                </label>
                <div className="d-flex align-items-center">
                    <Col className="row p-4">
                        <select
                            onChange={(e) => setTeamId(e.target.value)}
                            name="teams"
                            id="teams"
                            style={{ backgroundColor: 'lavender' }}
                        >
                            <option value="">Select Team</option>
                            {teamsList && teamsList.length > 0 ? (
                                teamsList.map((item, i) => (
                                    <option key={i} value={item.team_id}>
                                        {item.team_name}
                                    </option>
                                ))
                            ) : (
                                <option value="">There are no teams</option>
                            )}
                        </select>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Card className="p-3 mx-4 d-flex flex-row">
                            <span className="fw-bold">IDEA STATUS :</span>
                            <span>
                                {' '}
                                {challengesSubmittedResponse[0]?.status
                                    ? challengesSubmittedResponse[0]?.status
                                    : 'NOT STARTED'}{' '}
                            </span>
                        </Card>
                        <Button
                            button="button"
                            label={t('student.view_idea')}
                            disabled={
                                teamsMembersStatus.length > 0 &&
                                challengesSubmittedResponse[0]?.status
                                    ? false
                                    : true
                            }
                            btnClass={`${
                                teamsMembersStatus.length > 0 &&
                                challengesSubmittedResponse[0]?.status
                                    ? 'primary'
                                    : 'default'
                            }`}
                            size="small"
                            onClick={() => setIdeaShow(true)}
                        />
                    </Col>
                </div>
                {showDefault && (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: '25rem' }}
                    >
                        <h2 className="text-primary">Please Select a Team*</h2>
                    </div>
                )}
                {teamsMembersStatus.length > 0 && !showDefault ? (
                    <Table
                        bordered
                        pagination={false}
                        dataSource={teamsMembersStatus}
                        columns={columns}
                    />
                ) : teamsMembersStatusErr ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: '25rem' }}
                    >
                        <p className="text-primary">
                            There are no students in selected Team
                        </p>
                        {/* <p className="text-primary">{"No Data Found"}*</p> */}
                    </div>
                ) : null}
            </div>
            {/* <div style={{ width: '50%' }}>
                <Doughnut options={options} data={data} />
            </div> */}
            {ideaShow && (
                <IdeaSubmissionCard
                    show={ideaShow}
                    handleClose={() => setIdeaShow(false)}
                    response={challengesSubmittedResponse}
                />
            )}
        </>
    );
}
