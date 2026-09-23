pipeline {
    agent any

    options {
        skipDefaultCheckout()
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '5'))
    }

    environment {
        IMAGE_REPOSITORY = 'enkhsuren/assessment2-express'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:16.20.2-bullseye'
                    args '--user 1000:1000'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image 'node:16.20.2-bullseye'
                    args '--user 1000:1000'
                    reuseNode true
                }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Dependency Security Scan') {
            agent {
                docker {
                    image 'node:16.20.2-bullseye'
                    args '--user 1000:1000'
                    reuseNode true
                }
            }
            steps {
                sh 'npm audit --audit-level=high'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build --pull -t "$IMAGE_REPOSITORY:$BUILD_NUMBER" -t "$IMAGE_REPOSITORY:latest" .'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials') {
                        sh 'docker push "$IMAGE_REPOSITORY:$BUILD_NUMBER"'
                        sh 'docker push "$IMAGE_REPOSITORY:latest"'
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'Dockerfile,Jenkinsfile,package.json,package-lock.json', fingerprint: true
        }
    }
}
