# Clinova Mobile App - Backend Integration

## API Integration Setup

### 1. Configuration
Update the backend URL in `config/api.ts`:
```typescript
BASE_URL: 'https://your-backend-domain.com/api'
```

### 2. Required Backend Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

#### User Profile
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

#### Appointments
- `GET /appointments` - Get user appointments
- `POST /appointments` - Create new appointment

#### Prescriptions
- `GET /prescriptions` - Get all prescriptions
- `GET /prescriptions/latest` - Get latest prescription

### 3. Request/Response Formats

#### Login Request
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login Response
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "avatar_url"
  }
}
```

#### Register Request
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "phone": "+1234567890"
}
```

### 4. Authentication Headers
All authenticated requests include:
```
Authorization: Bearer <jwt_token>
```

### 5. Error Handling
The app handles HTTP status codes:
- 401: Unauthorized (redirects to login)
- 400: Bad request (shows error message)
- 500: Server error (shows generic error)

### 6. Testing
To test with a local backend:
1. Start your backend server on `http://localhost:3000`
2. Ensure CORS is configured for mobile requests
3. Update `config/api.ts` if using different port/URL