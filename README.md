## MedicalKidney-backend Project 

- Its a mini project containing data about kidneys of the user.


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
	