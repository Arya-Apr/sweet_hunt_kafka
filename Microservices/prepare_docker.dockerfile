FROM payara/micro:5.2022.5-jdk11

USER root

RUN mkdir ${PAYARA_HOME}/config

COPY domain.xml ${PAYARA_HOME}/config/

COPY mysql-connector-java-8.0.28.jar ${PAYARA_HOME}/config

RUN chown -R payara:payara ${PAYARA_HOME}/config

USER payara

WORKDIR ${PAYARA_HOME}

COPY kafka-rar-0.1.0.rar $DEPLOY_DIR

COPY ./PreparationService/artifact/PreparationService.war $DEPLOY_DIR


CMD ["--addLibs","/opt/payara/config/mysql-connector-java-8.0.28.jar", "--deploymentDir", "/opt/payara/deployments", "--rootDir", "/opt/payara/config","--domainConfig", "/opt/payara/config/domain.xml"]