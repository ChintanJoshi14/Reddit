import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://publicd9b906b7a95fd40a.stepzen.net/api/calling-octopus/__graphql",
    headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
    
    cache: new InMemoryCache(),
});

export default client;