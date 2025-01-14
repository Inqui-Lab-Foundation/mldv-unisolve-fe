import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
// import { InputWithSearchComp } from "../../stories/InputWithSearch/InputWithSearch";
import { Button } from '../../stories/Button';
// import { Tag, Avatar } from "antd";
// import BasicImg from "../../assets/img/avatar1.png";
// import BasicImg2 from "../../assets/img/avatar2.png";
// import { FileComp } from "../../stories/FileComp/FileComp";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, FormGroup } from 'reactstrap';

// import { UploadOutlined } from "@ant-design/icons";
// import { Button as AntdBtn, message, Upload } from "antd";
import IconCSV from '../../assets/media/csv.png';
// import IconCSV from "../../media/csv-1.png";
import axios from 'axios';
import { getCurrentUser } from '../../helpers/Utils';
// import { BsFilter } from "react-icons/bs";
import iconImport from '../../assets/media/iconImport.png';
function ExportPopup(props) {
    const currentUser = getCurrentUser('current_user');
    const [setUrl] = useState('');
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [response1, setResponse] = useState('');
    // const SUPPORTED_FORMATS = ["text/csv"];

    var formik = useFormik({
        initialValues: {
            file: ''
        },
        validationSchema: Yup.object({
            file: Yup.string().required('A file is required')
            // .test(
            //   "fileFormat",
            //   "Unsupported Format",
            //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
            // ),
        }),
        onSubmit: () => {
            const data = new FormData();
            data.append('data', data);
        }
    });

    const handleSubmit = () => {
        const data = new FormData();
        data.append('data', file);

        var config = {
            method: 'post',
            url: process.env.REACT_APP_API_BASE_URL + '/organizations/withfile',
            headers: {
                'Content-Type': 'application/json',
                // Accept: "application/json",
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    setResponse('Successfully uploaded');
                    setTimeout(() => {
                        setResponse();
                    }, 7000);
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.data.status === 400) {
                    alert('hi');
                    setResponse('File already exist');
                    setTimeout(() => {
                        setResponse();
                    }, 7000);
                }
            });
    };

    const changeHandler = (event) => {
        // setError("");

        const file = event.target.files[0].name.split('.', 2);
        if (file[1] === 'csv' || file[1] === '.xlsx' || file[1] === '.xls') {
            setFileName(event.target.files[0].name);
            let img = event.target.files[0];
            setUrl(URL.createObjectURL(img));
            setFile(img);
            // formik.values.file = URL.createObjectURL(img);
        }
        setFileName(setFileName);
    };

    const removeSelectedImage = () => {
        setFile();
        setFileName();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="assign-evaluator exportModal"
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="w-100 d-block"
                >
                    Export Files
                    {response1}
                </Modal.Title>
                <p className="w-100 d-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </Modal.Header>

            <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <FormGroup>
                        <div className="row py-5">
                            <div className="col-3 my-auto">
                                <div className="wrapper">
                                    <div className="btnimg btnUpload ">
                                        <img
                                            className="img-fluid mx-3"
                                            alt="upload"
                                            src={iconImport}
                                        />
                                        <span>Upload </span>
                                    </div>
                                    <input
                                        type="file"
                                        name="file"
                                        // id={"csvFileInput"}
                                        accept={'.csv, .xlsx,.xls'}
                                        onChange={(e) => changeHandler(e)}
                                    />
                                </div>
                            </div>
                            <div className="col-9 text-right">
                                <div className="row">
                                    <div className="col-7 my-auto">
                                        <p className="upload-file-name text-left d-block w-auto">
                                            {fileName}
                                        </p>
                                    </div>
                                    <div className="col-2">
                                        {file ? (
                                            <img
                                                src={`${IconCSV}`}
                                                className="img-fluid"
                                                alt="Thumb"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="col-2 my-auto">
                                        {file ? (
                                            // <button onClick={removeSelectedImage} style={styles.delete}>
                                            //   Remove
                                            // </button>
                                            <Button
                                                btnClass="primary py-2 px-4"
                                                size="small"
                                                label="Remove"
                                                onClick={(e) =>
                                                    removeSelectedImage(e)
                                                }
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer className="text-right  d-block form-group">
                    {file ? (
                        <Button
                            btnClass="primary px-5"
                            size="small"
                            label="Submit"
                            onClick={(e) => handleSubmit(e)}
                        />
                    ) : null}

                    <Button
                        label="Cancel"
                        btnClass="primary"
                        size="small"
                        type="submit"
                        onClick={props.onHide}
                    />
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ExportPopup;
