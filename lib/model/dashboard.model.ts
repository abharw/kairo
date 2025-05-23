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
    // Simple preferences
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
        duration: Number,
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
    stats: {
        totalVideos: {
            type: Number,
            default: 0
        },
        totalViews: {
            type: Number,
            default: 0
        },
        totalStorageUsed: {
            type: Number,
            default: 0
        },
        lastActiveAt: {
            type: Date,
            default: Date.now
        }
    }
}, {
    timestamps: true
});

const Dashboard = models?.Dashboard || model("Dashboard", DashboardSchema);

export default Dashboard;