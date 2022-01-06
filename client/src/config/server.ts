import IServer from "../interfaces/server";

const serverConfiguration = (uri: string, port: string, endpoint: string): IServer => {
    return {
        port: port,
        uri: uri,
        endpoint: endpoint
    }
}
export default serverConfiguration;