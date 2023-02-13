import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import './map.scss';
import MapdataCard from './MapdataCard';

const MaldivesMap = () => {
    const initialClassName = {
        id: '',
        districtColor: ''
    };
    const [addClassName, setAddClassName] = useState(initialClassName);
    const data = useSelector((state) => state.home.districtData);
    const { overAllData } = useSelector((state) => state.home);

    const [initial, setInitial] = useState(true);
    const [districtName, setDistrictName] = useState('');
    const [values, setValues] = useState(overAllData);
    const resetData = () => {
        setAddClassName(initialClassName);
        setValues(overAllData);
        setInitial(false);
    };

    const getDistData = (event) => {
        const filteredData = data.filter(
            (item) => item.district_name.toLowerCase() === event.target.id
        );
        setValues(filteredData[0] ? filteredData[0] : '');
        setInitial(false);
        setDistrictName(event.target.id);
        setAddClassName({
            id: event.target.id,
            districtColor: 'district_color'
        });
    };
    
    return (
        <Container className="state">
            <Row className="w-100">
                <Col md={6} className="common-flex">
                    <svg
                        width="80px"
                        height="500px"
                        viewBox="0 0 80 500"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <g
                            id="map"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <g
                                id="maldives-map"
                                transform="translate(0.000000, 1.000000)"
                                stroke="#646565"
                                fill="#A7D0B1"
                            >
                                <path
                                    d="M41.5563107,20.6433786 L43.045,17.666 L43.92,15.916 L43.92,13.166 L43.253,11.416 L42.17,9.833 L40.752,9.833 L38.752,9.833 L35.835,11.416 L33.168,14.749 L30.668,16.582 L26.918,16.832 L25.585,18.415 L25.1166845,19.6570011 L41.5563107,20.6433786 Z M23.003,0.25 L23.282,0.373 L24.503,0.916 L26.17,2.083 L27.003,3.166 L28.337,4.25 L29.42,7.166 L29.42,8.583 L27.837,9.583 L28.337,10.666 L27.92,12.333 L26.753,12.333 L24.92,12.75 L23.587,11.25 L22.17,9.833 L20.337,8.25 L18.753,7.666 L16.587,6.083 L16.587,4.333 L16.92,2.666 L17.67,2.416 L19.837,0.666 L21.587,0.25 L23.003,0.25 Z"
                                    id="haa alifu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'haa alifu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <path
                                    d="M41.5563107,20.6433786 L41.42,20.916 L38.67,23.499 L35.92,26.582 L34.17,29.165 L33.337,32.165 L33.337,34.832 L32.848813,39.0566951 L25,42 C25,42 22.5,44 21.5,45 C21.4651533,45.0348467 21.424235,45.0648363 21.3777108,45.0902649 L20.668,40.832 C20.668,40.832 20.418,37.332 20.668,37.082 C20.918,36.832 20.557,32.749 20.557,32.749 L21.501,27.166 L23.668,23.499 L25.1166845,19.6570011 L41.5563107,20.6433786 Z M10.667,45.833 L8.917,47.917 L6.167,51.583 L5.75,54 L4.75,57.417 L3.417,58.333 L1.5,58.333 L0.583,56.75 L0.583,55.167 L1.333,52.667 L2.75,50.083 L4.083,48.5 L5.625,46.583 L7.833,45.417 L9.5,44.667 L10.167,44.667 L10.667,45.833 Z"
                                    id="haa dhaalu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'haa dhaalu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <path
                                    d="M32.8463421,39.0780784 L32.817,39.332 L32.817,42.832 L34.336,44.582 L37.253,46.415 L39.087,46.915 L42.837,49.498 L44.921,53.748 L47.587,59.331 L47.587,62.498 L47.92,66.415 L48.5103544,69.1205941 C48.0421143,69.5269411 47.5254955,69.9932396 47,70.5 C45.1977978,72.2379496 43.016779,74.7248315 42.5,75.5 C41.916314,76.3755289 39.458837,76.7400239 37.5138355,76.8917683 L35.919,72.663 L31.419,67.58 L30.251,64 L28.251,59.583 L27.584,55.916 L27.584,52.666 L25.001,49.749 L21.668,46.832 L21.3270469,44.7862816 C21.7233262,44.6221793 22.1271125,44.3728875 22.5,44 C22.6568188,43.8431812 23.7390098,42.6320174 25,42 C26.2329265,41.3820483 32.0347054,39.2491914 32.8463421,39.0780784 L32.8463421,39.0780784 Z"
                                    id="shaviyani"
                                    className={`${
                                        addClassName.id && addClassName.id === 'shaviyani'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <path
                                    d="M48.4148141,68.6827331 L48.92,70.998 L51.503,73.081 L56.335,74.914 L59.169,79.247 L59.169,82.58 L57.085,84.747 L55.585,89.164 L55.252,92.247 L53.169,93.747 L49.752,94.58 L45.993,92.663 L43.585,89.746 L41.502,87.163 L39.419,84.33 L37.836,80.413 L37.836,77.746 L37.5799293,77.0670185 C37.8413602,77 38,77 38,77 C38,77 41.5,76.5 43,75 C44.0796002,73.9203998 46.1952329,70.5097264 48.4148141,68.6827331 Z"
                                    id="noonu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'noonu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <path
                                    d="M25,72.166 L26.5,72.833 L26.167,73.999 L25,74.333 L24.083,73.249 L25,72.166 Z M25.917,77.333 L27.417,78.333 L28.417,80.916 L29.75,83.333 L30.167,86.666 L30.834,92.166 L31.917,94.582 L32.417,98.832 L32.417,101.832 L31.917,105.082 L30.5,109.499 L28.667,110.582 L24.75,113.082 L21.25,113.499 L19.25,113.499 L18.75,112.666 L19.583,112.083 C19.583,112.083 19.833,111.5 19.833,111.25 C19.833,111 20.166,109.333 20.166,109.333 L19.833,107 L18,105.666 L16.417,103.666 L16.417,99.749 L17.167,95.416 L17.75,92.499 L19.167,88.416 L20.557,82.999 L22.75,80.416 L24.417,77.999 L25.292,77.332 L25.917,77.332 L25.917,77.333 Z"
                                    id="raa"
                                    className={`${
                                        addClassName.id && addClassName.id === 'raa'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <path
                                    d="M20.557,117.749 L21,117.083 L23,115.916 L24.417,114.833 L26,114.333 L28.917,112.833 L31.417,111.999 L33.75,112.416 L35.667,114.499 L37.583,116.499 L40.25,119.166 L41.25,121.833 L39.5,123.583 L35.084,128.832 L32.417,130.999 L27.751,134.499 L24.417,135.582 L21.751,134.999 L19.417,134.499 L17.834,132.332 L17.417,130.832 L16.417,129.249 L17.001,127.332 L17.751,125.499 L18.251,123.791 L18.417,121.332 L19.251,119.832 L20.557,117.749 Z M29.75,143.332 L28.833,144.332 L26.417,146.166 L23.5,147.166 L21.083,146.666 L19.917,145.249 L19.917,143.749 L20.917,142.666 L22.583,142.666 L24.417,142.666 L26.667,142.666 L28.5,142.666 L29.333,143.082 L29.75,143.332 Z"
                                    id="baa"
                                    className={`${
                                        addClassName.id && addClassName.id === 'baa'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <polygon
                                    id="lhaviyani"
                                    className={`${
                                        addClassName.id && addClassName.id === 'lhaviyani'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="60.5 99.915 60.637 100.179 61.917 102.665 63.834 103.999 66.334 105.665 68.5 108.165 70.834 111.582 69.917 116.082 66.25 118.332 63.5 119.165 60.5 118.082 59.667 115.749 58.417 113.999 55.417 112.749 52.25 112.415 50.167 111.582 50.5 108.915 51.75 105.082 53.917 103.665 55.25 102.165 57.667 100.915 59.168 99.915 60.5 99.582"
                                ></polygon>
                                <path
                                    d="M57.084,136.665 L59.168,137.082 L58.75,138.832 L57.084,138.832 L57.084,137.165 L57.084,136.665 Z M54,149.332 L53.334,150.832 L54.667,152.165 L56.084,152.165 L58.584,152.165 L60.5,152.165 L60.5,150.249 L58.5,149.332 L56.25,148.915 L54,149.332 Z M59.083,153.664 L60.916,154.664 L63.416,156.414 L65.75,158.831 L67.166,161.914 L69,163.831 L72.333,166.164 L74.333,168.414 L74.333,171.748 L72.333,173.831 L69,176.331 L66.708,178.164 L65,180.998 L64.25,185.498 L62.833,187.998 L60.916,188.331 L57.666,188.331 L55.583,188.331 L54.5,186.581 L51.833,184.331 L51.083,182.914 L51.083,179.748 L51.083,176.914 L51.083,172.998 L51.75,169.498 L51.833,167.248 L52,164.748 L52.166,163.248 L53.334,161.081 L54.166,160.248 L55.833,156.664 L58.25,153.664 L59.083,153.664 Z M62.333,191.081 L63.416,194.331 L63.416,196.914 L61.666,204.748 L59.666,207.914 L57.083,210.998 L54.5,210.998 L52.333,207.914 L52.333,204.248 L52.666,197.164 L53.25,193.664 L55,192.748 L55.916,191.081 L59.083,190.581 L60.333,190.581 L62.333,191.081 Z"
                                    id="kaafu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'kaafu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <path
                                    d="M26.0975807,206.381378 L25.917,205.581 L25.917,203.415 L25.917,199.748 L25.917,196.081 L25.583,192.415 L23.75,188.331 L21.5,184.998 L19.333,182.581 L17.583,180.831 L14.75,181.581 L13,182.414 L11.25,188.331 L10.667,190.581 L10.5,197.415 L9.90823282,203.437861 L26.0975807,206.381378 Z M27.166,178.081 L29.333,178.081 L30.833,179.581 L30.083,181.998 L28,182.998 L26.083,181.831 L25.583,179.664 L26.083,178.414 L27.166,177.664 L27.166,178.081 Z"
                                    id="alifu dhaalu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'alifu dhaalu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <polygon
                                    id="alifu alifu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'alifu alifu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="25.917 205.348545 25.917 205.581 26.5 208.165 27.25 210.998 27.25 219.998 25.667 228.248 23.333 230.998 20.583 233.331 18 232.998 13.917 232.331 11.667 231.165 11.083 226.498 11.083 224.415 9.167 215.248 9.583 206.748 10.0047619 202.455411"
                                ></polygon>
                                <path
                                    d="M57.875,218.664 L60.834,221.164 L61.668,224.914 L62.918,229.247 L64.918,232.664 L67.501,234.164 L70.084,233.664 L72.001,232.581 L75.001,231.164 L76.668,232.081 L78.584,234.831 L78.001,238.247 L75.418,239.664 L72.334,240.664 L69.334,239.914 L65.334,240.664 L63.416,241.164 L62.334,242.747 L59.418,243.414 L56.584,241.914 L55.084,239.497 L52.751,236.081 L49.668,235.081 L47.751,234.581 L46.584,233.247 L46.584,230.414 L47.834,228.914 L48.834,226.081 L51.834,221.914 L53.751,220.081 L55.918,219.497 L57.584,218.664 L57.875,218.664 Z M56.834,245.164 L58.751,245.664 L58.751,247.747 L56.168,248.497 L54.584,247.914 L54.584,246.247 L55.918,245.164 L56.834,245.164 Z"
                                    id="vaavu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'vaavu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <polygon
                                    id="meemu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'meemu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="52.835 252.048 52.835 256.496 52.835 261.912 52.835 265.662 52.418 267.912 51.834 273.746 51.834 278.412 54.584 279.412 58.751 276.746 62.168 273.246 65.502 272.079 66.002 270.412 68.418 267.496 69.584 262.246 70.584 259.496 71.834 256.496 70.084 255.912 68.252 254.829 63.752 254.996 59.834 252.048 55.168 252.048 53.418 252.048"
                                ></polygon>
                                <path
                                    d="M23.671,241.83 L26.754,243.414 L28.921,245.164 L31.338,248.497 L31.338,250.746 L30.255,256.413 L27.251,258.329 L23.255,259.413 L20.588,258.079 C20.588,258.079 19.255,256.58 19.255,256.163 L19.255,252.996 L17.422,249.662 L16.672,246.83 L17.589,244.663 L19.672,242.83 L22.005,242.413 L23.671,241.83 Z"
                                    id="faafu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'faafu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <polygon
                                    id="dhaalu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'dhaalu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="28.254 262.996 28.657 263.137 29.92 263.579 30.754 266.163 30.754 267.163 30.754 272.496 30.254 278.579 28.254 280.913 24.754 283.663 20.004 284.996 18.92 281.663 17.254 277.829 17.254 273.413 17.254 268.829 18.504 267.246 20.587 263.663 24.004 262.579 26.67 262.579"
                                ></polygon>
                                <polygon
                                    id="thaa"
                                    className={`${
                                        addClassName.id && addClassName.id === 'thaa'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="38.254 291.745 40.42 292.412 42.587 293.662 44.254 294.662 47.42 294.662 50.004 295.829 52.17 298.829 53.67 302.162 51.834 305.079 48.087 308.162 43.587 311.162 37.42 314.245 32.816 316.329 29.17 315.995 25.67 314.162 24.42 310.579 23.254 305.995 22.92 302.579 22.004 300.579 22.004 296.829 22.92 295.912 25.254 293.829 28.92 293.245 32.42 292.162 35.67 291.162"
                                ></polygon>
                                <polygon
                                    id="laamu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'laamu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="66.671 318.246 63.588 320.913 63.588 324.996 63.588 328.829 63.588 333.163 60.838 338.496 57.004 339.829 54.004 340.246 51.004 341.329 48.088 340.829 46.588 338.496 44.754 337.746 44.338 334.829 44.338 332.329 45.754 330.329 48.671 328.079 52.254 326.246 57.838 322.329 61.004 320.746 63.921 319.329 64.921 318.246 66.004 317.829 66.671 317.829"
                                ></polygon>
                                <path
                                    d="M35.1155739,414.898492 L35.671,414.331 L39.421,412.747 L43.338,408.997 L44.338,405.914 L42.588,403.664 L41.254,401.997 L40.754,399.914 L41.088,399.081 L43.004,397.831 L43.921,396.998 L45.421,396.415 L49.504,397.165 C49.504,397.165 52.421,397.081 52.754,397.165 C53.088,397.249 53.338,397.165 53.338,397.165 L55.421,400.665 L57.671,406.247 L58.004,410.83 L58.254,414.163 L61.004,416.33 C61.004,416.33 64.171,420.413 64.171,421.289 C64.171,422.165 65.838,424.747 66.004,425.33 C66.172,425.913 66.838,427.08 66.838,427.08 C66.838,427.08 64.671,431.163 64.671,431.58 C64.671,431.997 61.171,434.58 61.171,434.58 L61.1114043,434.632146 L35.1155739,414.898492 Z"
                                    id="gaafu alifu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'gaafu alifu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                                <polygon
                                    id="gaafu dhaalu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'gaafu dhaalu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="34.8424457 415.177554 32.817 417.247 29.838 419.33 28.255 422.58 28.255 425.997 28.838 429.497 30.088 433.08 31.421 436.58 34.338 439.163 36.671 441.58 40.254 442.663 43.421 442.663 47.088 441.663 48.921 439.58 52.088 438.663 54.504 438.163 57.171 438.08 61.1617829 434.588065"
                                ></polygon>
                                <polygon
                                    id="gnaviyani"
                                    className={`${
                                        addClassName.id && addClassName.id === 'gnaviyani'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                    points="56.087 471.247 57.67 473.664 57.67 476.497 56.879 477.997 56.087 476.747 55.754 474.997 55.254 473.58 54.837 472.747 54.337 471.247 55.42 470.747"
                                ></polygon>
                                <path
                                    d="M44.087,492.081 L44.087,494.497 L43.42,496.164 L41.587,498.581 L39.754,499.914 L37.754,499.914 C37.754,499.914 37.171,498.664 36.921,498.664 C36.671,498.664 34.838,497.081 34.838,497.081 L33.921,495.164 L33.921,492.081 L35.254,492.081 L35.837,492.581 L37.087,492.914 L38.17,492.914 L40.67,492.081 L42.087,491.497 L44.087,491.497 L44.42,491.914 L44.087,492.081 Z"
                                    id="seenu"
                                    className={`${
                                        addClassName.id && addClassName.id === 'seenu'
                                            ? addClassName.districtColor
                                            : ''
                                    }`}
                                    onMouseEnter={getDistData}
                                    onMouseLeave={resetData}
                                ></path>
                            </g>
                        </g>
                    </svg>
                </Col>
                <Col md={6} className="my-auto common-flex">
                    <MapdataCard
                        values={values}
                        all={initial ? overAllData : {}}
                        districtName={districtName}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default MaldivesMap;
