import { JitsiMeeting } from "@jitsi/react-sdk";
import { Layout, Typography } from "antd";
import { UserService } from "@/services";

export default function Conference() {
  const userService = new UserService();
  console.log(userService.getCurrentUser());
  return (
    <Layout
      className="mt-4"
      style={{
        backgroundColor: "#A3C644",
        height: "calc(100vh - 80px)",
      }}
    >
      <div>
        <Typography.Title
          className="text-center"
          level={3}
          style={{
            color: "white",
          }}
        >
          Grammar Module
        </Typography.Title>
      </div>
      {/* <JitsiMeeting
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
        userInfo={{
          displayName: "YOUR_USERNAME",
        }}
      /> */}
    </Layout>
  );
}
