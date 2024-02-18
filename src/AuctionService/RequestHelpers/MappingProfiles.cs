using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;

namespace AuctionService.RequestHelpers;

public class MappingProfiles : Profile
{
  public MappingProfiles()
  {
    CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item);
    CreateMap<Item, AuctionDto>();
    CreateMap<CreateAuctionDto, Auction>()
      .ForMember(d => d.Item, o => o.MapFrom(s => CreateItemFromDto(s)));
  }
  private Item CreateItemFromDto(CreateAuctionDto dto)
  {
    return new Item
    {
      Make = dto.Make,
      Model = dto.Model,
      Year = dto.Year,
      Color = dto.Color,
      Mileage = dto.Mileage,
      ImageUrl = dto.ImageUrl,
    };
  }

}
