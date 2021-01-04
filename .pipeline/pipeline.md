# Developer Services Pipeline

All Developer Services pipelines are a standard pipeline that enables developers to control the Continuous Integration and Continuous Delivery (CI/CD) workflow through executable scripts, such as a bash script. 

The pipeline consists of 3 elements. 
- Concourse
- Credhub
- Pipeline application files.

The pipeline uses a CLI called [flume](https://github.com/mckesson/flume) to orchestrate the pipeline in a standard fashion. 

## Concourse
Every Concourse pipeline uses the same standard `pipeline.yml` file to create the pipeline. The difference is the repository URI reference, `uri: git...`. This uses the repository's git SSH URI. This file is in the .pipeline folder for future reference. 

Create a new pipeline using the Concourse fly CLI. 

## Credhub
Credhub is the secret management for the pipeline secrets. The pipeline requires 2 secrets. 

- `mck-pipeline-secrets` is a single JSON object. The pipeline injects all top level primitive attributes of that JSON object into the Docker build as build arguments. This secret is at the team level and will work with all pipelines.
    - For linux / Mac: `/concourse/<your-concourse-team-name>/mck-pipeline-secrets`
    - For Windows: `concourse/<your-concourse-team-name>/mck-pipeline-secrets`
- `git.private_key` is the SSH private_key. The pipeline accesses the repository with the SSH key. For GitHub applications, this is the application deploy key and it must be unique for each application. The private_key is at the pipeline level and must be added for each new pipeline. 
    - For Linux / Mac: `/concourse/<your-concourse-team-name>/pipeline-name/git`
    - For Windows: `concourse/<your-concourse-team-name>/pipeline-name/git`

## Pipeline application files
The pipeline uses the pipeline files defined in the `.pipeline` folder to enable to pipeline workflow. The files follow a set structure and are customizable to suit your applications needs. 

These files include the following.

- Dockerfile.build
- flume.config
- Executable scripts

### Dockerfile.build
The Dockerfile.build sets up the build agent. This sets up the application build environment, installing libraries and packages as required for building the application. 

Developer Services offers pipeline base images that setup standard build environments. 

### flume.config
The flume.config sets up the pipeline workflow. It uses regex pattern matching to match branch names. The flume CLI looks for flume.config to determine which script executes based on the branch name. 

It has a set structure

```config
[regex-pattern]
build_type: 
build_script: 
```

- `build_type` is for metrics and has the follow set values [ci|cd|publish|gitops].
- `build_script` is the path to the script that executes when the regex pattern is matched.

Customize the regex pattern and include any number of pattern structures to match your workflow. 

**Note:** The file executes top down, you must consider the order when customizing this file.

### Executable Scripts
The flume CLI executes scripts based on the flume.config. 

Some recommended bash scripts include the following. You can use any executable script here instead, such as a python script.
- ci.sh
- publish.sh

#### ci.sh
Recommend implementing a Continuous Integration process for all branches. This enables detection of any problems and continuous code quality analysis. It includes the following steps. 

- Building and Testing of the application. Use the same command(s) you would run locally to build and test your application as if you downloaded a fresh copy from the repository.
- SonarQube analysis of the application. Included in the Developer Services base images is a utility tool for running SonarQube scans, called sonarscanner. 
    - SonarQube analysis also requires the sonar-project.properties file at root level. 

Include any extra steps to this script for continuous testing of your application. 

#### publish.sh
The goal of this script should be to create a single artifact and publish it to Artifactory. It should also follow semantic versioning, for example 0.0.1. Developer Services offers the [McKesson Developer Utility CLI (mckduc)](https://github.com/mckesson/mckduc) to help you perform some common tasks in a simple way.

The recommended publish steps for your application include the following. 

- Get the base version.
- Calculate the next version.
- Execute the CI script.
- Publish the built artifact.

## Extra Information
- sonar-project.properties

### sonar-project.properties
As mentioned in the ci.sh steps, SonarQube is used for code quality analysis. This requires a sonar-project.properties file at root level. 

Include the following for all applications. 

- `sonar.projectKey` is the SonarQube portfolio key and the application name. The portfolio key is the same for all applications while the application name is unique per applications. 
- `sonar.projectName` is application name. Use the same name as above. 

```
sonar.projectKey=sonarqube-portfolio-key:application-name
sonar.projectName=application-name
```

If your application files are not under a `src` folder, you must include the following in the sonar-project.properties. Use comma-separated paths to directories containing main source files.
```
sonar.sources=
```
