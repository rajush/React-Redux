#Step-through Redux flow

<h5> DISPATCH --> ACTION --> REDUCER --> mapStateToProps --> RENDER</h5>

Our CoursesPage is now connected to the Redux store, and the list of courses is available on **this.props.courses** because 
we set up the **mapStateToProps** function down below. Now, let's update the **render** function so that it displays the 
current list of courses. So right under the Courses header, we can say **this.props.courses.map**, and we will map to 
**this.courseRow**. Now this is a function we haven't created yet, so let's go create that function right up. And for 
hat function, we'll call it _courseRow_, and it will take the _course_ and the _index_ as parameters. In here, we will 
return, let's just do something simple, we'll return a div. And we'll give that div a key of index. Of course, _**we need 
to have a key anytime we're iterating**_. And we will just display the course title right below Courses header. 

So we can see we're just going to map over the list of courses, and then call the _courseRow_ function for each one of 
those courses. Now we should be all set to jump into the browser and see if this works. So we'll go over to the Courses 
tab, and we should be able to enter a course and hit 'Save'. And there we go.
 
Now we can see our courses are adding successfully. Of course, it would be nice if we cleared out this form, but we're 
really just doing this just to test the flow of Redux. We should be able to open this up. 
Lets just reload and make sure that's the case. Good! now courses are adding as expected. So we're running through the 
full Redux flow. 

This is a good time to set some breakpoints just so we can see how we walk through the Redux flow. 
Let's set a breakpoint here in our _**createCourse action creator**_. And then we'd also like to see this handled over 
in our _**courseReducer**_, so we can set a debugger right here in this case because we're expecting the createCourse 
action to be called. And then, of course, over here in our _**CoursesPage component**_, we would expect that when the course 
data changes, the **_mapStateToProps_** function would receive that new state and end up passing that state as 
**_this.props.courses_** to our component. And then, of course, finally, we would expect the _**render**_ function to be 
called after that occurs. So now that we've added all these debug statements, we can see linting is pretty cranky at this 
point because we are checking for that. But, of course, we'll take those out in a moment. Let's refresh just so 
that we have the debugger reflected here within our code. Let's just step past all of these initially. 

And now what we want to do is---of course, our render function's going to get called every time we hit a key. But now 
we are going to hit 'Save', and we'll be walking through the flow of Redux: 

1) The first thing that we see here is we're landing in the _**action creator**_. So there's our action creator getting 
called and getting passed this course with a title of **t**. 

2) Hit F8 to continue. And now we're landing over here in the **_courseReducer_**. We can see that _state_ 
right now is _empty_. There're no courses in state because this was initialized to an _empty array_, and the action in 
this case is _**CREATE_COURSE**_. 
So we're going to fall into this part of the switch statement, and we will use _Object.assign_ to take this course and 
then add it to the array, which is currently empty. 

3) Hit F8, and now we land over in **_mapStateToProps_**. So now we're back at the bottom of our _CoursesPage function_. 
We can see that _state_ right now has one course, the course that we just added with the title of **t**. _**OwnProps**_ 
in this case has all the data about the props that belong to our container component. 
But you can see that these let us get different information that's related to the URL and our routing data.

4) Then, finally, hit F8, we land up in the **_render function_**. And now we should find that courses has 
one element in it. So now our array is populated with that data. And that completes our Redux flow, React re-renders and 
shows this course right here. 

Great! So we just saw the entire Redux unidirectional flow. We're _**dispatching an action**_ right here within 
our CoursesPage that's landing over here in our **_createCourse action creator_** that's handled in our **_courseReducer_** right 
here looking for that particular actionType. And then we land back over here within our **_mapStateToProps function_** where 
we _pull the state and map it to our Courses property_. Then, finally, the new _**render**_ function is called right here. 
After, our mapStateToProps ends up injecting new data for our component. So now we have a nearly complete view of Redux. 
Not bad for so early in the course. But, there's a cleaner way to handle _**mapDispatchToProps**_. 

