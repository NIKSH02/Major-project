# WANDERLUST
<img src="https://socialify.git.ci/NIKSH02/Major-project/image?description=1&language=1&name=1&owner=1&pattern=Plus&theme=Auto" height="350" width="7500">

A hotel, home, cabin, and rental booking platform similar to Airbnb.

## Description

**Wanderlust** is a **full-stack web application** that enables users to **list, search, and book accommodations**. It offers a seamless experience for both guests and property owners. Users can create accounts, browse available listings, and book stays. Property owners can **add, edit, and manage their listings**. The platform supports **secure authentication, image uploads, and map integration**.

## Getting Started

### Dependencies

This project requires the following technologies:

- **Node.js** (Recommended v23.6.0)
- **Express.js** (Web framework)
- **MongoDB** (Database)
- **Mongoose** (MongoDB ODM)
- **Passport.js** (Authentication)
- **Cloudinary** (Image storage)
- **Mapbox SDK** (Map integration)
- **EJS** (Templating engine)
- **Multer** (File uploads)

### Installing

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NIKSH02/Major-project.git
   cd Major-project

2. **Install dependencies:**
   ```bash
     npm install --force
4. **Set up environment variables: Create a .env file in the project root and add:

env
Copy
Edit
**
  ```bash
  PORT=3000
  DATABASE_URL=your_mongodb_connection_string
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_KEY=your_cloudinary_key
  CLOUDINARY_SECRET=your_cloudinary_secret
  MAPBOX_TOKEN=your_mapbox_api_token

```
###Executing program
1. **starting the application**
   ```
   node app.js
   ```
    1.1 **The application will be available at:**
      http://localhost:8080/listing
3. **Access the deployed version: Visit:**
  https://major-project-1-cey8.onrender.com/listing
  
### Usage

<b>--Login / Signup – Users can create an account or log in.</b></br>
<b>--List Properties – Owners can add hotels, homes, and cabins for rent.</b></br>
<b>--Book Stays – Guests can browse listings and make bookings.</b></br>
<b>--Secure Authentication – Uses Passport.js for user authentication.</b></br>
<b>--Image Uploads – Uses Cloudinary for storing property images.</b></br>
<b>--Map Integration – Uses Mapbox to display property locations.</b></br>

### Contributing
1. **Contributions are welcome! Please follow these steps:**

    Fork the repository
    Click on the Fork button at the top right of the repo page.

2. **Clone your forked repo:
  ```
git clone https://github.com/YOUR_GITHUB_USERNAME/Major-project.git
cd Major-project
```
3. **Create a new branch for your feature/fix:
```
git checkout -b feature-name
```
4. **Make your changes and commit:
```
git add .
git commit -m "Added new feature: <brief description>"
```
5. **Push your changes to GitHub:
```
git push origin feature-name
```
6. **Open a Pull Request (PR)</br>
Go to the original repository on GitHub and click New Pull Request.

### Contribution Guidelines:

1. **Ensure your code follows the existing project structure.**
<b>--Use clear commit messages.</b></br>
<b>--Test changes before submitting a PR.</b></br>
<b>--Avoid breaking existing functionality.</b></br>
### Help
**For common issues, try:**

```
npm audit fix
```
***or check logs with:***
```
npm run debug
```
### Authors
<b>--Nikhil Sharma</b></br>
<b>--GitHub: NIKSH02</b></br>
<b>--LinkedIn: Available in GitHub profile</b></br>

### Version History
1.0.0</b></br>
Initial Release</b></br>
#### License
This project is licensed under the ISC License – see the LICENSE.md file for details.

#### Acknowledgments
Express.js</b></br>
MongoDB</b></br>
Passport.js</b></br>
Cloudinary</b></br>
Mapbox</b></br>
Render</b></br>


