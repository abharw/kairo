// models/Dashboard.js
import { Schema, model, models } from 'mongoose';

const DashboardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    // Theme and Layout Preferences
    theme: {
        type: String,
        default: 'light',
        enum: ['light', 'dark', 'auto']
    },
    layout: {
        type: String,
        default: 'grid',
        enum: ['grid', 'list', 'masonry']
    },
    // Widget Configuration
    widgets: [{
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['stats', 'recent-videos', 'favorites', 'upload', 'analytics', 'calendar', 'activity']
        },
        position: {
            x: { type: Number, default: 0 },
            y: { type: Number, default: 0 },
            w: { type: Number, default: 4 },
            h: { type: Number, default: 3 }
        },
        isVisible: {
            type: Boolean,
            default: true
        },
        configuration: {
            type: Schema.Types.Mixed,
            default: {}
        }
    }],
    // Video-related Data
    favoriteVideos: [{
        videoId: String,
        uploadThingKey: String,
        uploadThingUrl: String,
        title: String,
        thumbnail: String,
        addedAt: {
            type: Date,
            default: Date.now
        }
    }],
    uploadedVideos: [{
        uploadThingKey: {
            type: String,
            required: true
        },
        uploadThingUrl: {
            type: String,
            required: true
        },
        title: String,
        description: String,
        category: String,
        tags: [String],
        thumbnail: String,
        fileSize: Number,
        duration: Number, // in seconds
        uploadedAt: {
            type: Date,
            default: Date.now
        },
        views: {
            type: Number,
            default: 0
        },
        isPublic: {
            type: Boolean,
            default: true
        }
    }],
    // User Categories and Preferences
    videoCategories: [{
        name: String,
        color: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    // Dashboard Statistics
    stats: {
        totalUploads: {
            type: Number,
            default: 0
        },
        totalViews: {
            type: Number,
            default: 0
        },
        totalStorageUsed: {
            type: Number,
            default: 0 // in bytes
        },
        totalWatchTime: {
            type: Number,
            default: 0 // in seconds
        },
        lastActiveAt: {
            type: Date,
            default: Date.now
        }
    },
    // Dashboard Settings
    settings: {
        autoSaveLayout: {
            type: Boolean,
            default: true
        },
        showTutorial: {
            type: Boolean,
            default: true
        },
        emailNotifications: {
            type: Boolean,
            default: true
        },
        defaultVideoPrivacy: {
            type: String,
            default: 'public',
            enum: ['public', 'private', 'unlisted']
        }
    }
}, {
    timestamps: true
});

// Indexes for better performance
DashboardSchema.index({ clerkId: 1 });
DashboardSchema.index({ userId: 1 });
DashboardSchema.index({ 'uploadedVideos.uploadedAt': -1 });

const Dashboard = models?.Dashboard || model("Dashboard", DashboardSchema);

export default Dashboard;