import LiveMysql from "mysql-live-select";

//TODO : Use Env variables
const settings = {
  host: "localhost",
  user: "hr_usr",
  password: "f-nygB4knyAM",
  database: "hr_24hrstores",
  serverId: 256,
  minInterval: 200,
};

const listenMysqlChanges = (tables, pubsub) => {
  tables.forEach(table => {
    const liveConnection = new LiveMysql(settings);
    liveConnection
      .select(`select * from ${table}`, [{ table }])
      .on("update", function (diff, data) {
        // console.log(diff);
        // triggered on data change in mysql
        pubsub.publish(`${table}_CREATED`, {
          customerCreated: diff,
        });
      });
  });
};

export default listenMysqlChanges;
