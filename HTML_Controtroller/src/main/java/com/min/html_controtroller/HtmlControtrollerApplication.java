package com.min.html_controtroller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class HtmlControtrollerApplication {

    public static void main(String[] args) {
        SpringApplication.run(HtmlControtrollerApplication.class, args);
    }

}
