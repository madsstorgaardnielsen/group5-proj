package com.gruppe5.fbcmanager.exceptions.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpStatus;

public class ErrorModel {

    private HttpStatus statusCode;

    private String timestamp;

    private String reason;

    private String errorInfo;

    public ErrorModel(HttpStatus statusCode, String reason, String errorInfo) {
        this.statusCode = statusCode;
        this.timestamp = LocalDate.now().format(DateTimeFormatter.ofPattern("d-M-yyyy")) + " "+ LocalTime.now().format(DateTimeFormatter.ofPattern("HH.mm.ss"));
        this.reason = reason;
        this.errorInfo = errorInfo;
    }

    public HttpStatus getStatusCode() {
        return statusCode;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getReason() {
        return reason;
    }

    public String getErrorInfo() {
        return errorInfo;
    }
}
