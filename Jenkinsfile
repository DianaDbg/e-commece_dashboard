def userGitlab = "eddy-noukap"
def passwordGitlab = "GJxE9ajYu5EHk3P-juzB"

def nomProjet = "samson-dashboard"
def repository = "https://gitlab.com/team-teranga/samson-project/samson-dashboard.git"
def doTest = false
def doTestSpeedPage = false
def portApp = 80
def portContainer = 8095
def registry = "registry.gitlab.com/team-teranga/samson-project/samson-dashboard" 
def image = registry+":ver-$BUILD_ID"
def hostToDeploy = "172.31.17.103" // 3.123.62.124
def hostUser = "ubuntu"
def containerName = "develop-"+nomProjet
def sonarQubeAuth = "admin"
def idAws = "app-"+Math.abs(new Random().nextInt() % 600) + 1
def thresholdPageSpeed = 70
pipeline {
    agent {
        label 'master'
    }
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    tools {
        nodejs "node"
    }
    stages{
        // Jenkinsfile pour les projets 
        //     NodeJS - Frontend
        //        
        //     
        // 
        stage('test') {
            steps {
               script {
                 if(doTest) {
                   sh 'node --version'
                   sh 'npm --version'
                   sh 'npm install'
                   sh 'npm run build'
                   sh 'npm test'   
                 }
               }
            }
        }
        stage('test page speed insight') {
            steps {
               script {
                 if(doTestSpeedPage) { // realise le test de la version precedemment deployer
                   sh 'node --version'
                   sh 'npm --version'
                   sh 'npm install --global psi'
                   sh 'psi http://'+hostToDeploy+':'+portContainer+'/ --strategy=Desktop --threshold='+thresholdPageSpeed  
                 }
               }
            }
        }
        stage('analyse code'){
         steps {
           sh 'set +e'
           sh 'docker start sonarqube || docker run -d --restart always --name sonarqube -p 9000:9000 sonarqube:7.9-community'
           sh 'set -e'
           script {
              env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
              env.GIT_AUTHOR = sh (script: 'git log -1 --pretty=%cn ${GIT_COMMIT}', returnStdout: true).trim()
              sh 'sleep 5s'
             def scannerHome = tool 'sonarQubeScanner';
             withSonarQubeEnv('sonarQubeServer') {
               sh """${scannerHome}/bin/sonar-scanner \
               -Dsonar.projectKey="""+nomProjet+""" \
               -Dsonar.projectName="""+nomProjet+""" \
               -Dsonar.host.url=http://\$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' sonarqube):9000 \
               -Dsonar.sources=. \
               -Dsonar.login="""+sonarQubeAuth+""" \
               -Dsonar.password="""+sonarQubeAuth+""" \
               -Dsonar.exclusions=vendor/** \
               -Dsonar.sourceEncoding=UTF-8 \
               -Dsonar.projectVersion=ver-$BUILD_ID """
             }
            }
          }
        }
        stage('build image') {
         steps {
           script {
             docker.build(image, '.')
           }
         }
        }
        stage('test image') {
         steps {
           script {
             docker.image(image).withRun("-p "+portContainer+":"+portApp+" --name "+nomProjet+"-test-$BUILD_ID"){ c ->
               sh 'sleep 20s'
               sh '''curl $(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' '''+nomProjet+'''-test-$BUILD_ID):80'''
             }
           }
         }
        }
        stage('push to registry') {
         steps {
           script {
             sh 'docker login registry.gitlab.com -u '+userGitlab+' -p '+passwordGitlab
             sh 'docker tag '+image+' '+registry+':latest'
             sh 'docker push '+registry+':latest'
             sh 'docker push '+image
             sh 'docker rmi -f '+registry+':latest'
           }
          }
        }
        stage('deploy - config ansible') {
         steps {
           git 'https://gitlab.com/eddy-noukap/deploy_imgdocker_to_ec2.git'
           sh 'chmod 0000 ./ssh-key/vaanah-key.pem'
         }
        }
        stage('deploy - to serveur') {
         steps {
           /* ansiblePlaybook(
                   playbook: 'createInstance.yml',
                   extras: """--tags create_ec2 --extra-vars 'id="""+idAws+"""'"""
           ) */
           ansiblePlaybook(
                   playbook: 'deployApp.yml',
                   inventory: '00_inventory.yml',
                   extras: """--tags create_ec2 --extra-vars 'image="""+image+"""
                                             port_container="""+portContainer+"""
                                             port_application="""+portApp+"""
                                             url_registry=registry.gitlab.com
                                             userGitlab="""+userGitlab+""" 
                                             tokenOrPass="""+passwordGitlab+"""
                                             nom_container="""+containerName+"""'"""
           )
         }
        }
  }
  post {
    success {
      script {
        sh 'echo Consulter votre application web : http://'+hostToDeploy+':'+portContainer
        slackSend (channel: "jenkins_notifications", color: "good", message: """hi @team
                                                                  \n\n*Status*: _Build deployed successfully_ *"""+nomProjet+"""*,  
                                                                  *Project/branch*: ${env.JOB_NAME},
                                                                  *URL*: http://"""+hostToDeploy+""":"""+portContainer+"""  
                                                                  *Build-number*: ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)
                                                                  *Comitted by*: ${env.GIT_AUTHOR}  
                                                                  *Last commit message*: '${env.GIT_COMMIT_MSG}'
                                                                  \n\n_Cordialement la @team DevOps ft Jenkins_""")
      }
    }
    failure {
        //slackSend failOnError:true, message: "status: Build failed,  \nmicro-service: ${env.JOB_NAME},  \nbuild-number: ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
        slackSend (failOnError:true, channel: "jenkins_notifications", color: "danger", message: """hi @team
                                                                  \n\n*status*: _Build failed_ *"""+nomProjet+"""*,  
                                                                  *Project/branch*: ${env.JOB_NAME},  
                                                                  *build-number*: ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)
                                                                  *Comitted by*: ${env.GIT_AUTHOR}  
                                                                  *Last commit message*: '${env.GIT_COMMIT_MSG}'
                                                                  \n\n_Cordialement la @team DevOps ft Jenkins_""")
    }
  }
}
private void writeFileInRepository(String fichier, String content){  
   def data = content  
   writeFile(file: fichier, text: data)  
} 
