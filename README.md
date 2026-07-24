# Admin Panel  
#### Add lectures, assign instructor.  
#### Live Demo :  

#### Tech Stack  
1 Backend : Node.js, Express.js , MongoDB, JWT, bcrypt  
2 Frontend : React.js, Tailwind css  

#### Environmental variables:   

PORT=5000  
MONGODB_URI=youre_atlas_mongodb_db_URI   
SECRET_ACCESS_TOKEN=your-secret-token  
  
#### API endpoints  
Authentication  
POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/instructor  
GET /api/auth/id  -> for profile
   

#### Lecture endPoints   
POST /api/lecture/create  
GET /api/lecture/all  
GET /api/lecture/:id  

#### Schedule endPoints    
POST /api/schedule/post  
GET /api/schedule/all  
GET /api/schedule/my-schedule  



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
