# cubex-routes

sudo apt update</br></br>

sudo apt install -y mongodb</br></br>

git clone https://github.com/artshirin2009/cubex-routes.git</br></br>

npm install</br></br>

Routes:</br></br>

http://localhost:4000/registration  </br>
Form   - Form Url Encoded </br>
Header - Content-Type - application/x-www-form-urlencoded  </br></br>


http://localhost:4000/login </br>
Form - Form Url Encoded </br>
fields - email </br>
Header - Content-Type - application/x-www-form-urlencoded  </br></br>


http://localhost:4000/updateUser </br>
Form - Multipart Form </br>
fields: </br>
  id </br>
  email </br>
  imageFile </br>
  name </br>
  password </br>
Header - Content-Type - multipart/form-data  </br></br>

http://localhost:4000/                               -  secured route</br>



http://localhost:4000/profile/:id                    -  secured route</br></br>


get images: http://localhost:4000/uploads/*file_name*
