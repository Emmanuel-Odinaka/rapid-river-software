### Project description

This project is a Frontend React application developed using Vite and Typescript. It involves building a two-page application with a results page and an article creation page.

## Technologies Used

- React
- TypeScript
- Vite (for build setup)
- Vitest (for unit testing)
- Axios (for API communication)
- React Router (for navigation between pages.)
- Tailwind CSS (styling)

## Pages

### Results Page

The Results page allows users to search for existing articles. It includes:

- Users can search for existing articles by author id or title.
- A single input field and a search button facilitate the search operation.
- User can navigate to the article creation page

### Article Creation Page

- The page features a form connected to a free online API (https://jsonplaceholder.typicode.com/).
- The form includes client-side validation to ensure data integrity.
- Users can submit the form, allowing them to enter a snippet of a law article or other long-form content.

## Getting Started

1. **Clone the repository to your local machine.:**

   ```bash
   git clone https://github.com/Emmanuel-Odinaka/rapid-river-software.git
   cd rapid-river-software
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Run the application:**

   ```bash
   yarn dev
   ```

4. **Run tests:**

   ```bash
   yarn test
   ```

## Usage

- Navigate to `http://localhost:5173` to view the application.
