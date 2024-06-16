const { UnauthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {  /* note */
        throw new UnauthenticatedError('Authentication invalid!');
    };

    const token = authHeader.split(' ')[1]; 

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);   /* 1 */
      req.user = { userId: decoded.userId, name: decoded.name };
      next();

    } catch (error) {
      throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware;

/******************* COMMENTS ******************

***Note: it makes a significant difference whether you include the space after "Bearer" or not in the startsWith method.

In your authenticationMiddleware function, the purpose of checking if the Authorization header starts with "Bearer " is to ensure that the header is properly formatted as a Bearer token. According to the standard format for Bearer tokens, there should be a space between "Bearer" and the actual token string.

Here's a detailed explanation:

With the space ("Bearer "):

if (!authHeader || !authHeader.startsWith("Bearer ")) {
This correctly checks if the Authorization header starts with "Bearer " (with a space), which is the correct format. For example, given the header:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
The check authHeader.startsWith("Bearer ") will return true, and your code will correctly proceed to extract the token.

Without the space ("Bearer"):

if (!authHeader || !authHeader.startsWith("Bearer")) {
This will check if the Authorization header starts with "Bearer" (without a space). While this might seem like it will work, it can lead to false positives. For example, given the header:

Authorization: BearerTokenExample
The check authHeader.startsWith("Bearer") will return true, even though the header is not in the correct format, which can cause issues when you try to split and extract the token.


***1: . The JWT_SECRET is used for the verification of all JWTs, not for individual users. In the context of JWT authentication:
The secret key is used to sign JWTs during their creation on the server.
The same secret key is used to verify the authenticity of JWTs on subsequent requests made by clients.
The secret key acts as a shared secret between the server and the entities (users or clients) that possess a valid JWT. When the server receives a JWT, it uses the jwt.verify function, along with the JWT_SECRET, to check if the JWT has a valid signature. If the signature is valid, it indicates that the JWT has not been tampered with and was indeed issued by the server.

So, the key is attached to the JWT process itself, and its security is crucial for the overall security of the authentication system. It's not directly tied to individual users but rather to the integrity of the JWTs that represent user authentication.

*/


