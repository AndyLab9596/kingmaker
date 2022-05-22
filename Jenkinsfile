pipeline  {
  agent any
  options {
    buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '1', numToKeepStr: '1')
  }

  stages {
    /*stage('analysis') {
      agent {
        docker {
          image 'node:10-alpine'
        }
      }
      steps {
        sh 'npm install'
        sh 'npm run type-check'
        sh 'npm run lint'
      }
    }*/
    stage('build') {
      when {
        branch 'develop'
      }
      agent {
        docker {
          image 'node:10-alpine'
        }
      }
      steps {
        echo 'starting build'
        sh 'apk add git'
        sh 'npm install'
        sh 'npm run build'
        sh 'tar cvzf public.tar.gz public'
        // Archive the build output artifacts.
        // archiveArtifacts artifacts: 'public.tar.gz', fingerprint: true
        stash includes: 'public.tar.gz', name: 'public.tar.gz'
      }
    }

    stage('Deploy') {
      when {
        branch 'develop'
      }
      steps {
        // copyArtifacts filter: 'public.tar.gz', fingerprintArtifacts: true, projectName: '${JOB_NAME}', selector: specific(${BUILD_NUMBER}), target: '${WORKSPACE}/public.tar.gz'
        echo 'Start deploy...'
        unstash 'public.tar.gz'
        sshPublisher(
          publishers: [
            sshPublisherDesc(configName: '192.168.1.30', transfers: [sshTransfer(cleanRemote: true, excludes: '', execCommand: 'cd /var/www/html/template-react && rm -rf public && tar xvzf public.tar.gz && rm -f public.tar.gz', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'template-react', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'public.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)
          ]
        )
      }
    }
  }

  post {
    failure {
        mail to: 'quynh.le@hdwebsoft.com',
             subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
             body: "Something is wrong with ${env.BUILD_URL}"
    }
  }
}
