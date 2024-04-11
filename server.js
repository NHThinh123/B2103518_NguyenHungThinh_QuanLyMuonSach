const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("kết nối thành công với cơ sở dữ liệu");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server đang chạy ở port ${PORT}`);
    });
  } catch (error) {
    console.log("Không thể kết nối với cơ sở dữ liệu", error);
    process.exit();
  }
}

startServer();
