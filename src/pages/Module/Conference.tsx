import { JitsiMeeting } from "@jitsi/react-sdk";
import { Layout, Typography } from "antd";

export default function Conference() {
  return (
    
    <Layout
      style={{
        backgroundColor: "#A3C644",
        height: "calc(100vh - 80px)",
      }}
    >
      <JitsiMeeting
        
        roomName="PleaseUseAGoodRoomName"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        getIFrameRef={(node) => (node.style.height = "100vh")}
      />
    </Layout>
  );
}
