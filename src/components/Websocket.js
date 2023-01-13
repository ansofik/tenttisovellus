import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const WebSocket = () => {

    const { sendJsonMessage, lastMessage, readyState } = useWebSocket("wss://localhost:8080", {
        onOpen: () => console.log('onopen')
    })

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                type: 'authenticate',
                token: JSON.parse(localStorage.getItem('loggedInUser')).token
            });
        }
    }, [readyState, sendJsonMessage])

    return (
        <div className='notification'>
            {lastMessage && <div>Viimeisin ilmoitus: {JSON.parse(lastMessage.data).text}</div>}
        </div>
    )
}

export default WebSocket;