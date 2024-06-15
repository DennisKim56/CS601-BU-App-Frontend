# Final Product Hosting Location

https://bu-planner.com/

# Front-end git repository

https://github.com/DennisKim56/cs601-bu-app-frontend

# Back-end git repository

https://github.com/DennisKim56/cs601-bu-app-backend

# BU Planning App

## Background

The BU Planning App is intened to help BU graduate students who are
participating or will participate in an online master's program. This tool
assists users in planning and managing their academic journey. This was a
pain point for me when I first started my program so I wanted to build a tool
that could help relieve that pain for future grad students.

Due to time constraints, this app currently supports only those master programs
under the "Computer Science & IT" subject. To see a full list of covered
programs, navigate to the "Programs" tab in the navigation side menu.

## Front End

The front end consists of the following major "pages":
Home Page - Landing page with mission statement
About Page - About me page
Programs Page - This lists the covered programs and hyperlinks to the respective
Boston University resource.
Courses Page - This lists the covered courses and provides a way to filter
courses using the search bar at the top. You can click on a course to show a
modal window with a course description and any pre-requisites.
Login Page - This page gives users a way to login to the app and access their
plan data. The user is authenticated via user API route. If the login fails, an
error message is displayed. There is a navigation link to the user creation page
Create Account Page - This page allows users to create an account. The creation
form provides very light form data validation. It only checks to ensure that
names contain letters, emails conform to traditional email syntax, usernames
contain only letters and numbers, passwords contain only letters, numbers, and
select symbols, and passwords must match. Once the form is valid, a user can
submit a create action which attempts to create a user in the backend. If the
username already exists, an error message is thrown. If the creation is
successful, the user is automatically logged in as that new user.
Create Plan Page - This page is protected by authentication - it can only be
accessed if you are logged in. If the user already has a plan, the page will
redirect the user to go view their plan. If the user does not have a plan,
they can select a program, a starting term, and a starting year. This
will generate a schedule framework and possible courses. The courses can be
dragged to the schedule spots. If a mistake is made, the schedule can be reset.
Once a schedule is created, the user can submit the plan.
View Plan Page - This page is protected by authentication - it can only be
accessed if you are logged in. If the user does not have a plan, the page will
redirect the user to go create a plan. The user can view their plan summary here
and they can also delete the plan if they wish.
View Finances Page - This page is protected by authentication - it can only be
accessed if you are logged in. If the user does not have a plan, the page will
redirect the user to go create a plan. The user can view their financial cost
per term based on course level and student services fees. A total is shown at
the bottom. Users can delete their plan here if they wish.
Footer - The footer contains a link to the about me page and a mailto link.
SideNavBar - The hamburger menu at the top opens a side nav menu bar with
navigation links.

## Back End

The backend application is written in node using express. The database solution
uses MongoDB with the mongoose library to provide schema-mapping options. The
backend uses the jsonwebtoken library to issue jsonwebtoken and uses the bcrypt
library to hash passwords before storing them in the database.
The major data object models used are: ChoiceCourse, Course, Plan, Program,
ProgramDefinition, and User.
The major API endpoints supported are:
{host}/api/courses - GET, POST
{host}/api/plans - GET, POST, DELETE
{host}/api/programdefinitions - GET, POST
{host}/api/programs - GET, POST
{host}/api/users - GET, POST
The user endpoint has a check endpoint that is used to verify webtokens on
re-render.

## Authentication

Authentication is achieved by hashing passwords and storing them in the db. When
a user logs in, their password is hashed and compared to the db record. If they
match, a JSON web token (JWT) is issued to the user. The front end will then
write the JWT to localstorage for future use. Most of the APIs are public and
do not require a JWT. The Plan APIs reveal user-specific plan data and is
protected by authentication - all API requests to the Plan endpoints require
a bearer token (of the JWT) in the request headers. The JWT is verified before
executing Plan API functions.
JWTs are set to expire after 1 hour from time of issuance.

## Hosting solution

The backend node app is hosted on heroku:
https://bu-planner-backend-2defa9e65bad.herokuapp.com/api

The frontend app is housed in an S3 bucket in AWS as static files. In order to
use a custom web domain, I created a hosted-zone in Router 53 and mapped the
CNAME, SOA, and NS entries to my domain. The A record is mapped to the S3
bucket.

In order to support HTTPS, I requested an SSL certificate from AWS and ran the
deployment through a cloud front distribution carrying the cert with a TLS1.2
policy. This also allows me to take advantage of CDN for caching and global
presence.

## Extra Credit

This project utilizes the Drag and Drop API for the schedule building component

This project utilizes several APIs

This project makes use of flex displays in over 30 locations and grid displays
in 8 locations. NOTE: I did not have time to make the web application fully
responsive for the mobile experience - it looks pretty terrible on a phone right
now and requires the addition of a lot more media queries and fluid styling. The
header and footer in particular need some tuning.
