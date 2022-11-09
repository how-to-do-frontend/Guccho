import { TRPCError } from '@trpc/server'
import { setCookie } from 'h3'

import { getSession, refresh, createSession } from '../../session'
import { createRouter } from '../context'

export const createRouterWithSession = () => createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session.id) {
      const sessionId = await createSession()
      setCookie(ctx.h3Event, 'session', sessionId)
      return next({
        ctx: {
          ...ctx,
          session: {
            id: sessionId
          }
        }
      })
    }
    const session = await getSession(ctx.session.id)
    if (!session) {
      const sessionId = await createSession()
      setCookie(ctx.h3Event, 'session', sessionId)
      return next({
        ctx: {
          ...ctx,
          session: {
            id: sessionId
          }
        }
      })
    } else {
      const refreshed = await refresh(ctx.session.id)
      if (!refreshed) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'error when refreshing token'
        })
      }
      if (refreshed !== ctx.session.id) {
        setCookie(ctx.h3Event, 'session', refreshed)
      }
      return next({
        ctx: {
          ...ctx,
          session: {
            id: ctx.session.id as string
          }
        }
      })
    }
  })
  .middleware(({ ctx, next }) => {
    return next({
      ctx: {
        ...ctx,
        session: {
          ...ctx.session,
          async getBinding () {
            return await getSession(ctx.session.id)
          }
        }
      }
    })
  })
