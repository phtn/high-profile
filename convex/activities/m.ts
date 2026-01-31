import { v } from 'convex/values'
import { internalMutation, mutation } from '../_generated/server'
import { activityMetadataSchema, activityTypeSchema } from './d'

/**
 * Create a new activity log entry
 */
export const createActivity = mutation({
  args: {
    type: activityTypeSchema,
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.optional(v.union(v.id('users'), v.null())),
    orderId: v.optional(v.id('orders')),
    productId: v.optional(v.id('products')),
    categoryId: v.optional(v.id('categories')),
    metadata: v.optional(activityMetadataSchema)
  },
  handler: async (ctx, args) => {
    const activityId = await ctx.db.insert('activities', {
      type: args.type,
      title: args.title,
      description: args.description,
      userId: args.userId ?? undefined,
      orderId: args.orderId,
      productId: args.productId,
      categoryId: args.categoryId,
      metadata: args.metadata,
      createdAt: Date.now()
    })

    return activityId
  }
})

/**
 * Log user signup activity (internal - called via scheduler)
 */
export const logUserSignup = internalMutation({
  args: {
    userId: v.id('users'),
    userName: v.optional(v.string()),
    userEmail: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId)
    if (!user) {
      throw new Error('User not found')
    }

    return await ctx.db.insert('activities', {
      type: 'user_signup',
      title: `New user signed up: ${user.name}`,
      description: `User ${user.email} created an account`,
      userId: args.userId,
      metadata: {
        userName: user.name,
        userEmail: user.email
      },
      createdAt: Date.now()
    })
  }
})
