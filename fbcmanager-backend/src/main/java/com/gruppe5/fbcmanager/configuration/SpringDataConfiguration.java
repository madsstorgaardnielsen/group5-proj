// package com.gruppe5.fbcmanager.configuration;

// import java.util.Properties;

// import javax.persistence.EntityManagerFactory;
// import javax.sql.DataSource;

// import org.springframework.boot.autoconfigure.domain.EntityScan;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.ComponentScan;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
// import org.springframework.jdbc.datasource.DriverManagerDataSource;
// import org.springframework.orm.jpa.JpaTransactionManager;
// import org.springframework.orm.jpa.JpaVendorAdapter;
// import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
// import org.springframework.orm.jpa.vendor.Database;
// import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
// import org.springframework.transaction.annotation.EnableTransactionManagement;

// @Configuration
// @EnableTransactionManagement
// // @ComponentScan(basePackages = "com.gruppe5.fbcmanager.*")
// @EntityScan(value = "com.*")
// @ComponentScan(basePackages = "com.*")
// @EnableJpaRepositories("com.gruppe5.fbcmanager.repositories")
// // @EnableJpaRepositories("com.*")
// // @EnableJpaRepositories

// public class SpringDataConfiguration {
//     @Bean
//     public DataSource dataSource() {
//         DriverManagerDataSource dataSource = new DriverManagerDataSource();
//         // dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//         // dataSource.setUrl("jdbc:mysql://localhost:3306/FBCManager");
//         // dataSource.setUsername("root");
//         // dataSource.setPassword("123");

//         dataSource.setDriverClassName("org.h2.Driver");
//         dataSource.setUrl("jdbc:h2:mem:testdb");
//         dataSource.setUsername("sa");
//         dataSource.setPassword("");
        
//         return dataSource;
//     }

//     @Bean
//     public JpaTransactionManager transactionManager(EntityManagerFactory emf) {
//         return new JpaTransactionManager(emf);
//     }

//     @Bean
//     public JpaVendorAdapter jpaVendorAdapter() {
//         HibernateJpaVendorAdapter jpaVendorAdapter = new HibernateJpaVendorAdapter();
//         jpaVendorAdapter.setDatabase(Database.MYSQL);
//         jpaVendorAdapter.setShowSql(true);
//         return jpaVendorAdapter;
//     }

//     @Bean
//     public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
//         LocalContainerEntityManagerFactoryBean localContainerEntityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
//         localContainerEntityManagerFactoryBean.setDataSource(dataSource());
//         Properties properties = new Properties();
//         properties.put("spring.h2.console.enabled",true);
//         properties.put("spring.datasource.url","jdbc:h2:mem:testdb");
//         properties.put("spring.datasource.driverClassName","org.h2.Driver");
//         properties.put("spring.datasource.username","sa");
//         properties.put("spring.datasource.password","");
//         properties.put("spring.jpa.show-sql","true");
//         properties.put("spring.jpa.properties.hibernate.dialect","org.hibernate.dialect.H2Dialect");
//         properties.put("spring.jpa.hibernate.ddl-auto","create-drop");
//         properties.put("spring.h2.console.path","/h2");
//         // properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
//         // properties.put("generate-ddl", true);
//         // // properties.put("hibernate.hbm2ddl.auto", "create-drop");
//         // properties.put("hibernate.hbm2ddl.auto", "create");
//         // // properties.put("hibernate.hbm2ddl.auto", "update");
//         // properties.put("show-sql", true);
//         // properties.put("logging.level.org.hibernate.SQL", "DEBUG");
//         // properties.put("logging.level.org.springframework.web","DEBUG");
//         // properties.put("logging.level.org.hibernate", "ERROR");
//         // properties.put("logging.level.com","DEBUG");

// // spring.h2.console.enabled=true
// // spring.datasource.url=jdbc:h2:mem:testdb
// // spring.datasource.driverClassName=org.h2.Driver
// // spring.datasource.username=sa
// // spring.datasource.password=
 
// // spring.jpa.show-sql=true
// // spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
// // spring.jpa.hibernate.ddl-auto= create-drop
// // # default path: h2-console
// // spring.h2.console.path=/h2

//         // properties.put("hibernate.hbm2ddl.auto", "none");

//         localContainerEntityManagerFactoryBean.setJpaProperties(properties);
//         localContainerEntityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
//         // localContainerEntityManagerFactoryBean.setPackagesToScan("com.gruppe5.fbcmanager");
//         // localContainerEntityManagerFactoryBean.setPackagesToScan("com.gruppe5.fbcmanager.repositories");
//         localContainerEntityManagerFactoryBean.setPackagesToScan("com.*");
//         return localContainerEntityManagerFactoryBean;
//     }
// }

// // TODO må ikke slettes endnu :D
// // hibernate.cfg.xml
// // <!-- <?xml version='1.0' encoding='utf-8'?>
// // <!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate
// // Configuration DTD//EN"
// // "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

// // <hibernate-configuration>
// // <session-factory>
// // <property name="hibernate.connection.driver_class">
// // com.mysql.cj.jdbc.Driver
// // </property>
// // <property name="hibernate.connection.url">
// // jdbc:mysql://localhost:3306/FBCManager
// // </property>
// // <property name="hibernate.connection.username">root</property>
// // <property name="hibernate.connection.password">123</property>
// // <property name="hibernate.connection.pool_size">50</property>
// // <property name="show_sql">true</property>
// // <property name="hibernate.hbm2ddl.auto">none</property>
// // </session-factory>
// // </hibernate-configuration> -->

// // META-INF/persistence.xml
// // <!-- <persistence xmlns="http://java.sun.com/xml/ns/persistence"
// // xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
// // xsi:schemaLocation="http://java.sun.com/xml/ns/persistence
// // http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd" version="2.0">
// // <persistence-unit name="fbcmanager"> -->
// // <!-- <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
// // <properties>
// // <property name="javax.persistence.jdbc.driver"
// // value="com.mysql.cj.jdbc.Driver" />
// // <property name="javax.persistence.jdbc.url"
// // value="jdbc:mysql://localhost:3306/FBCManager" />
// // <property name="javax.persistence.jdbc.user" value="root" />
// // <property name="javax.persistence.jdbc.password" value="123" />
// // <property name="hibernate.dialect"
// // value="org.hibernate.dialect.MySQL8Dialect" />
// // <property name="hibernate.show_sql" value="true" />
// // <property name="hibernate.format_sql" value="true" />
// // <property name="hibernate.hbm2ddl.auto" value="create" />
// // </properties> -->
// // <!-- </persistence-unit>
// // </persistence> -->

// // application.properties

// // # spring.datasource.url=jdbc:mysql://localhost:3306/FBCManager
// // # spring.datasource.username=root
// // # spring.datasource.password=123
// // # spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
// // # spring.jpa.show-sql=true
// // # spring.jpa.generate-ddl=true
// // # spring.jpa.hibernate.ddl-auto=none
// // # # spring.jpa.hibernate.ddl-auto=create-drop
// // # springdoc.swagger-ui.use-root-path=true