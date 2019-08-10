# The-Nile-List

This is a node js application that mimics an online store like Amazon or Craigslist, but uses a CLI and bash terminal to display items and take in commands. This application was developed to practice making node cli applications, using npm packages, and making them work with a local MySQL database.

### Prerequisites

The following npm packages are required for this program:

inquirer: "^6.5.0",<br/>
mysql: "^2.17.1"

## Program Operation

After the required dependencies have been installed the program can be started by using the terminal CLI. There are two applications that can be used, theNileList.js, which is designed for users to browse and purchase items, and supremeNileList.js, which is for supervisors to monitor and maintain stock.<br/>

theNileList.js can be started by typing 'node theNileList.js' in the terminal.

![Start](/images/101.png?raw=true "Command to start program")

Once this is done the user will be presented with a list showing the wares for sale:

![Menu](/images/102.png?raw=true "Items for sale")

### Concert-This

If Concert-This is selected the user must then enter the name of a band they wish to find concerts for. A list of Concerts, their dates, and location will then be displayed.

![Concert This](/images/ct.jpg?raw=true "Concert This")

### Spotify-This-Song

If Spotify-This-Song is selected the user will be prompted to enter the name of a song. The Artist Name, Song Title, Preview Link, and Album Name will then be displayed if the song is found.

![Spotify-This-Song](/images/st.jpg?raw=true "Spotify-This-Song")

If the user did not input a song, the search will default to "Ace of Spades" and the following should be displayed:

![Spotify-This-Song](/images/std.jpg?raw=true "Spotify-This-Song Default")


### Movie-This

If Movie-This is selected the user will be prompted to enter the name of a movie. The Movie Title, Year Released, IMDB & Rotten Tomatoes Ratings, Countries of Production, Language, Plot Summary and Staring Actors will then be displayed.

![Movie-This](/images/mt.jpg?raw=true "Movie-This")

If the user did not input a movie, the search will default to "Mr. Nobody" and the following should be displayed:

![Movie-This](/images/mtd.jpg?raw=true "Movie-This Default")

### Do-What-It-Says

If the user selects this option, a search for concerts, a song, or a movie will be performed depending on the contents of a file named random.txt located in the same folder as the liri program.<br/>

Examples:<br/>

Concert Search
![Do This](/images/dwisc.jpg?raw=true "Concert Search")

Song Search
![Do This](/images/dwiss.jpg?raw=true "Song Search")

Movie Search
![Do This](/images/dwism.jpg?raw=true "Movie Search")



### Quit

If the user does not wish to perform any of the above functions, Quit may be selected to leave the program.

