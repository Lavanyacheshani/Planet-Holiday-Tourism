# Planet Holiday Tourism - Admin Dashboard Setup Guide

## Overview

This admin dashboard provides a secure, user-friendly interface for managing tour packages, destinations, blog articles, and bookings for the Planet Holiday Tourism website. All changes reflect instantly on the live website.

## Features

### 🔐 Security

- JWT-based authentication
- Role-based access control (Admin/Manager)
- Secure password hashing with bcrypt
- Rate limiting and CORS protection
- Input validation and sanitization

### 📊 Dashboard Management

- **Tour Packages**: Create, edit, delete, and manage tour packages
- **Destinations**: Manage destinations with location data and attractions
- **Blog Articles**: Full blog management with rich text editor
- **Bookings**: View and manage customer bookings
- **Analytics**: Real-time statistics and insights

### 🖼️ Media Management

- Cloudinary integration for image uploads
- Automatic image optimization and resizing
- Multiple image sizes (thumbnail, medium, large)
- Image gallery management

### 🔄 Real-time Updates

- Instant status changes
- Live preview of changes
- Real-time notifications
- Automatic data synchronization

## Backend Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**

   ```bash
   cp env.example .env
   ```

4. **Configure environment variables:**

   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/planet-holiday

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Google Forms Configuration
   GOOGLE_FORMS_URL=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
   GOOGLE_FORMS_ENTRY_ID=entry.123456789
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

### Database Models

#### TourPackage

- Title, description, pricing
- Duration, difficulty, group size
- Images, highlights, itinerary
- Category, status, featured flag
- Rating system and reviews

#### Destination

- Name, description, location
- Images, attractions, activities
- Weather, accommodation options
- Transportation information
- Tips and recommendations

#### BlogArticle

- Title, content, excerpt
- Featured image and gallery
- Categories, tags, author
- Comments and moderation
- SEO optimization

#### User (Admin)

- Authentication and authorization
- Role-based permissions
- Profile management

## Frontend Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

4. **Access admin dashboard:**
   ```
   http://localhost:5173/admin
   ```

## Admin Dashboard Usage

### Authentication

- **Demo Credentials:**
  - Email: `admin@planethoday.lk`
  - Password: `admin123`

### Dashboard Overview

- **Statistics Cards**: Total bookings, revenue, tours, destinations
- **Quick Actions**: Add tour packages, destinations, blog articles
- **Recent Activity**: Latest changes and updates

### Tour Package Management

1. **View All Tours**: List with search and filters
2. **Create New Tour**:
   - Basic information (title, description, price)
   - Images and gallery
   - Itinerary and highlights
   - Category and difficulty
3. **Edit Tour**: Update any tour details
4. **Status Management**: Draft, Published, Archived
5. **Featured Tours**: Toggle featured status

### Destination Management

1. **View All Destinations**: Grid layout with filters
2. **Create Destination**:
   - Location and coordinates
   - Images and attractions
   - Activities and accommodation
   - Weather and tips
3. **Edit Destination**: Update location details
4. **Attractions**: Add/remove local attractions

### Blog Article Management

1. **View All Articles**: Table with author and stats
2. **Create Article**:
   - Rich text editor for content
   - Featured image and gallery
   - Categories and tags
   - SEO settings
3. **Publish/Unpublish**: Control article visibility
4. **Comments**: Moderate user comments

### Booking Management

1. **View All Bookings**: Customer booking details
2. **Status Updates**: Confirm, cancel, or modify bookings
3. **Customer Information**: Contact details and preferences

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

### Tour Packages

- `GET /api/admin/tour-packages` - List all tours
- `POST /api/admin/tour-packages` - Create new tour
- `PUT /api/admin/tour-packages/:id` - Update tour
- `DELETE /api/admin/tour-packages/:id` - Delete tour
- `PUT /api/admin/tour-packages/:id/status` - Update status
- `PUT /api/admin/tour-packages/:id/feature` - Toggle featured

### Destinations

- `GET /api/admin/destinations` - List all destinations
- `POST /api/admin/destinations` - Create new destination
- `PUT /api/admin/destinations/:id` - Update destination
- `DELETE /api/admin/destinations/:id` - Delete destination
- `PUT /api/admin/destinations/:id/status` - Update status
- `PUT /api/admin/destinations/:id/feature` - Toggle featured

### Blog Articles

- `GET /api/admin/blog-articles` - List all articles
- `POST /api/admin/blog-articles` - Create new article
- `PUT /api/admin/blog-articles/:id` - Update article
- `DELETE /api/admin/blog-articles/:id` - Delete article
- `PUT /api/admin/blog-articles/:id/status` - Update status
- `PUT /api/admin/blog-articles/:id/feature` - Toggle featured

### Image Upload

- `POST /api/admin/upload-image` - Upload images to Cloudinary

## Security Features

### Authentication & Authorization

- JWT tokens with expiration
- Role-based access control
- Secure password hashing
- Session management

### Data Protection

- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### Rate Limiting

- API rate limiting (100 requests per 15 minutes)
- Brute force protection
- DDoS mitigation

## Deployment

### Backend Deployment

1. **Environment Setup:**

   - Set production environment variables
   - Configure MongoDB Atlas
   - Set up Cloudinary production account

2. **Deploy to Platform:**
   ```bash
   # Example for Heroku
   heroku create planet-holiday-backend
   git push heroku main
   ```

### Frontend Deployment

1. **Build for Production:**

   ```bash
   npm run build
   ```

2. **Deploy to Platform:**
   ```bash
   # Example for Vercel
   vercel --prod
   ```

## Monitoring & Maintenance

### Logging

- Request/response logging
- Error tracking
- Performance monitoring

### Backup

- Automated database backups
- Image backup to Cloudinary
- Configuration backup

### Updates

- Regular security updates
- Dependency updates
- Feature enhancements

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**

   - Check MongoDB service is running
   - Verify connection string
   - Check network connectivity

2. **Image Upload Failures:**

   - Verify Cloudinary credentials
   - Check file size limits
   - Validate file formats

3. **Authentication Issues:**
   - Check JWT secret configuration
   - Verify token expiration
   - Check CORS settings

### Support

For technical support or questions:

- Check the documentation
- Review error logs
- Contact the development team

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This admin dashboard is designed for the Planet Holiday Tourism website. All changes made through this interface will be reflected on the live website in real-time.
