## Getting Started

To get started with this project, follow these steps:

1. **Prerequisites**:
   - Node.js
   - npm or Yarn

2. **Installation**:
   - Clone the repository:

     ```sh
     git clone https://github.com/AbdulAzeez002/BookStore.git
     ```

   - Navigate to the project directory:

     ```sh
     cd BookStore
     ```

   - Install project dependencies:

     ```sh
     npm install
     # OR
     yarn install
     ```

## Usage

Explain how to use your project, including any configuration or commands. Provide examples or code snippets if necessary.

## Environment Setup

1. Create a `.env` file in the project root directory.

2. Define your environment variables in the `.env` file:

   ```env
   PORT (specify which port you want to run the server)
   JWT_SECRET (specify secret key for jwt encryption)


## Hosting

  Steps for hosting is given in this link
  
1. Launched a new instance in aws ec2.
2. Setup nginx in new server instance
3. Linked domain name (abdulaziz.digital) with the server using route53 of aws
4. installed nodejs and mongodb in the server
5. made changes in nginx configuration file
6. Cloned the git repository to the server instance
7. Installed pm2 for running the nodejs server