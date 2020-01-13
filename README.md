# Ssstrello

**Simple Task Management Tool for tracking progress on a Project.**


Ssstrello is a clone of a popular task management tool, Trello. It has lists and tasks organized by projects. Each project has multiple lists, for example, "To Do", "In Progress", "Done". Each list has multiple tasks. Tasks can be dragged and dropped between lists and edited inline. Ssstrello has full CRUD on lists and tasks. Written in JavaScript/HTML/CSS on a Frontend and Ruby on Rails on a backend.

![background](./pictures/ssstrello.gif)

**Demo:** [YouTube]()

**Stack:**
> - Ruby on Rails;
> - JavaScript;
> - HTML/CSS.

**API:**
> - [WikiHow API](https://rapidapi.com/hargrimm/api/wikihow)

**How to run instructions:**
1. Fork and clone this Project's GitHub repository.  
2. Have current version of Ruby, Rails and Lite Server installed.
3. Open a terminal and navigate into the backend folder:
* _Install required gems (listed in Gemfile) by running the command 'bundle install';_
* _Run the command 'rails db:create' which will create the database;_
* _Run the command 'rails db:migrate' which will do DB migrations;_
* _Run the command 'rails db:seed' which will populate the database with existing user/plan/lists/tasks data;_
* _Run the command 'rails s' to start backend server;_
4. Open a separate terminal window/tab and navigate into the frontend folder:
* _Run the command 'lite-server' to start frontend server._


**Future features:**
- [ ] login functionality;
- [ ] multiple users;
- [ ] multiple plans;
- [ ] plans shared between users;
- [x] ability to create new lists;
- [ ] search functionality;
- [ ] filter functionality.


**Ssstrello is a clone of a Trello App and was created for educational purposes only.**
**Created by Tatiana Smolin as part of a MOD3 Solo Project at Flatiron School.**
