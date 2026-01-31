import { v } from 'convex/values'
import { query } from '../_generated/server'
import { activityTypeSchema } from './d'

/**
 * Get all activities (for admin dashboard)
 */
export const getAllActivities = query({
  args: {
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100
    const activities = await ctx.db.query('activities').order('desc').take(limit)

    return activities
  }
})

/**
 * Get activities by type
 */
export const getActivitiesByType = query({
  args: {
    type: activityTypeSchema,
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100
    const activities = await ctx.db
      .query('activities')
      .filter((q) => q.eq(q.field('type'), args.type))
      .order('desc')
      .take(limit)

    return activities
  }
})

/**
 * Get activities for a specific user
 */
export const getUserActivities = query({
  args: {
    userId: v.id('users'),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100
    const activities = await ctx.db
      .query('activities')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .order('desc')
      .take(limit)

    return activities
  }
})

/**
 * Get activities for a specific order
 */
export const getOrderActivities = query({
  args: {
    orderId: v.id('orders'),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50
    const activities = await ctx.db
      .query('activities')
      .filter((q) => q.eq(q.field('orderId'), args.orderId))
      .order('desc')
      .take(limit)

    return activities
  }
})

/**
 * Get recent activities (for admin dashboard) with user data
 */
export const getRecentActivities = query({
  args: {
    limit: v.optional(v.number()),
    types: v.optional(v.array(activityTypeSchema))
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50

    let activities
    if (args.types && args.types.length > 0) {
      // Filter by types if provided - collect all and filter
      const allActivities = await ctx.db.query('activities').collect()
      activities = allActivities
        .filter((activity) => args.types!.includes(activity.type))
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, limit)
    } else {
      activities = await ctx.db.query('activities').order('desc').take(limit)
      return activities
    }
  }
})

/**
 * Get activity statistics for admin dashboard
 */
export const getActivityStats = query({
  args: {
    days: v.optional(v.number()) // Number of days to look back (default: 7)
  },
  handler: async (ctx, args) => {
    const days = args.days ?? 7
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000

    const allActivities = await ctx.db
      .query('activities')
      .filter((q) => q.gte(q.field('createdAt'), cutoffTime))
      .collect()

    const stats = {
      totalActivities: allActivities.length,
      userSignups: allActivities.filter((a) => a.type === 'user_signup').length,
      ordersCreated: allActivities.filter((a) => a.type === 'order_created').length,
      ordersDelivered: allActivities.filter((a) => a.type === 'order_delivered').length,
      paymentsCompleted: allActivities.filter((a) => a.type === 'payment_completed').length,
      byType: {} as Record<string, number>
    }

    // Count by type
    allActivities.forEach((activity) => {
      stats.byType[activity.type] = (stats.byType[activity.type] || 0) + 1
    })

    return stats
  }
})
