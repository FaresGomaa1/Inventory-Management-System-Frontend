# Inventory Management System

This is a web-based **Inventory Management System** built using **Angular** for the frontend, integrated with an **ASP.NET Web API** backend, and an **MS SQL Server** database. The system is designed to manage product inventory with a structured approval workflow for **Add**, **Update**, and **Delete** requests.

## Demo

The live application is hosted on Netlify and can be accessed at:  
**[Inventory Management System](https://mellifluous-marshmallow-1c9e43.netlify.app/)**

## Features

- **Product Request Types:**  
  - Add new products to inventory  
  - Update existing product details  
  - Delete products from inventory  

- **Approval Workflow:**  
  1. **Initiate Request:** A user starts a request (Add, Update, Delete).  
  2. **First-Level Review:** The request moves to the first team for review and approval.  
  3. **Final Decision:** The request is reviewed by the final team, which approves or rejects it.  
  4. **Publish Decision:** Approved requests are applied to the inventory.

- **Role-Based Permissions:**  
  Different teams and users have specific roles and permissions.

- **Real-Time Updates:**  
  Requests and decisions are tracked and updated in real-time.

## Technology Stack

### Frontend
- **Angular**  
  - UI/UX built with responsive design principles  
  - Services for API integration  

### Backend
- **ASP.NET Web API**  
  - RESTful endpoints for CRUD operations  
  - Workflow logic implementation  

### Database
- **MS SQL Server**  
  - Product inventory data storage  
  - Workflow state tracking  

### Hosting
- **Frontend:** Netlify  
- **Backend:** Hosted on a server or cloud platform  
- **Database:** MS SQL Server  

## Installation and Setup

### Prerequisites
1. **Angular CLI**  
2. **ASP.NET Core SDK**  
3. **MS SQL Server**  

### Clone the Repository
```bash
git clone https://github.com/FaresGomaa1/Inventory-Management-System-Frontend.git
cd Inventory-Management-System-Frontend
```

### Frontend Setup
1. Navigate to the Angular project directory:
   ```bash
   cd Inventory-Management-System-Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   ng serve -o
   ```
   The app will be available at `http://localhost:4200`.

### Backend Setup
1. Navigate to the ASP.NET Web API project directory:
   ```bash
   cd backend
   ```
2. Restore NuGet packages:
   ```bash
   dotnet restore
   ```
3. Update `appsettings.json` with your database connection string.
4. Run the backend server:
   ```bash
   dotnet run
   ```
   The API will be available at `http://localhost:5000`.

### Database Setup
1. Create a new MS SQL Server database.
2. Run the SQL scripts in the `database` directory to create the necessary tables and seed data.

## Deployment

### Frontend
The frontend is deployed on Netlify. Push changes to the `main` branch to automatically deploy.

### Backend
Deploy the ASP.NET Web API on your preferred hosting platform (e.g., Azure, AWS, or IIS).

### Database
Ensure the MS SQL Server database is hosted and accessible by the backend.

## Usage

1. Open the application using the live demo link or run it locally.
2. Log in with your credentials.
3. Navigate to the **Product Requests** section to initiate a new request.
4. Track the status of your requests through the workflow.

## Contributing

Contributions are welcome! Please follow these steps:  
1. Fork the repository.  
2. Create a new branch: `git checkout -b feature/your-feature-name`.  
3. Commit your changes: `git commit -m 'Add some feature'`.  
4. Push to the branch: `git push origin feature/your-feature-name`.  
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to:  
- **Email:** fares.gomaa.work@gmail.com
- **GitHub:** [FaresGomaa1](https://github.com/FaresGomaa1)
```

### Key Highlights
- Replace placeholders (e.g., `your-repo`, `your-email@example.com`, etc.) with actual details.  
- Add links to your GitHub repository and any related documentation if available.
