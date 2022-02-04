FROM centos:7

RUN apt-get update && \
  apt-get -y install git unzip libzip-dev libicu-dev libonig-dev vim wget && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \

# Apache2.4のインストール
# RUN yum -y install httpd

# Apacheの自動起動設定
# RUN systemctl enable httpd

# CMD ["/sbin/init"]
