# user_login_logout_api
developed by: Sanjay Bharti

## Register route
Send Request 
POST  /api/register
content-type: applicatio/json

{
    "name":<name>,
    "email":<email>,
    "password":<password>
}

Response

{
    "success":1,
    "token":token
}


## Login route
Send Request 
POST  /api/login
content-type: applicatio/json

{
    "email":<email>,
    "password":<password>
}

Response

{
    "login":"Success",
    "token": token
}

## Change Password route
Send Request 
POST  /api/change_password
content-type: applicatio/json
Authentication: Bearer <token>
{
    "old_password":<old_password>,
    "new_password":<bew_password>
}

Response

{
    "login":"success",
    "message":"password changed successfully",
    "token":token
}