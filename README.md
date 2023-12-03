# Revise Maths
This maths game is designed as a fun and engaging way of helping young kids study and get better at mental arithmetic. This game was created purely for educational purposes. 

# Business/Social Goals
- Create a fun and engaging platform for young kids to learn arithmetic and help them develop an interest in mathematics and logical thinking. 
- Add a competitive edge to the game by using a timer for each arithmetic session - this will allow the user to either compete against peers or themselves in the amount of questions they answer correctly within a set timeframe. 
- Create an intuitive interface for young users to increase comfort with using the program, and encourage them to use it repeatedly - drive traffic onto the website. 
- Encourage the idea that games can be used as an additional tool in learning, and not as a form of distraction.
- Allow users to take their time revising any errors in their own time following each timed arithmetic session.

# UX Goals
- Create a simple and intuitive user interface for young and first time users to foster a sense of comfort and reassurance. 
- To allow the user as much control over their learning enviornments as possible and appropriate - ensure they can pick what kind of arithmetic they want (addition&subtraction, multiplication, division, or random), include 'Skip' and 'Exit' buttons for each session in case the user becomes overwhelmed.
- Add a filtering system for the incorrectly answered questions if user is using the 'random' category, and colour differentiate to mark the different categories in the tabs side of the revision panel. 
- Make sure the UI maintains its focus on content by excluding all unnecessary information. 
- Where colours are used, they are to be used for the purpose of highlighting or differentiating one element from another. 

# Structure 
The structure of the 'Revise Maths' game is as follows: 

## Page 1
- Intro
    - Title of game
    - Subtitle
    - Name Input field
- Arithmetic category selection 
    - addition&subtraction, 
    - multiplication,
    - division
- Footer
    - Copyright
    - Terms and Conditions
    - Socials 
        - LinkedIn
        - GitHub
        - Instagram

## Page 2 (from left to right, top to bottom)
- Intro
    - Title of game
    - User greeting
- Game area
- Buttons for user control
- Score tracking
    - right answers
    - wrong answers -> + revision area for all answers answered incorrectly with filtering system. 
- 'Exit' button for returning to home page. 
- Footer (same content as _Page 1_). 

# Scope of Application

The scope of this application is as follows: 
1. This is a front end application, created to help young users with mental arithmetic and logical thinking. 
2. A heading with the name of the application and a short description on the first 'login' page. Wording is kept to the bare minimum after this to ensure attention is directed towards necessary fields only - the game field, and later the revision field. 
3. Category selection - so users can pick the type of arithmetic they would like to practice. This works as a type of difficulty selection. 
4. The game field contains a small introduction with the user's name and the task they are to solve. 
5. 'Submit' and 'Skip' buttons below the field. Additional logic is implemented to handle 'Enter' keypress instead of 'Submit'. 'Skip' skips one question. 
6. Score tracking for answered questions. 
7. A revision field for incorrectly answered questions. Tabs at the edge of this field record the incorrectly answered questions for revision later. 
8. 'Exit' button to end the session. 
9. Footer containing copyright, t&c, and links to social platforms (LinkedIn, GitHub, and Instagram). 

# Strategy
It is the goal of this application to create a dynamic, intuitive, and simple interface to help young users study, improve and speed up their mental arithmetic and logical thinking. To design the application, aspects like target audience, key information deliverables, visual simplicity, and data transfer were key considerations: 

## Target Audience
- Young users (6 - 12 yrs)

## Key Information Deliverables
- Category Selection
- Game field with relevant information
- Visual score tracking 
- Revision Field with tabs

## Visual Simplicity
- Minimise distraction by avoiding images and icons within the main fields, but use colours to engage young users and emphasise information containers and user interactions where appropriate. 
- White Space in main fields (gaming and revision) to minimise distraction of cintent around + 'clear' space for thinking + place emphasis on task inside these fields. 
- Minimum and concise wording - Clear headings, short description + greeting, recognisable, one-word buttons describing purpose (with caution of avoiding 'Quit' on the exit button to avoid negative conotation). 
- Visual score tracking system using red for wrong answers and green for correct answers + large numbers for amount of wrong/right answers recorded. 
- Recognisable tab system (often used in school folders) for recording incorrect answers for easy recognition. 

This application is intended to be used primarily on laptop, but actively considers visual appeal and usability on phones through media queries and content placement/spacing. 

# Wireframes
![application wireframe](docs/images/wireframe.png)

# Aesthetics
# Features
# Technologies
# Testing & Debugging
# Accessibility & Performance
# Deployment
The application is deployed on Gitpages through github, and is available for viewing in the link at the top of this README.md document. To deploy a github repository, follow the following steps: 

1. Login to your github account
2. Click on your repository section under your profile icon, and select the repository you want to deploy.
3. Once you are in your repository, click ' Settings' in the top bar. 
4. Select 'Pages' from the menu on the left. 
5. Ensure the 'Source' section is set to 'Deploy from a branch'.
6. Ensure you deploy from the main branch in your root directory. The screen should look something like this: 
![github pages]()
7. The site you want to deploy is given a URL, available above the source section, as in the image above. It might take a while for this link to become visible and active. 

### Forking a Github Repository

If you want to make changes to your repository (or part of it) without affecting it, you can 'fork' it (make a copy of it). This ensures the original repository remains unchanged. To fork a github repository, follow the following steps: 

1. Click into the github repository you want to fork. 
2. Click 'Fork' in the top right hand side of the top bar, and this should take you to a page titled 'Create a new fork'
3. You can now work in this copy of your repository without it affecting the original. 

### Cloning a Github Repository
Cloning a repository essentially means downloading a copy of your repository that can be worked on locally. This method allows for version control and back up of code. To clone a github repository, follow the following steps: 

1. Click into the github repository you want to clone. 
2. Press the 'Code' button. This should open a section similar to the one below. 
![Clone Code Button Dropdown]()
3. Copy the link in this dropdown
4. Open a terminal within your VSC (or whatever IDE you choose to use). 
5. In the terminal type 'git clone' and paste the URL. 
6. Press Enter - you now have a cloned version of your github repository.
# Credits
# Acknowledgements