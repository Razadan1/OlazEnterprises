
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route for contact form
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid email address' 
        });
    }
    
    // In a real application, you would save this to a database
    // or send an email notification
    console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });
    
    res.json({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
    });
});

// API route for newsletter subscription
app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Email is required' 
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid email address' 
        });
    }
    
    console.log('Newsletter subscription:', {
        email,
        timestamp: new Date().toISOString()
    });
    
    res.json({ 
        success: true, 
        message: 'Thank you for subscribing to our newsletter!' 
    });
});

// API route to get product information
app.get('/api/products', (req, res) => {
    const products = {
        souvenirs: {
            name: 'Souvenirs',
            description: 'Unique and memorable souvenirs that capture special moments and places',
            items: [
                'Keychains & Magnets',
                'Custom Figurines', 
                'Local Crafts',
                'Personalized Items'
            ],
            priceRange: '$5 - $50'
        },
        plates: {
            name: 'Premium Plates',
            description: 'Elegant dinnerware for special occasions and everyday dining',
            items: [
                'Ceramic Dinner Sets',
                'Decorative Plates',
                'Custom Designs',
                'Collector\'s Editions'
            ],
            priceRange: '$25 - $200'
        },
        flasks: {
            name: 'Durable Flasks',
            description: 'High-quality flasks for all your beverage needs, hot or cold',
            items: [
                'Stainless Steel Flasks',
                'Insulated Bottles',
                'Travel Mugs',
                'Custom Engraving'
            ],
            priceRange: '$15 - $75'
        },
        gifts: {
            name: 'Gift Sets',
            description: 'Thoughtfully curated gift sets for any occasion',
            items: [
                'Wedding Gifts',
                'Corporate Gifts',
                'Holiday Packages',
                'Custom Bundles'
            ],
            priceRange: '$30 - $150'
        }
    };
    
    res.json(products);
});

// API route for business information
app.get('/api/business-info', (req, res) => {
    const businessInfo = {
        name: 'Olaz Enterprise',
        founded: '2014',
        specialties: ['Souvenirs', 'Plates', 'Flasks', 'Gift Sets'],
        contact: {
            address: '123 Enterprise Avenue, Business District, BD 12345',
            phone: '+1 (555) 123-4567',
            email: 'info@olazenterprise.com'
        },
        hours: {
            weekdays: '9:00 AM - 6:00 PM',
            saturday: '10:00 AM - 4:00 PM',
            sunday: 'Closed'
        },
        stats: {
            yearsInBusiness: 10,
            happyCustomers: 5000,
            uniqueProducts: 500
        }
    };
    
    res.json(businessInfo);
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Olaz Enterprise website running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
