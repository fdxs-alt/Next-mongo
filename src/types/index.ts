import { IncomingMessage } from 'http'
import { Session } from 'next-iron-session'
import { GetServerSideProps } from 'next'

interface getServerSidePropsWithSession extends GetServerSideProps {
  readonly req: IncomingMessage & { readonly session: Session }
}

export type { getServerSidePropsWithSession }
