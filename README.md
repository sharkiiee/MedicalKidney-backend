## MedicalKidney-backend Project 

### Overview
- Its a mini project that helps medical workers to insert data about patient kidneys (users).
### Features :-
**User Registration :** Users can sign up by providing essential information, including a unique username, password, and kidney information

**Validation :** The username should be a email and password should have min 6 char.

**kidney Database :** It basically stores all your information about user kidneys if heathy or unhealthy.
## Info about routes:-
### Routes :-

- GET /user/kidneydata
	Description : shows the user data about kidneys.
	headers : username , password
	middleware - Create - userMiddleware - checks if the user is present in the database. 
	output : username, healthyKidneys, unhealthyKidneys.

- POST /user/signup 
	Description : Adding new user in the database
	Header Input : username, password,
	validation : check the inputs are valid
	Output : "${username} is been added to our database"

- PUT /user/updatekidney
	Description :- Changing unhealthy kidney of user with healthy kidney.
	middleware :- userMiddleware
	output : - "Replaced unhealthy kidney with healthy kidney"

- PUT /user/deletekidney
	Description :- Removing the healthy kidney of the user if user is having two kidneys.
	middleware :- userMiddleware
	output :- "kidney is been donated"

- DELETE /user/deletecollection
	Description :- Remove the whole collection from the database
	middleware :- usermiddleware
	Output :- "Collection is been deleted"
	