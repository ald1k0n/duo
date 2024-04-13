import { CheckOutlined, FireOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, Layout, Typography } from "antd";

export default function Profile() {
  return (
    <Layout
      className=""
      style={{
        height: "100vh",
        backgroundColor: "#A3C644",
      }}
    >
      <Card className="m-6">
        <Typography.Title level={3} style={{ fontWeight: "bold" }}>
          ПРОФИЛЬ
        </Typography.Title>
        <div className="grid grid-cols-6 mb-4">
          <Avatar
            size={80}
            src="https://i.pravatar.cc/300"
            className="col-span-2"
          />
          <div className="col-span-4">
            <Typography.Title level={4} style={{ fontWeight: "bold" }}>
              John Doe
            </Typography.Title>
            <Typography.Text>
              Сіз тоқтаусыз 1 күн оқып жүрсіз. Барлығы 2 күн.
            </Typography.Text>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button
            icon={<FireOutlined />}
            className="border-2"
            style={{ borderColor: "#39C2D7", color: "#39C2D7" }}
          >
            1
          </Button>
          <Button
            icon={<CheckOutlined />}
            className="border-2"
            style={{ borderColor: "#39C2D7", color: "#39C2D7" }}
          >
            2
          </Button>
          <Button
            type="primary"
            className="border-2"
            style={{ borderColor: "#39C2D7", backgroundColor: "#39C2D7"}}
          >
            PLUS
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
