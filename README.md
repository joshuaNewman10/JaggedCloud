# HackBox

HackBox is a simple to use, all-in-one technical interview platform empowering interviewers to assess candidates with live-coding exercises.

## Team

  - __Product Owner__: Michael Chen
  - __Scrum Master__: Joshua Newman
  - __Development Team Members__: Garron Sanchez, Lauren McDonnell


##Status

[![Build Status](https://secure.travis-ci.org/JaggedCloud/JaggedCloud.png)](http://travis-ci.org/JaggedCloud/JaggedCloud)

[![Stories in Ready](https://badge.waffle.io/jaggedcloud/jaggedcloud.svg?label=In%20Progress&title=In%20Progress)](http://waffle.io/jaggedcloud/jaggedcloud)
## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

1) Fork the repository
2) Clone a copy of the repository locally
3) Run npm install
4) Run bower install
5) Run sudo grunt devmode and enter your computer's adminstrator password. This grunt command will do the following:
    A) Set environmental variables and API Keys
    B) Start up your local Mongo Database and make it begin listening for connections
    C) Spawn a grunt process to start up the server via nodemon
    D) Open up an instance of Google Chrome and start listening on localhost at port 3000
    E) Start Karma's continuous testing capabilities by having it run in the background
    F) Set up a watch task to rerun the Karma unit test suite whenever an application file is changed
  
## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
