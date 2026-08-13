import { useEffect } from "react";

import {
  ControlBar,
  RoomAudioRenderer,
  useSession,
  SessionProvider,
  useAgent,
  BarVisualizer,
} from "@livekit/components-react";

import { TokenSource } from "livekit-client";

import "@livekit/components-styles";

const tokenSource = TokenSource.sandboxTokenServer(
  "lalithainfra-yonm6h"
);

export default function App() {
  const session = useSession(tokenSource, {
    agentName: "lalitha-infra",
  });

  useEffect(() => {
    session.start();

    return () => {
      session.end();
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <div
        data-lk-theme="default"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Lalitha Infra</h1>
        <h2>AI Voice Receptionist</h2>

        <AgentStatus />

        <ControlBar
          controls={{
            microphone: true,
            camera: false,
            screenShare: false,
          }}
        />

        <RoomAudioRenderer />
      </div>
    </SessionProvider>
  );
}

function AgentStatus() {
  const agent = useAgent();

  return (
    <div style={{ margin: "30px" }}>
      <p>Agent: {agent.state}</p>

      {agent.canListen && (
        <BarVisualizer
          state={agent.state}
          barCount={5}
        />
      )}
    </div>
  );
}
