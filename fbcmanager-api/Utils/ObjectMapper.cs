using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DTOs;

namespace fbcmanager_api.Utils;

public class ObjectMapper : Profile {
    public ObjectMapper() {
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<User, CreateUserDTO>().ReverseMap();
        CreateMap<User, UpdateUserDTO>().ReverseMap();

        CreateMap<Event, EventDTO>().ReverseMap();
        CreateMap<Event, CreateEventDTO>().ReverseMap();
        CreateMap<Event, UpdateEventDTO>().ReverseMap();

        CreateMap<Booking, BookingDTO>().ReverseMap();
        CreateMap<Booking, CreateBookingDTO>().ReverseMap();
        CreateMap<Booking, UpdateBookingDTO>().ReverseMap();

        CreateMap<Field, FieldDTO>().ReverseMap();
        CreateMap<Field, CreateFieldDTO>().ReverseMap();
        CreateMap<Field, UpdateFieldDTO>().ReverseMap();

        CreateMap<News, NewsDTO>().ReverseMap();
        CreateMap<News, CreateNewsDTO>().ReverseMap();
        CreateMap<News, UpdateNewsDTO>().ReverseMap();

        CreateMap<Practise, PractiseDTO>().ReverseMap();
        CreateMap<Practise, CreatePractiseDTO>().ReverseMap();
        CreateMap<Practise, UpdatePractiseDTO>().ReverseMap();

        CreateMap<Team, TeamDTO>().ReverseMap();
        CreateMap<Team, CreateTeamDTO>().ReverseMap();
        CreateMap<Team, UpdateTeamDTO>().ReverseMap();
    }
}