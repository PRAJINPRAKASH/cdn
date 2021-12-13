const errorHandler = async ({ next }) => {
    try {
        return await next()
    } catch (err) {
        return new Response(`${err.message}\n${err.stack}`, { status: 500 })
    }
}

const hello = async ({ next, request }) => {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token');
    if (token) {
        const response = await next()
        response.headers.set('x-token', token)
        return response
    }
    return new Response("Sorry, you have supplied an invalid key.", {
        status: 403,
    })
}

export const onRequest = [
    errorHandler,
    hello
]