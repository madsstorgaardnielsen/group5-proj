# group5-proj

This is a joint project made spring 2022 in DTU courses: 
* 02363 - Front End Web Technology 
* 62597 - Backend development, operations and distributed Systems

The project is a sports application, in which it is possible to check news, sign up to events etc. 
The deployed backend project can be accessed at http://130.225.170.74/

Project is made by Group 05:
* Mads Storgaard-Nielsen - S180076
* Marie Seindal - S185363
* Marcus Kastrup Ottosen - S205348
* Rasmus Jehn Pedersen - S205357
* Victor Kongsbak - S205363
* Frederik Lundsbjerg - S205472


# Setup of C# backend
The backend has been made in C#. The backend is running on the above IP-address. Should you want to run it locally, follow the guide below.

1. Download and install .NET v. 6

2. Download an IDE - We are using JetBrains Rider

3. Run database in Docker container called FBCManager

4. Connect to the DB in MySQLWorkbench

5. Run following SQL-commands in order: 
	1. DROP SCHEMA `FBCManager`;
	2. CREATE SCHEMA `FBCManager`;
	3. USE FBCManager;

6. When the backend has been opened in the IDE, in terminal run: 
	1. dotnet ef migrations add init
	2. dotnet ef database update

7. The backend is up and running 
