package com.gruppe5.fbcmanager.exceptions;


import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

import com.gruppe5.fbcmanager.domain.models.ErrorModel;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<ErrorModel> entityNotFoundException(EntityNotFoundException e) {
        ErrorModel error = new ErrorModel(HttpStatus.NOT_FOUND, "Entity not found", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);

    }

    @ExceptionHandler(EntityExistsException.class)
    private ResponseEntity<ErrorModel> entityExistsException(EntityExistsException e){
        ErrorModel error = new ErrorModel(HttpStatus.CONFLICT, "Unique attribute constraint", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        ErrorModel error = new ErrorModel(HttpStatus.BAD_REQUEST, "Input validation error", ex.getBindingResult().toString());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
