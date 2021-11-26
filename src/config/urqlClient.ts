import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange } from '@urql/exchange-graphcache'
import {
    createClient,
    dedupExchange,
    defaultExchanges,
    fetchExchange,
} from 'urql'

const cacheExchangeOptions: Parameters<typeof cacheExchange>[0] = {
    updates: {},
}

const client = createClient({
    url: 'http://localhost:4001',
    fetchOptions: { credentials: 'include' },
    exchanges: [
        devtoolsExchange,
        ...defaultExchanges,
        dedupExchange,
        fetchExchange,
        cacheExchange(cacheExchangeOptions),
    ],
})

export default client
