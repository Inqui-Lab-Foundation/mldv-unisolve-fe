const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: '5d07dd33525435ba410f7053ca34c122069293aa',
        options: {
            'sonar.projectName': 'sonarqube-react-project',
            'sonar.projectDescription':
                'Here I can add a description of my project',
            'sonar.projectKey': 'sonarqube-react-project',
            'sonar.projectVersion': '0.0.1',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8'
        }
    },
    () => process.exit()
);
