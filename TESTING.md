Component test: 

We tested 6 components for the following functionalites. 

1. Welcome component (Welcome.test) should have text content "Welcome to BigBrain!". 
2. DropDown menu (DropDown.test) should has an input label with given id, has 3 options, has options which has value matched with props, has as defualt value, calls function when on change. 
3. Navigation tab (NavTab.test) should render a list of 3 tabs, have a tab for dashboard, have a tab for report, have a tab for logout and navigate to welcome page.
4. Result for player (PlayerResult.test) should have correct player name, have correct player result information statistic. 
5. Lobby (Fun.test) should have links to relaxing cat video,have a relaxing image.
6. ReportList (ReportList.test) should have a list header, have a header being the quiz name, contains session id in session item, calls function when session item is clicked. 

UI integration test 

We tested happy path, and another path. Assertions are made to test against expected behaviours.  

Happy path: 
1. Registers successfully
2. Creates a new game successfully
3. Create a single choice question with 2 options 
4. Starts a game successfully
5. Ends a game successfully (yes, no one will have played it)
6. Loads the results page successfully
7. Logs out of the application successfully
8. Logs back into the application successfully

Another path: 
1. Unsuccessful login
2. Successful login
3. Create a quiz by uploading a json file 
4. For the new quiz, edit a MCQ by changing its name and adding a new option
5. Delete a question 
6. Log out