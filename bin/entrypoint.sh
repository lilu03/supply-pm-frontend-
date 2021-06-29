#!/usr/bin/env bash
echo 'export NGINX_HOME=/usr/local/openresty/nginx' >> /etc/profile
echo 'export PATH=$PATH:$NGINX_HOME/sbin/'  >> /etc/profile
source /etc/profile

if [[ $PROFILE == "dev" ]]; then
  sed -i "s/{{schedule1}}/*\/1 * * * */" /etc/cron.d/crontab_traffic
  sed -i "s/{{schedule2}}/*\/1 * * * */" /etc/cron.d/crontab_traffic
fi

if [[ $PROFILE == "prod" ]]; then
  sed -i "s/{{schedule1}}/*\/30 * * * */" /etc/cron.d/crontab_traffic
  sed -i "s/{{schedule2}}/0 *\/3 * * */" /etc/cron.d/crontab_traffic
fi

/usr/local/openresty/nginx/sbin/nginx -g 'daemon off;'

tail -f /etc/profile
