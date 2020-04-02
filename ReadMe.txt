1-> install node(https://computingforgeeks.com/how-to-install-nodejs-on-centos-fedora/)
	1->sudo yum -y update
	2->curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
	3->sudo yum clean all && sudo yum makecache fast
	4->sudo yum install -y gcc-c++ make
	5->sudo yum install -y nodejs
2-> npm init
3-> npm install express --save mysql body-parser
4-> npm i -g nodemon
5-> nodemon app.js