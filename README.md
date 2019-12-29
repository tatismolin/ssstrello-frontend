# Ssstrello

**Simple Task Management Tool for tracking progress on a Project.**

Project is being displayed on a page with multiple lists attached to it.
To Do, In Progress, Done and Backlog lists keep progress on tasks and organize them based on status.
Tasks can be dragged and dropped between the lists, edited and deleted. New task can be created on each list.
Each Task has a name, that can be edited inline and priority, that is displayed in a tooltip when hovering over the task name.

![background](/ssstrello.png)

**Demo:** [YouTube](https://www.youtube.com/watch?v=o4hqKYVbbqc)

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
* _Run the command 'rails db:migrate' which will create the database;_
* _Run the command 'rails db:seed' which will populate the database with existing user/plan/lists/tasks data;_
* _Run the command 'rails s' to start backend server;_
4. Open a separate terminal window/tab and navigate into the frontend folder:
* _Run the command 'lite-server' to start frontend server._


**Future features:**
- [ ] login functionality;
- [ ] multiple users;
- [ ] multiple plans;
- [ ] plans shared between users;
- [ ] ability to create new lists;
- [ ] search functionality;
- [ ] filter functionality.


**Ssstrello is a clone of a Trello App and was created for educational purposes only.**
**Created by Tatiana Smolin as part of a MOD3 solo Project at Flatiron School.**
