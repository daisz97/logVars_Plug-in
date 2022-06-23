## First and Foremost

This plug-in is applicable to Java language source code written in standard.

## Things you should do

When using this plug-in, your localhost need to be configured with the following environment (Here is how to install the relevant environment in two different example systems.):
* SSH(SCP)
    + CentOS:  sudo yum install -y openssh-client openssh
    + Ubuntu:  sudo apt install -y openssh-client openssh-server
* SSHPASS
    + CentOS:  sudo yum install sshpass
    + Ubuntu:  sudo apt-get install sshpass

## Release Notes

#### 0.0.1
Initial release of LoggingVars

#### 0.0.2
* Add keybindings;
* Add right click shortcut;
* Add icon;
* Modify README.md;
* Change the model of the call.

#### 0.0.3
* Change the way of model deployment using Torchserve -- from only one torchserve with only one model served in each container to only one torchserve with all models served in one container.

#### 0.0.4
* Complete README.md file.

#### 0.0.5
* Change the representation tyle of recommended variables -- from being represented in "informationMessage" to being represented in the output panel.

## Enjoy!