import { TRPCError } from '@trpc/server'
import { setCookie } from 'h3'
import { publicProcedure } from '../trpc'

import { unableToRefreshToken } from '../messages'
import { getSession, refresh, createSession } from '~/server/session'

export const procedureWithSession = publicProcedure
  .use(async ({ ctx, next }) => {
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
          message: unableToRefreshToken
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
  .use(({ ctx, next }) => {
    return next({
      ctx: {
        ...ctx,
        session: {
          ...ctx.session,
          async getBinding<Additional extends Record<string, any>> () {
            type _ReturnType = Awaited<ReturnType<typeof getSession>> & Partial<Additional>
            return await getSession(ctx.session.id) as {
              [K in keyof _ReturnType]: _ReturnType[K]
            }
          }
        }
      }
    })
  })
