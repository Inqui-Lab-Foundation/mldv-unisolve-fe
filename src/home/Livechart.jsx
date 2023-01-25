import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import moment from 'moment';
import { Card, Col, Container, Row } from 'reactstrap';
import ScrollableFeed from 'react-scrollable-feed';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);
const Livechart = () => {
    const timelist = [];
    const datalist = [];
    const [userloginData, setuserloginData] = useState([]);
    const [labels, setlabels] = useState([]);
    const [dataValues, setdataValues] = useState([]);
    const [min, setmin] = useState(0);
    const [max, setmax] = useState(7);

    useEffect(() => {
        if (timelist && datalist) {
            handleuserlogindata();
        }
        if(window.location.pathname === '/'){
            setInterval(() => {
                handleuserlogindata();
            }, 10000);
        }
    }, [ ]);

    async function handleuserlogindata() {
        var config = {
            method: 'get',
            url:
                process.env.REACT_APP_API_BASE_URL +
                '/dashboard/loggedInUserCount',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer`
            }
        };
        await axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    timelist.push(moment(new Date()).format('hh:mm:ss'));
                    setlabels(timelist);
                    setuserloginData(response.data.data[0].rows);
                    datalist.push(response.data.data[0].count);
                    setdataValues(datalist);
                    if (timelist.length > 7) {
                        setmax(timelist.length);
                        setmin(timelist.length - 7);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Container className='mb-5 pb-5'>
            <Row>
                <Col>
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Student Login count',
                                    data: dataValues,
                                    fill: false,
                                    borderColor: 'rgb(75, 192, 192)',
                                    tension: 0.1
                                }
                            ]
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                x: {
                                    min: min,
                                    max: max
                                }
                            }
                        }}
                    />
                </Col>
                <Col>
                    <div
                        style={{
                            height: '30rem'
                        }}
                    >
                        <ScrollableFeed>
                            {userloginData.map((user, i) => (
                                <Card key={i} className="p-3 m-2">
                                    {user.full_name} Logged In From{' '}
                                    {user.organization_name}
                                </Card>
                            ))}
                        </ScrollableFeed>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
export default Livechart;
