import { defineSchema, defineTable } from 'convex/server'
import { activitySchema } from './activities/d'
import { userSchema } from './users/d'

export default defineSchema({
  users: defineTable(userSchema).index('by_fid', ['fid']),
  activities: defineTable(activitySchema)
    .index('by_user', ['userId'])
    .index('by_order', ['orderId'])
    .index('by_type', ['type'])
    .index('by_created_at', ['createdAt'])
})
