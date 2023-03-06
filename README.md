Welcome to our Social Media API!

Our API is designed to provide a comprehensive set of features that enable users to connect and share their thoughts and experiences with others in a seamless and engaging way. Whether you're building a social network from scratch or enhancing an existing platform, our API has everything you need to get started.

Features:

User authentication and authorization
Creating, editing, and deleting user accounts
Creating, editing, and deleting hmms (short posts)
Reacting to hmms with custom retorts
Connecting with friends
Comprehensive error handling and validation
Our API uses Node.js and Express for the server-side implementation and MongoDB for data storage. We have implemented RESTful endpoints that enable HTTP requests for creating, reading, updating, and deleting resources. Additionally, we have implemented robust error handling to ensure that our API is reliable and can handle unexpected inputs.

Whether you're building a simple chat application or a full-featured social network, our API provides the tools you need to create an engaging and dynamic user experience. Our goal is to provide developers with a flexible and easy-to-use API that can be customized to fit a variety of use cases. So why wait? Start building your social media app today.

To use our API routes, make sure you have Node.js and MongoDB installed on your machine. Clone our repository and install the required dependencies using npm.

To start the server, navigate to the root directory of the project and run the command npm start. This will start the server and allow you to make HTTP requests to our API endpoints.

Our API provides the following routes:

/api/users: Get all users or create a new user.
/api/users/:id: Get, update, or delete a user by ID.
/api/users/:id/friends/:friendId: Add or remove a friend from a user.
/api/hmms: Get all hmms or create a new hmm.
/api/hmms/:id: Get, update, or delete a hmm by ID.
/api/hmms/:id/retorts: Add a retort to a hmm.
/api/hmms/:id/retorts/:retortId: Delete a retort from a hmm.
When making HTTP requests to our API endpoints, include the appropriate request headers and provide the necessary request parameters in the URL. Our API will return JSON responses that include the requested resource or an error message if something goes wrong.

We hope that our API provides you with everything you need to create a dynamic and engaging social media application. If you have any questions or encounter any issues while using our API, please don't hesitate to contact us.
