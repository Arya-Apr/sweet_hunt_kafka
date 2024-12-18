start java -jar payara-micro-5.2022.2.jar --deploy Microservices/kafka-rar-0.1.0.rar --deploy Microservices/CustomerService/artifact/CustomerService.war --port 8083 --addlibs Microservices/mysql-connector-java-8.0.28.jar --domainconfig Microservices/domain.xml

start java -jar payara-micro-5.2022.2.jar --deploy Microservices/kafka-rar-0.1.0.rar --deploy Microservices/ManagementService/artifact/ManagementService.war --port 8084 --addlibs Microservices/mysql-connector-java-8.0.28.jar --domainconfig Microservices/domain.xml

start java -jar payara-micro-5.2022.2.jar --deploy Microservices/kafka-rar-0.1.0.rar --deploy Microservices/OrderingService/artifact/OrderingService.war --port 8085 --addlibs Microservices/mysql-connector-java-8.0.28.jar --domainconfig Microservices/domain.xml

start java -jar payara-micro-5.2022.2.jar --deploy Microservices/kafka-rar-0.1.0.rar --deploy Microservices/PaymentService/artifact/PaymentService.war --port 8086 --addlibs Microservices/mysql-connector-java-8.0.28.jar --domainconfig Microservices/domain.xml

start java -jar payara-micro-5.2022.2.jar --deploy Microservices/kafka-rar-0.1.0.rar --deploy Microservices/PreparationService/artifact/PreparationService.war --port 8087 --addlibs Microservices/mysql-connector-java-8.0.28.jar --domainconfig Microservices/domain.xml

start java -jar payara-micro-5.2022.2.jar --deploy Microservices/kafka-rar-0.1.0.rar --deploy Microservices/DeliveryService/artifact/DeliveryService.war --port 8088 --addlibs Microservices/mysql-connector-java-8.0.28.jar --domainconfig Microservices/domain.xml