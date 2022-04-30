using AutoMapper;
using fbcmanager_api.Database.Models;
using fbcmanager_api.Models.DAOs;
using fbcmanager_api.Models.DTOs;

namespace fbcmanager_api.Utils;

public class ObjectMapper : Profile {
    public ObjectMapper() {
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<User, UserDAO>().ReverseMap();
        // CreateMap<UserDTO, User>().ReverseMap();

        CreateMap<Event, EventDTO>().ReverseMap();
        CreateMap<Event, EventDAO>().ReverseMap();

        CreateMap<Booking, BookingDTO>().ReverseMap();

        CreateMap<Field, FieldDTO>().ReverseMap();
        CreateMap<Field, FieldDAO>().ReverseMap();

        CreateMap<News, NewsDTO>().ReverseMap();

        CreateMap<Practise, PractiseDTO>().ReverseMap();
        CreateMap<Practise, PractiseDAO>().ReverseMap();

        CreateMap<Team, TeamDTO>().ReverseMap();
        CreateMap<Team, TeamDAO>().ReverseMap();


        // CreateMap<EventDTO, Event>().ReverseMap();
    }
}