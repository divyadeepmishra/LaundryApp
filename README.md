# LaundryApp - Complete Laundry Service Management

A comprehensive React Native app for laundry service management with customer booking, delivery tracking, and admin management features.

## Features

### Customer Features
- 🔐 **Authentication**: Google & Apple OAuth, Email/Password
- 📱 **Service Booking**: Wash & Fold, Dry Cleaning, Iron & Press
- 📅 **Booking Management**: View upcoming and completed orders
- 📍 **Address Management**: Multiple delivery addresses
- 💳 **Payment Integration**: Razorpay payment gateway
- ⭐ **Rating System**: Rate completed services
- 📊 **Order Tracking**: Real-time order status updates

### Admin Features
- 📊 **Dashboard**: Business analytics and insights
- 📋 **Order Management**: View and update order status
- 👥 **Customer Management**: Customer information and history
- 🛠️ **Service Management**: Manage service offerings and pricing
- 📈 **Analytics**: Revenue tracking and business metrics

### Delivery Features
- 🚚 **Task Management**: Pickup and delivery tasks
- 📍 **Location Tracking**: Real-time location updates
- 💰 **Earnings Tracking**: Daily and weekly earnings
- 📱 **Online/Offline Status**: Toggle availability
- 📞 **Customer Communication**: Direct contact with customers

## Tech Stack

- **Frontend**: React Native with Expo
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Razorpay
- **Navigation**: Expo Router
- **UI Components**: Custom components with consistent design

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- PostgreSQL database
- Clerk account
- Razorpay account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LaundryApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Clerk Configuration
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/laundryapp"

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

### 5. Clerk Configuration

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Configure OAuth providers (Google, Apple)
4. Add your domain to allowed origins
5. Copy the publishable key to your `.env` file

### 6. Razorpay Configuration

1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Add the keys to your `.env` file

### 7. Run the Application

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## Project Structure

```
LaundryApp/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (customer)/        # Customer screens
│   ├── (admin)/           # Admin screens
│   ├── (delivery)/        # Delivery screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── constants/             # App constants and colors
├── prisma/               # Database schema and migrations
├── assets/               # Images, fonts, etc.
└── package.json
```

## Authentication Flow

1. **Sign Up**: Users can sign up with email/password or OAuth
2. **Role Assignment**: Users are assigned roles (customer, admin, delivery)
3. **Routing**: Users are redirected based on their role
4. **Session Management**: Clerk handles session persistence

## Database Schema

The app uses the following main entities:

- **User**: Customer, admin, and delivery personnel
- **Order**: Laundry service orders
- **Service**: Available laundry services
- **Payment**: Payment transactions via Razorpay
- **Address**: Customer addresses for pickup/delivery
- **Rating**: Customer ratings and reviews

## API Integration

### Backend Requirements

You'll need to create a backend API with the following endpoints:

- User management (CRUD operations)
- Order management (create, update, status changes)
- Payment processing (Razorpay integration)
- Service management
- Analytics and reporting

### Key API Endpoints

```
POST /api/orders          # Create new order
GET /api/orders           # Get user orders
PUT /api/orders/:id       # Update order status
POST /api/payments        # Process payment
GET /api/services         # Get available services
POST /api/ratings         # Submit rating
```

## Payment Integration

The app integrates with Razorpay for payment processing:

1. **Order Creation**: Create Razorpay order
2. **Payment Processing**: Handle payment success/failure
3. **Webhook Handling**: Process payment confirmations
4. **Refund Management**: Handle refunds when needed

## Deployment

### Expo Build

```bash
# Build for production
expo build:android
expo build:ios

# Or use EAS Build
eas build --platform all
```

### Environment Variables

Make sure to set up environment variables for production:

- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `DATABASE_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] Push notifications
- [ ] Real-time chat support
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Offline mode
- [ ] Advanced payment options
- [ ] Integration with delivery partners
- [ ] Customer loyalty program
