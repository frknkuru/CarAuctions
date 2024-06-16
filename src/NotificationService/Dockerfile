FROM mcr.microsoft.com/dotnet/sdk:7.0 as build 
WORKDIR /app
EXPOSE 80

# copy all .csproj files and restore as distinct layers. Use of the same copy command
# for every dockerfile in the project to take advantage of docker caching
COPY CarsAuction.sln CarsAuction.sln

COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/NotificationService/NotificationService.csproj src/NotificationService/NotificationService.csproj
COPY test/AuctionService.UnitTests/AuctionService.UnitTests.csproj test/AuctionService.UnitTests/AuctionService.UnitTests.csproj
COPY test/AuctionService.IntegrationTests/AuctionService.IntegrationTests.csproj test/AuctionService.IntegrationTests/AuctionService.IntegrationTests.csproj

# restore package deps
RUN dotnet restore CarsAuction.sln

# copy the app folders
COPY src/NotificationService src/NotificationService
COPY src/Contracts src/Contracts
WORKDIR /app/src/NotificationService
RUN dotnet publish -c Release -o /app/src/out

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "NotificationService.dll" ]