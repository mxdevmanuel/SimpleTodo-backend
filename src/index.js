import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import todoRoutes from './routes/todoRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Set up Morgan logger - 'dev' format is concise and colorful
app.use(morgan('dev'));

// Polyfill for __filename and __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load OpenAPI YAML
const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/todos', todoRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
