#!/bin/bash
if [ -f /etc/pam.d/common-auth ];then
sudo cp -rp /etc/pam.d/common-auth /etc/pam.d/common-auth.20230414
sudo sed -i '1 i\auth required pam_tally2.so onerr=fail audit silent deny=3 unlock_time=10000'  /etc/pam.d/common-auth
echo "Now you've activated your failed password attempt policy || Your account will get locked if you entered a wrong password 3 times"
else
echo "None existing common-auth file"
fi