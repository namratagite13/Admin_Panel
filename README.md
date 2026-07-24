# Admin Panel  
#### Add lectures, assign instructor.  Login with credentials as Admin or Instructor.  
#### Live Demo :  https://admin-panel-z730.onrender.com  
#### Video Link: 

#### Tech Stack  
1 Backend : Node.js, Express.js , MongoDB, JWT, bcrypt  
2 Frontend : React.js, Tailwind css  

#### Environmental variables:   

PORT=5000  
MONGODB_URI=youre_atlas_mongodb_db_URI   
SECRET_ACCESS_TOKEN=your-secret-token  
  
#### API endpoints  
Authentication  
POST /api/auth/register  -> regsiter new User  
POST /api/auth/login  -> logs new User  
GET /api/auth/instructor   -> get instrctors profile  
GET /api/auth/id  -> for profile  
   

#### Lecture endPoints   
POST /api/lecture/create  -> create lecture as admin   
GET /api/lecture/all  -> get all lectures  
GET /api/lecture/:id  -> get lecture by id  

#### Schedule endPoints    
POST /api/schedule/post -> schdeule lecture assign instructor to the lecture as admin   
GET /api/schedule/all   -> get all scheduled lectures  
GET /api/schedule/my-schedule  -> get schedule as instrctor  



#### Controllers  

userController  
register| login| getProfile | instructor  

schdeuleController 
scheduleLecture | getAllLecture | getInstructorLectures  

lectureController  
createLecture | getLecture | getLectureById  


#### Middleware  
Authmiddleware -> for securing routes and passing JWT key  
isAdmin -> for only allowing admin to process route  

### Frontend    

##### Pages      
1. Login- for user login as admin or instrctor  
2. Register - for user registration  
3. AdminPage - for admin panel handling  
4. Lnstructor - for intructor assign lectures  
5. Lectures  - for mapping all lectures  

##### Routes  
ApiRoutes  - Used axios for secure communication between backend routes and frontend functions.  
