package com.gruppe5.fbcmanager;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

import com.gruppe5.fbcmanager.configuration.SpringDataConfiguration;
import com.gruppe5.fbcmanager.database.models.Address;
import com.gruppe5.fbcmanager.database.models.Practise;
import com.gruppe5.fbcmanager.database.models.User;
import com.gruppe5.fbcmanager.database.repositories.PractiseRepository;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { SpringDataConfiguration.class })
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PractiseTest extends InitTestData {
    @Autowired
    PractiseRepository practiseRepository;

    @Test
    @Order(1)
    void testLoadPractises() {
        List<Practise> practises = (List<Practise>) practiseRepository.findAll();

        assertAll(
                () -> assertTrue(practises.size() > 0),
                () -> assertEquals("team1", practises.get(0).getTeam()),
                () -> assertEquals("location", practises.get(0).getLocation()),
                () -> assertEquals(LocalDate.of(2022, Month.JANUARY, 22), practises.get(0).getDate()),
                () -> assertEquals(LocalTime.of(17, 30), practises.get(0).getTimeStart()),
                () -> assertEquals(LocalTime.of(20, 30), practises.get(0).getTimeEnd()));
    }

    @Test
    @Order(2)
    void testAddTrainerToPractise() {
        List<Practise> practises = (List<Practise>) practiseRepository.findAll();
        User træner1 = new User(
                "træner1",
                "træner1",
                "træner1",
                "træner1",
                "træner1");
        træner1.setAddress(
                new Address(træner1, "træner1", "træner1", "træner1"));
        User træner2 = new User(
                "træner2",
                "træner2",
                "træner2",
                "træner2",
                "træner2");
        træner2.setAddress(
                new Address(træner2, "træner2", "træner2", "træner2"));

        assertNull(practises.get(0).getTrainers());

        List<User> trainers = new ArrayList<>();
        trainers.add(træner1);
        trainers.add(træner2);

        practises.get(0).setTrainers(trainers);

        assertAll(
                () -> assertEquals("træner1", practises.get(0).getTrainers().get(0).getFirstname()),
                () -> assertEquals("træner2", practises.get(0).getTrainers().get(1).getFirstname()));

    }

    @Test
    @Order(3)
    void testAddParticipantsToPractise() {
        List<Practise> practises = (List<Practise>) practiseRepository.findAll();

        User participant1 = new User(
                "participant1",
                "participant1",
                "participant1",
                "participant1",
                "participant1");
        participant1.setAddress(
                new Address(participant1, "participant1", "participant1", "participant1"));

        User participant2 = new User(
                "participant2",
                "participant2",
                "participant2",
                "participant2",
                "participant2");
        participant2.setAddress(
                new Address(participant2, "participant2", "participant2", "participant2"));
        List<User> participants = new ArrayList<>();
        participants.add(participant1);
        participants.add(participant2);
        practises.get(0).setParticipants(participants);

        assertAll(
                () -> assertEquals("participant1", practises.get(0).getParticipants().get(0).getFirstname()),
                () -> assertEquals("participant2", practises.get(0).getParticipants().get(1).getFirstname()));
    }
}
