<div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 900px; margin: 0 auto;">

<h1>StudyMate: AI-powered learning resource platform</h1>

<p>StudyMate is a modern full-stack application built for course browsing and intelligent assistance. It features a responsive React frontend, a high-performance FastAPI (Python) backend, and an integrated AI Assistant powered by OpenAI.</p>

<p align="center">
   <img width="1501" height="852" alt="UIstudymate" src="https://github.com/user-attachments/assets/da8b4bee-24ef-4f60-96dd-3139f521bc7f" />

</p>

<hr>

<h2>Technical Stack</h2>

<p>The application runs as separate client and server processes on local ports, relying on a local PostgreSQL installation.</p>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Component</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Role</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Technology</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Key Libraries</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Frontend</td>
            <td style="padding: 10px; border: 1px solid #ddd;">User Interface, Routing, State Management</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>React.js, TypeScript, Bootstrap</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>react-router-dom</code>, <code>axios</code>, <code>react-bootstrap</code>, <code>bootstrap-icons</code></td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Backend</td>
            <td style="padding: 10px; border: 1px solid #ddd;">API, Business Logic, AI Gateway</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>FastAPI, Python</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>uvicorn</code>, <code>sqlalchemy</code>, <code>pydantic</code>, <code>openai</code>, <code>psycopg2-binary</code></td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Database</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Persistent Data Storage</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>PostgreSQL</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Local PostgreSQL Server</td>
        </tr>
    </tbody>
</table>

<hr>

<h2>Setup & Run Instructions</h2>

<h3>Prerequisites</h3>
<ul>
  <li><strong>Node.js & npm</strong></li>
  <li><strong>Python 3.11+</strong> </li>
  <li>PostgreSQL Server running locally.</li>
</ul>

<h3>1. Environment Configuration</h3>
<p>The backend requires the OpenAI API Key. Create a file named <strong><code>.env</code></strong> in the project root:</p>
<pre style="background-color: #f8f8f8; padding: 10px; border: 1px solid #ddd;">
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" same API key provided
DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/studymate_db" 
</pre>

<h3>2. Startup Commands</h3>
<p>Start each service in a separate terminal window:</p>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Service</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Directory</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Command</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Access Point</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Backend (API)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>backend/</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>uvicorn app.main:app --reload</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>http://localhost:8000/docs</code></td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Frontend (React)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>frontend/</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>npm start</code> (or <code>yarn start</code>)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>http://localhost:3000</code></td>
        </tr>
    </tbody>
</table>

<hr>

<h2>Project Structure & File Details</h2>

<h3 id="frontend-details">1. Frontend Service Structure (<code>frontend/src/</code>)</h3>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">File</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Primary Function</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Key Imports/Details</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>App.tsx</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Router & Layout(Defines Navbar and Page Routing)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>BrowserRouter</code>, <code>Routes</code>, <code>NavLink</code> (from <code>react-router-dom</code>)</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>pages/Home.tsx</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Main Page Logic(Data Fetching, Filtering, and State Management)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>useEffect</code>, <code>useState</code>, <code>fetchCourses</code> (manages filtering state).</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>pages/AIAssistant.tsx</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Chat Interface Logic</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>axios</code>, <code>useRef</code> (for scrolling).</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>components/CourseCard.tsx</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Individual Course Item(Displays summary data and handles circular interest counter)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>useState</code> (for counter state).</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>components/FilterBar.tsx</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Category Filtering Buttons(Calculates course counts and updates global filter)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>courses.reduce()</code> (for calculating counts).</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>components/SearchBar.tsx</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Course Search Input(Controlled input component)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">(Standard React input handling).</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>services/api.ts</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">API Service Layer(Links frontend to backend)</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>fetch</code> or <code>axios</code> (for HTTP requests).</td>
        </tr>
    </tbody>
</table>

<h3 id="backend-details">2. Backend Service Structure (<code>backend/app/</code>)</h3>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">File</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Primary Function</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Key Imports Used</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>main.py</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Server Entry & AI Gateway(Initializes FastAPI, sets CORS, and hosts the <code>/api/ask</code> endpoint).</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>FastAPI</code>, <code>OpenAI</code>, <code>CORSMiddleware</code>, <code>Depends</code>.</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>routes/courses.py</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">API Endpoints & Logic (Filtering, sorting, and aggregation queries).</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>APIRouter</code>, <code>Session</code>, <code>Query</code>, <code>func</code> (SQLAlchemy aggregate).</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>db.py</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">DB Connection & Session MgmtConfigures SQLAlchemy Engine and the <code>get_db</code> dependency).</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>create_engine</code>, <code>sessionmaker</code>, <code>declarative_base</code>.</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>models.py</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">**SQLAlchemy ORM (Defines the <code>Course</code> table schema).</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>Column</code>, <code>Integer</code>, <code>String</code>, <code>Numeric</code> (from <code>sqlalchemy</code>).</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>schemas.py</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Pydantic Data Schemas (Defines data validation and serialization models).</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>BaseModel</code> (from <code>pydantic</code>).</td>
        </tr>
    </tbody>
</table>

<hr>

<h2> API Endpoints & Core Functions</h2>

<h3>1. Core Course Listing & Filtering</h3>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Endpoint</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Method</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Primary Function</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>/courses</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>GET</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Retrieves courses, applying dynamic filtering and sorting based on query parameters.</td>
        </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>/courses/{id}</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>GET</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Get course by ID</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>/categories</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>GET</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Returns a list of categories with their course count and average rating using SQL aggregation.</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>/categories/{category}/second-highest</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>GET</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Finds the **second-highest rated course** in a category using ordering and limiting.</td>
        </tr>
    </tbody>
</table>
<img width="1504" height="557" alt="End point" src="https://github.com/user-attachments/assets/5d99ab33-56e3-43cf-943d-89b6c61d7f41" />

<h3>2. AI Assistant Gateway</h3>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
        <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Endpoint</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Method</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Primary Function</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>/api/ask</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><code>POST</code></td>
            <td style="padding: 10px; border: 1px solid #ddd;">Receives message, injects a system prompt containing the live course catalog data to the OpenAI API for contextual recommendations.</td>
        </tr>
    </tbody>
</table>

<hr>



<h2>Database</h2>

<p>This section documents the final schema of the <strong><code>courses</code></strong> table and provides the necessary SQL query and expected results used to verify the integrity of the data after the Docker Compose setup.</p>

<h3><img width="1512" height="982" alt="databasepostico" src="https://github.com/user-attachments/assets/6fada210-ddbb-442d-a511-09ec9ef81f30" /></h3>

<p>To confirm all 20 records were successfully inserted into the <code>courses</code> table:</p>


<h4>Validation Query</h4>

<img width="1512" height="982" alt="validation query" src="https://github.com/user-attachments/assets/4e9777eb-0944-4248-bc3d-93c5b7c02d87" />

<h2>User Interfaces</h2>
<h3> Home </h3>
<img width="1501" height="852" alt="UIstudymate" src="https://github.com/user-attachments/assets/2c8f4755-491c-4a72-9e22-01f43042d21d" />

<h3>AI assistant</h3>
<img width="1512" height="982" alt="AIassistant_page" src="https://github.com/user-attachments/assets/fd8b64dd-8246-4a60-bcf9-bfdbcd0d0b13" />

<h3>Card modal</h3>

<img width="1508" height="855" alt="cardmodal1" src="https://github.com/user-attachments/assets/1e95d224-bfff-4e46-a7d0-e0213c1f814b" />


</div>
