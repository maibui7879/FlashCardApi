const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger.js');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Mount routers
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const deckRoutes = require('./routes/deckRoutes');
const { deckCardRouter, cardRouter } = require('./routes/cardRoutes');
const learnRoutes = require('./routes/learnRoutes');
const { deckRatingRouter, ratingRouter } = require('./routes/ratingRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/decks', deckRoutes);
app.use('/api/v1/decks/:deckId/cards', deckCardRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/learn', learnRoutes);
app.use('/api/v1/decks/:id', deckRatingRouter);
app.use('/api/v1/ratings', ratingRouter);
app.use('/api/v1/ai', aiRoutes);

// Custom error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
