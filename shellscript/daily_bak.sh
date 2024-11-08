#!/bin/sh

# cp -p -r /var/www/html/ /home/waka-lab/site_copy.`date "+%Y%m%d"`
# mysqldump -u root -p waka-db > waka-db_`date "+%Y%m%d"`.sql

HOST=WAKALAB-STORAGE
USER=waka-lab
PASS=B501@ANT
TARGET_DIR=/home/waka-lab/site_copy_`date "+%Y%m%d"`
BACKUP_DIR=/share/_webserver_backup/site_copy.`date "+%Y%m%d"`

expect -c "
set timeout -1
spawn sftp ${USER}@${HOST}
expect {
  \" Are you sure you want to continue connecting (yes/no)? \" {
    send \"yes\r\"
    expect \"password:\"
    send \"${PASS}\r\"
  } \"password:\" {
    send \"${PASS}\r\"
  }
}
send \"ls\"
interact
"