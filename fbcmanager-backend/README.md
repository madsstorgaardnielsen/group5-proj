For at lave en "service" skal der bruges: 

Controller (tager imod http request)
Service (Bruges som mellemled imellem controller og database)
Repository (abstraktion af metoder til crud operationer via database)
Model(Entity + DTO) (dto bruges til over rykke data rundt i backend, og entity bruges til at gemme data i db)

Alt der skal bruges til ovenstående ligger i domain mappen

Derudover vil det være en fordel at implementere exceptions og tests
Der er implementeret nogen exceptions, men nok langt fra nok

Alt der hedder noget med User kan bruges som et "vejledende" eksempel, der burde det meste være implementeret, dog langt fra perfekt




